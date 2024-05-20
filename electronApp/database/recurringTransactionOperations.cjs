//const { current } = require('immer');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');
const { validateBrowserWindowPath, 
    constructErrorMsgFromSQLiteError,
    constructValidationError,
} = require('./commonOperations.cjs');

let db = null;
let timeZone = null;
const validFilterParams = new Set([
    "value", 
    "currency", 
    "transactionType", 
    "transactionCategory", 
    "fromReference", 
    "toReference", 
    "createdDate", 
    "modifiedDate", 
    "recurringFrequencyType", 
    "recurringFrequencyDayOfTheWeek", 
    "recurringFrequencyDayOfTheMonth", 
    "recurringFrequencyMonthOfTheYear", 
    "recurringFrequencyTime", 
    "recurringTransactionStartDate",
    "recurringTransactionEndDate",
    "sort"
]);
const validSortFields = new Set([
    "title",
    "description",
    "value",  
    "createdDate", 
    "modifiedDate", 
    "recurringTransactionStartDate",
    "recurringTransactionEndDate",
    "recurringFrequencyTime",
    "recurringFrequencyMonthOfTheYear",
    "recurringFrequencyDayOfTheMonth",
    "recurringFrequencyDayOfTheWeek",
]);


function getIdFromTitle(event, title) {

    if (!validateBrowserWindowPath(event.senderFrame.url)) return new Promise((resolve, reject) => { reject(constructValidationError("URL Validation Failed", {value: null})); });

    return new Promise((resolve, reject) => { 
        db.get(`SELECT id FROM recurringTransactions WHERE title = ?`, title, (err, row) => { 
            if (err) { 
                // console.log("Recurring Entity: In getIdFromTitle: err: ", err);
                reject(constructErrorMsgFromSQLiteError(err, "Error, could not get id of recurring transaction from title", {value: null}));
            }
            resolve(row? row.id: null);
        });
    });
}

function getRecurringTransactions() {
    //communicate with the database to get the recurring transactions
    return new Promise((resolve, reject) => {
        db.all(`SELECT title FROM recurringTransactions`, (err, rows) => { 
            if (err) { 
                // console.log("Recurring Entity: In getRecurringTransactions: err: ", err);
                reject(constructErrorMsgFromSQLiteError(err, "Error, could not get recurring transactions", {value: null}));
            }
            resolve(rows && rows.length > 0? rows.map((row) => row.title): []);
        });
    });
    //return ["entity1", "entity2", "entity3", "entity4"];
}

function setDB(database) {
    //set the database to be used by the module
    db = database;
    // console.log("In setDB: db: " + db);
}

function setTimeZone(selectedTimeZone) {
    timeZone = selectedTimeZone;
}

function updateFinancialEntityReferenceID(event,
                                          oldFinancialEntityReferenceID,
                                          newFinancialEntityReferenceID) {
    if (!validateBrowserWindowPath(event.senderFrame.url)) return new Promise((resolve, reject) => { reject(constructValidationError("URL Validation Failed", {value: null})); });
    return new Promise((resolve, reject) => {
        const upateFromReferenceID = new Promise((resolve, reject) => {
            db.run(`UPDATE recurringTransactions SET \
                    fromReference = ? \
                    WHERE fromReference = ?`,
                    newFinancialEntityReferenceID,
                    oldFinancialEntityReferenceID,
                    (err) => {
                        if (err) reject(constructErrorMsgFromSQLiteError(err, "Error could not update from reference", {value: null}));
                        resolve();
                    });
        });

        const upateToReferenceID = new Promise((resolve, reject) => {
            db.run(`UPDATE recurringTransactions SET \
                    toReference = ? \
                    WHERE toReference = ?`,
                    newFinancialEntityReferenceID,
                    oldFinancialEntityReferenceID,
                    (err) => {
                        if (err) reject(constructErrorMsgFromSQLiteError(err, "Error could not update to reference", {value: null}));
                        resolve();
                    });
        });

        Promise.all([upateFromReferenceID, upateToReferenceID]).then(() => {
            resolve();
        }).catch((err) => {
            // console.log(`Update Financial Entity Reference ID Error ${err}`);
            reject(constructErrorMsgFromSQLiteError(err[0] || err[1], "Error could not update financial entity reference", {value: null}));
        });
    });
}


// function getUTCDateFromDatetime(dateTime) {
//     const regex = /^\d{4}[-]\d{2}[-]\d{2}[T]\d{2}[:]\d{2}[:]\d{2}$/;
//     if( regex.test(dateTime) ) {
//         return dateTime.substring(0, 10);
//     }
//     return null;
// }

// function getDecimalTimeFromDateTime(dateTime) {
//     const regex = /^\d{4}[-]\d{2}[-]\d{2}[T]\d{2}[:]\d{2}[:]\d{2}$/;
//     if( regex.test(dateTime) ) {
//         const datetime = new Date(dateTime);
//         return (datetime.getHours() + datetime.getMinutes()/60);
//     }
//     return null;
// }

//calcualte the yearly recurring transaction datetime based on the recurring transaction settings
function calcualteYearlyRecurringTransactions(recurringTransactionStartDatetime,
                                              lastRecurringTransactionDatetime,
                                              recurringTransactionEndDatetime,
                                              recurringTransactionSettings) {
    // recurringTransactionSettings = {
    //     frequency: [null, "Daily", "Weekly", "Monthly", "Yearly"],
    //     dayOfTheWeek: from 0 to 6 [monday for sunday] or null, 
    //     dayOfTheMonth: from 1 to 31 or null,
    //     month: from 0 to 11 or null,
    //     time: "hh:mm:00" or null,
    // }

    const monthFormatRegex = /^[0-9][0, 1]?$/;
    if ( !monthFormatRegex.test(recurringTransactionSettings.month) ) return [];

    const dayOfTheMonthFormatRegex = /^[1-9]((?<=[1,2])[0-9]?|[0, 1]?)$/;
    if ( !dayOfTheMonthFormatRegex.test(recurringTransactionSettings.dayOfTheMonth) ) return [];

    const timeFormatRegex = /^\d{2}[:]\d{2}[:]\d{2}$/;
    if( !timeFormatRegex.test(recurringTransactionSettings.time) ) return [];

    const currentDatetime = new Date().toISOString().substring(0, 16);
    lastRecurringTransactionDatetime = lastRecurringTransactionDatetime !== null? new Date(lastRecurringTransactionDatetime): null;
    const recurringTransactionStartDatetimeObject = new Date(recurringTransactionStartDatetime);
    recurringTransactionEndDatetime = recurringTransactionEndDatetime.substring(0, 16);
    recurringTransactionStartDatetime = recurringTransactionStartDatetime.substring(0, 16);
    const recurringTransactionTime = recurringTransactionSettings.time;

    if (currentDatetime <= lastRecurringTransactionDatetime || currentDatetime < recurringTransactionStartDatetime) return [];

    const transactionDatetimes = [];

    if (lastRecurringTransactionDatetime === null) { 
        const recurringTransactionStartDate = recurringTransactionStartDatetimeObject.getUTCDate();
        const recurringTransactionStartMonth = recurringTransactionStartDatetimeObject.getUTCMonth();
        lastRecurringTransactionDatetime = new Date(recurringTransactionStartDatetimeObject);
        lastRecurringTransactionDatetime.setUTCDate(recurringTransactionSettings.dayOfTheMonth);
        lastRecurringTransactionDatetime.setUTCMonth(recurringTransactionSettings.month);
        if ( (recurringTransactionStartMonth < recurringTransactionSettings.month) ||
             (recurringTransactionStartMonth === recurringTransactionSettings.month && 
                recurringTransactionStartDate < recurringTransactionSettings.dayOfTheMonth) ||
             (recurringTransactionStartMonth === recurringTransactionSettings.month && 
                recurringTransactionStartDate === recurringTransactionSettings.dayOfTheMonth &&
                recurringTransactionTime.substring(0, 5) >= recurringTransactionStartDatetime.substring(11, 16))
           ) {
            lastRecurringTransactionDatetime.setUTCFullYear(lastRecurringTransactionDatetime.getUTCFullYear() - 1);
        }
    }

    const selectDatetime = new Date(lastRecurringTransactionDatetime.getUTCFullYear() + 1, 
                                    lastRecurringTransactionDatetime.getUTCMonth(), 
                                    lastRecurringTransactionDatetime.getUTCDate(), 
                                    recurringTransactionTime.substring(0, 2), 
                                    recurringTransactionTime.substring(3, 5), 
                                    recurringTransactionTime.substring(6, 8), 
                                    0);

    while(selectDatetime.toISOString().substring(0, 16) <= currentDatetime && selectDatetime.toISOString().substring(0, 16) <= recurringTransactionEndDatetime) { 
        transactionDatetimes.push(selectDatetime.toISOString().substring(0, 17) + "00Z");
        selectDatetime.setUTCFullYear(selectDatetime.getUTCFullYear() + 1);
    }
    return transactionDatetimes;
}


//calculate the monthly recurring transaction datetime based on the recurring transaction settings
function caculateMonthlyRecurringTransactions(recurringTransactionStartDatetime,
                                              lastRecurringTransactionDatetime,
                                              recurringTransactionEndDatetime,
                                              recurringTransactionSettings) {
    // recurringTransactionSettings = {
    //     frequency: [null, "Daily", "Weekly", "Monthly", "Yearly"],
    //     dayOfTheWeek: from 0 to 6 [monday for sunday] or null, 
    //     dayOfTheMonth: from 1 to 31 or null,
    //     month: from 0 to 11 or null,
    //     time: "hh:mm:00" or null,
    // }

    const dayOfTheMonthFormatRegex = /^[1-9]((?<=[1,2])[0-9]?|[0, 1]?)$/;
    if ( !dayOfTheMonthFormatRegex.test(recurringTransactionSettings.dayOfTheMonth) ) return [];

    const timeFormatRegex = /^\d{2}[:]\d{2}[:]\d{2}$/;
    if( !timeFormatRegex.test(recurringTransactionSettings.time) ) return [];

    const currentDatetime = new Date().toISOString().substring(0, 16);
    lastRecurringTransactionDatetime = lastRecurringTransactionDatetime !== null? new Date(lastRecurringTransactionDatetime): null;
    const recurringTransactionStartDatetimeObject = new Date(recurringTransactionStartDatetime);
    recurringTransactionEndDatetime = recurringTransactionEndDatetime.substring(0, 16);
    recurringTransactionStartDatetime = recurringTransactionStartDatetime.substring(0, 16);
    const recurringTransactionTime = recurringTransactionSettings.time;

    if (currentDatetime <= lastRecurringTransactionDatetime || currentDatetime < recurringTransactionStartDatetime) return [];

    const transactionDatetimes = [];

    if (lastRecurringTransactionDatetime === null) { 
        const recurringTransactionStartDate = recurringTransactionStartDatetimeObject.getUTCDate();
        lastRecurringTransactionDatetime = new Date(recurringTransactionStartDatetimeObject);
        lastRecurringTransactionDatetime.setUTCDate(recurringTransactionSettings.dayOfTheMonth);
        if ( (recurringTransactionStartDate < recurringTransactionSettings.dayOfTheMonth) ||
             (recurringTransactionStartDate === recurringTransactionSettings.dayOfTheMonth && recurringTransactionTime.substring(0, 5) >= recurringTransactionStartDatetime.substring(11, 16))
           ) {
            lastRecurringTransactionDatetime.setUTCMonth(lastRecurringTransactionDatetime.getUTCMonth() - 1);
        }
    }

    const selectDatetime = new Date(lastRecurringTransactionDatetime.getUTCFullYear(), 
                                    lastRecurringTransactionDatetime.getUTCMonth() + 1, 
                                    lastRecurringTransactionDatetime.getUTCDate(), 
                                    recurringTransactionTime.substring(0, 2), 
                                    recurringTransactionTime.substring(3, 5), 
                                    recurringTransactionTime.substring(6, 8), 
                                    0);

    while(selectDatetime.toISOString().substring(0, 16) <= currentDatetime && selectDatetime.toISOString().substring(0, 16) <= recurringTransactionEndDatetime) { 
        transactionDatetimes.push(selectDatetime.toISOString().substring(0, 17) + "00Z");
        selectDatetime.setUTCMonth(selectDatetime.getUTCMonth() + 1);
    }
    return transactionDatetimes;
}



//caculate the weekly recurring transaction datetime based on the recurring transaction settings
function caculateWeeklyRecurringTransactions(recurringTransactionStartDatetime,
                                             lastRecurringTransactionDatetime,
                                             recurringTransactionEndDatetime,
                                             recurringTransactionSettings) {
    // recurringTransactionSettings = {
    //     frequency: [null, "Daily", "Weekly", "Monthly", "Yearly"],
    //     dayOfTheWeek: from 0 to 6 [monday for sunday] or null, 
    //     dayOfTheMonth: from 1 to 31 or null,
    //     month: from 0 to 11 or null,
    //     time: "hh:mm:00" or null,
    // }

    const dayOfTheWeekFormatRegex = /^[0-6]$/;
    if ( !dayOfTheWeekFormatRegex.test(recurringTransactionSettings.dayOfTheWeek) ) return [];

    const timeFormatRegex = /^\d{2}[:]\d{2}[:]\d{2}$/;
    if( !timeFormatRegex.test(recurringTransactionSettings.time) ) return [];

    const currentDatetime = new Date().toISOString().substring(0, 16);
    lastRecurringTransactionDatetime = lastRecurringTransactionDatetime !== null? new Date(lastRecurringTransactionDatetime): null;
    const recurringTransactionStartDatetimeObject = new Date(recurringTransactionStartDatetime);
    recurringTransactionEndDatetime = recurringTransactionEndDatetime.substring(0, 16);
    recurringTransactionStartDatetime = recurringTransactionStartDatetime.substring(0, 16);
    const recurringTransactionTime = recurringTransactionSettings.time;

    if (currentDatetime <= lastRecurringTransactionDatetime || currentDatetime < recurringTransactionStartDatetime) return [];

    const transactionDatetimes = [];

    if (lastRecurringTransactionDatetime === null) { 
        // lastRecurringTransactionDatetime = new Date(recurringTransactionStartDatetime);
        // lastRecurringTransactionDatetime.setUTCDate(lastRecurringTransactionDatetime.getUTCDate() - 1);
        //re map the number to fit the value used in our system, as our system uses 0 for monday and 6 for sunday
        const recurringTransactionStartDay = recurringTransactionStartDatetimeObject.getUTCDay() === 0? 6: recurringTransactionStartDatetimeObject.getUTCDay() - 1;
        const recurringTransactionDay = recurringTransactionSettings.dayOfTheWeek;
        const dayDifference = recurringTransactionDay - recurringTransactionStartDay;
        if (dayDifference > 0) {
            lastRecurringTransactionDatetime = new Date(recurringTransactionStartDatetimeObject);
            lastRecurringTransactionDatetime.setUTCDate(lastRecurringTransactionDatetime.getUTCDate() + dayDifference - 7);
        } else if (dayDifference < 0) {
            lastRecurringTransactionDatetime = recurringTransactionStartDatetimeObject;
            lastRecurringTransactionDatetime.setUTCDate(lastRecurringTransactionDatetime.getUTCDate() + ( 7 + dayDifference ) - 7);
        } else if (recurringTransactionTime.substring(0, 5) >= recurringTransactionStartDatetime.substring(11, 16)) {
            lastRecurringTransactionDatetime = new Date(recurringTransactionStartDatetime - 7);
        } else if (recurringTransactionTime.substring(0, 5) < recurringTransactionStartDatetime.substring(11, 16)) {
            lastRecurringTransactionDatetime = new Date(recurringTransactionStartDatetime);
        } 
    }

    const selectDatetime = new Date(lastRecurringTransactionDatetime.getUTCFullYear(), 
                                    lastRecurringTransactionDatetime.getUTCMonth(), 
                                    lastRecurringTransactionDatetime.getUTCDate() + 7, 
                                    recurringTransactionTime.substring(0, 2), 
                                    recurringTransactionTime.substring(3, 5), 
                                    recurringTransactionTime.substring(6, 8), 
                                    0);

    while(selectDatetime.toISOString().substring(0, 16) <= currentDatetime && selectDatetime.toISOString().substring(0, 16) <= recurringTransactionEndDatetime) { 
        transactionDatetimes.push(selectDatetime.toISOString().substring(0, 17) + "00Z");
        selectDatetime.setUTCDate(selectDatetime.getUTCDate() + 7);
    }
    return transactionDatetimes;
}

//caculate the daily recurring transaction datetime based on the recurring transaction settings
function calculateDailyRecurringTransactions(recurringTransactionStartDatetime,
                                             lastRecurringTransactionDatetime, 
                                             recurringTransactionEndDatetime, 
                                             recurringTransactionSettings) {
    //calculate the recurring transactions based on the daily frequency
    // recurringTransactionSettings = {
    //     frequency: [null, "Daily", "Weekly", "Monthly", "Yearly"],
    //     dayOfTheWeek: from 0 to 6 or null,
    //     dayOfTheMonth: from 1 to 31 or null,
    //     month: from 0 to 11 or null,
    //     time: "hh:mm:00" or null,
    // }

    const timeFormatRegex = /^\d{2}[:]\d{2}[:]\d{2}$/;
    if( !timeFormatRegex.test(recurringTransactionSettings.time) ) return [];

    const currentDatetime = new Date().toISOString().substring(0, 16);
    lastRecurringTransactionDatetime = lastRecurringTransactionDatetime !== null? new Date(lastRecurringTransactionDatetime): null;
    recurringTransactionEndDatetime = recurringTransactionEndDatetime.substring(0, 16);
    recurringTransactionStartDatetime = recurringTransactionStartDatetime.substring(0, 16);
    const recurringTransactionTime = recurringTransactionSettings.time;

    if (currentDatetime <= lastRecurringTransactionDatetime || currentDatetime < recurringTransactionStartDatetime) return [];

    const transactionDatetimes = [];
    if (lastRecurringTransactionDatetime === null && recurringTransactionTime.substring(0, 5) >= recurringTransactionStartDatetime.substring(11, 16)) { 
        lastRecurringTransactionDatetime = new Date(recurringTransactionStartDatetime);
        lastRecurringTransactionDatetime.setUTCDate(lastRecurringTransactionDatetime.getUTCDate() - 1);
    } else if (lastRecurringTransactionDatetime === null && recurringTransactionTime.substring(0, 5) < recurringTransactionStartDatetime.substring(11, 16)) {
        lastRecurringTransactionDatetime = new Date(recurringTransactionStartDatetime);
    }
    const selectDatetime = new Date(lastRecurringTransactionDatetime.getUTCFullYear(), 
                                    lastRecurringTransactionDatetime.getUTCMonth(), 
                                    lastRecurringTransactionDatetime.getUTCDate() + 1, 
                                    recurringTransactionTime.substring(0, 2), 
                                    recurringTransactionTime.substring(3, 5), 
                                    recurringTransactionTime.substring(6, 8), 
                                    0);

    while(selectDatetime.toISOString().substring(0, 16) <= currentDatetime && selectDatetime.toISOString().substring(0, 16) <= recurringTransactionEndDatetime) { 
        transactionDatetimes.push(selectDatetime.toISOString().substring(0, 17) + "00Z");
        selectDatetime.setUTCDate(selectDatetime.getUTCDate() + 1);
    }
    return transactionDatetimes;
}

function enterRecurringTransactions() {
    // console.log("In enterRecurringTransactions");
    return new Promise((resolve, reject) => {
        db.all(`SELECT *
                FROM recurringTransactions`, (err, rows) => { 
                    if (err) { 
                        // console.log(`Error getting recurring transactions ${err}`); 
                        reject(constructErrorMsgFromSQLiteError(err, "Error fetching recurring transactions", {value: null}));
                    }
                    
                    // console.log("Recurring transactions retrieved successfully");
                    //// console.log(rows);
                    let newLastRecurringTransactionDatetime = null;
                    rows.forEach( (row) => {
                        newLastRecurringTransactionDatetime = row.lastRecurringTransactionDate;
                        //create a transaction entries based on the recurring frequency settings in transaction table
                        //need to handle each frequency type separately
                        let transactionDatetimes = [];
                        const recurringTransactionSettings =  {
                            frequency: row.recurringFrequencyType,
                            dayOfTheWeek: row.recurringFrequencyDayOfTheWeek? Number(row.recurringFrequencyDayOfTheWeek): null,
                            dayOfTheMonth: row.recurringFrequencyDayOfTheMonth? Number(row.recurringFrequencyDayOfTheMonth): null,
                            month: row.recurringFrequencyMonthOfTheYear? Number(row.recurringFrequencyMonthOfTheYear): null,
                            time: row.recurringFrequencyTime,
                        };
                        // for daily recurring transactions
                        if (row.recurringFrequencyType === "Daily") {
                            transactionDatetimes = calculateDailyRecurringTransactions(
                                                                                    row.recurringTransactionStartDate,
                                                                                    row.lastRecurringTransactionDate, 
                                                                                    row.recurringTransactionEndDate,
                                                                                    recurringTransactionSettings);
                        }
                        // for weekly recurring transactions
                        if (row.recurringFrequencyType === "Weekly") {
                            transactionDatetimes = caculateWeeklyRecurringTransactions(row.recurringTransactionStartDate,
                                                                                    row.lastRecurringTransactionDate,
                                                                                    row.recurringTransactionEndDate,
                                                                                    recurringTransactionSettings);
                        }
                        // for monthly recurring transactions
                        if (row.recurringFrequencyType === "Monthly") {
                            transactionDatetimes = caculateMonthlyRecurringTransactions(row.recurringTransactionStartDate,
                                                                                        row.lastRecurringTransactionDate,
                                                                                        row.recurringTransactionEndDate,
                                                                                        recurringTransactionSettings);
                        }
                        // for yearly recurring transactions
                        if (row.recurringFrequencyType === "Yearly") {
                            transactionDatetimes = calcualteYearlyRecurringTransactions(row.recurringTransactionStartDate,
                                                                                        row.lastRecurringTransactionDate,
                                                                                        row.recurringTransactionEndDate,
                                                                                        recurringTransactionSettings);
                        }
                        newLastRecurringTransactionDatetime = transactionDatetimes.length > 0? transactionDatetimes[transactionDatetimes.length - 1]: newLastRecurringTransactionDatetime;
                        //insert the transaction entries into the transaction table
                        const transactionTableInsertionStmt = db.prepare(`INSERT INTO transactions (\
                                                                            id, \
                                                                            title, \
                                                                            description, \
                                                                            value, \
                                                                            currency, \
                                                                            transactionType, \
                                                                            transactionCategory, \
                                                                            fromReference, \
                                                                            toReference, \
                                                                            recurringReference, \
                                                                            file, \
                                                                            createdDate, \
                                                                            modifiedDate, \
                                                                            transactionDate \
                                                                            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
                        transactionDatetimes.forEach((transactionDatetime) => { 
                            transactionTableInsertionStmt.run( uuidv4(),
                                                                row.title,
                                                                row.description,
                                                                row.value,
                                                                row.currency,
                                                                row.transactionType,
                                                                row.transactionCategory,
                                                                row.fromReference,
                                                                row.toReference,
                                                                row.id,
                                                                0,
                                                                new Date().toISOString().substring(0, 19) + "Z",
                                                                new Date().toISOString().substring(0, 19) + "Z",
                                                                transactionDatetime);
                        });
                        transactionTableInsertionStmt.finalize((err) => {
                            if (err) {
                                // console.log(`Error inserting recurring transaction ${err}`);
                                reject(constructErrorMsgFromSQLiteError(err, "Error while inserting transaction entries", {value: null}));
                            }
                        });
                        //update the lastRecurringTransactionDate in the recurringTransactions table
                        db.run(`UPDATE recurringTransactions SET lastRecurringTransactionDate = ? WHERE id = ?`,
                                newLastRecurringTransactionDatetime, 
                                row.id, 
                                (err) => { 
                                    if (err) { 
                                        // console.log(`Error updating lastRecurringTransactionDate ${err}`); 
                                        reject(constructErrorMsgFromSQLiteError(err, "Error while updating last recurring transaction date", {value: null}));
                                    }
                        });
                    });
                    resolve(true);
                    
        });
    });
}

function convertDataFromDBFormat(data) {
    data = JSON.parse(JSON.stringify(data));
    const daysOfTheWeek = new Map(Object.entries({0: "Monday", 1: "Tuesday", 2: "Wednesday", 3: "Thursday", 4: "Friday", 5: "Saturday", 6: "Sunday"}));
    const monthsOfTheYear = new Map(Object.entries({0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr", 4: "May", 5: "Jun", 6: "Jul", 7: "Aug", 8: "Sep", 9: "Oct", 10: "Nov", 11: "Dec"}));

    const formatDateTime = (dateTime) => {
        const regex = /^\d{4}[-]\d{2}[-]\d{2}[T]\d{2}[:]\d{2}[:]\d{2}$/;
        if( regex.test(dateTime) ) {
            return dateTime.substring(0, 16);
        }
        return null;
    };

    const formatTime = (time) => {
        const regex = /^\d{2}[:]\d{2}[:]\d{2}$/;
        if( regex.test(time) ) {
            return time.substring(0, 5);
        }
        return null;
    };

    const formatNumber = (key, number) => {
        const regex = /^\d+[.]*\d*$/;
        if( key === "value" && regex.test(number) ) {
            return String(number);
        }
        return null;
    };

    const formatDayOfTheWeek = (dayOfTheWeek) => {
        if (daysOfTheWeek.has(dayOfTheWeek)) {
            return daysOfTheWeek.get(dayOfTheWeek);
        }
        return null;
    };

    const formatMonthOfTheYear = (monthOfTheYear) => {
        if (monthsOfTheYear.has(monthOfTheYear)) {
            return monthsOfTheYear.get(monthOfTheYear);
        }
        return null;
    };

    const recursiveExplorer = function recEx(data) { 
        Object.keys(data).forEach((key) => { 
            if (data[key] !== null && typeof data[key] === "object" && !Array.isArray(data[key])) {
                recEx(data[key]);
            } else if (data[key]) {
                let formattedValue = null;
                //check if it is a date; format it
                formattedValue = formatDateTime(data[key]);
                //check if it is a time; format it
                formattedValue = formattedValue === null ? formatTime(data[key]): formattedValue;
                //check if it is a number; format it
                formattedValue = formattedValue === null && key === "value" ? formatNumber(key, data[key]): formattedValue;
                //check if it is a day of the week; format it
                formattedValue = formattedValue === null && key === "dayOfTheWeek"? formatDayOfTheWeek(data[key]): formattedValue;
                //check if it is a month of the year; format it
                formattedValue = formattedValue === null && key === "month" ? formatMonthOfTheYear(data[key]): formattedValue;
                data[key] = formattedValue !== null? formattedValue : data[key];
            }
        });
        return data;
    };

    return recursiveExplorer(data);
}

function  convertDataToDBFormat(data) {
    data = JSON.parse(JSON.stringify(data));
    const daysOfTheWeek = new Map(Object.entries({"Monday": 0, "Tuesday": 1, "Wednesday": 2, "Thursday": 3, "Friday": 4, "Saturday": 5, "Sunday": 6}));
    const monthsOfTheYear = new Map(Object.entries({"Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5, "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11}));

    const formatDateTime = (dateTime) => {
        const regex = /^\d{4}[-]\d{2}[-]\d{2}[T]\d{2}[:]\d{2}$/;
        if( regex.test(dateTime) ) {
            return (dateTime + ":00" );
        }
        return null;
    };

    const formatTime = (time) => {
        const regex = /^\d{2}[:]\d{2}$/;
        if( regex.test(time) ) {
            return (time + ":00" );
        }
        return null;
    };

    const formatNumber = (number) => {
        const regex = /^\d+[.]*\d*$/;
        if( regex.test(number) ) {
            return Number(number);
        }
        return null;
    };

    const formatDayOfTheWeek = (dayOfTheWeek) => {
        if (daysOfTheWeek.has(dayOfTheWeek)) {
            return daysOfTheWeek.get(dayOfTheWeek);
        }
        return null;
    };

    const formatMonthOfTheYear = (monthOfTheYear) => {
        if (monthsOfTheYear.has(monthOfTheYear)) {
            return monthsOfTheYear.get(monthOfTheYear);
        }
        return null;
    };

    const recursiveExplorer = function recEx(data) { 
        Object.keys(data).forEach((key) => { 
            if (data[key] !== null && typeof data[key] === "object" && !Array.isArray(data[key])) {
                recEx(data[key]);
            } else if (data[key]) {
                let formattedValue = null;
                //check if it is a date; format it
                formattedValue = formatDateTime(data[key]);
                //check if it is a time; format it
                formattedValue = formattedValue === null ? formatTime(data[key]): formattedValue;
                //check if it is a number; format it
                formattedValue = formattedValue === null && key === "value" ? formatNumber(data[key]): formattedValue;
                //check if it is a day of the week; format it
                formattedValue = formattedValue === null ? formatDayOfTheWeek(data[key]): formattedValue;
                //check if it is a month of the year; format it
                formattedValue = formattedValue === null ? formatMonthOfTheYear(data[key]): formattedValue;
                data[key] = formattedValue !== null? formattedValue : data[key];
            }
        });
        return data;
    };

    return recursiveExplorer(data);
}

function getAllItems() {

    return new Promise((resolve, reject) => {
        db.all(`SELECT id, \
                title, \
                recurringFrequencyType as recurringFrequency, \
                value, \
                transactionType, \
                transactionCategory \
                FROM recurringTransactions
                ORDER BY createdDate ASC`, (err, rows) => {
            if (err) {
                // console.log("Recurring Entity: In getAllItems: err: ", err);
                reject(constructErrorMsgFromSQLiteError(err, "Error could not get all items", {value: null}));
            }
            resolve(rows? rows : []);
        });
    });
    /*
    return [
            { id: 91, 
                title: "name",
                recurringFrequency: "2024-01-01",
                value: 100,
                transactionType: "Out",
                transactionCategory: "Groceries",
                },
                { id: 92, 
                    title: "name",
                    recurringFrequency: "2024-01-01",
                    value: 100,
                    transactionType: "Out",
                    transactionCategory: "Groceries",
                },
                { id: 93, 
                    title: "name",
                    recurringFrequency: "2024-01-01",
                    value: 100,
                    transactionType: "Out",
                    transactionCategory: "Groceries",
                },
                { id: 94,
                    title: "name",
                    recurringFrequency: "2024-01-01",
                    value: 100,
                    transactionType: "Out",
                    transactionCategory: "Groceries",
                },
    ];
    */
}

function getItems(event, searchParams, filterParamsVisibility) {
    if (!validateBrowserWindowPath(event.senderFrame.url)) return new Promise((resolve, reject) => { reject(constructValidationError("URL Validation Failed", {value: null})); });
    // console.log("In getItems: searchParams: ", searchParams, " filterParamsVisibility: ", filterParamsVisibility)
    searchParams = JSON.parse(JSON.stringify(searchParams));
    searchParams = convertDataToDBFormat(searchParams);
    return new Promise((resolve, reject) => {
        db.serialize(() => { 
            const fetchFromReferenceID = new Promise((resolve, reject) => { 
                db.get(`SELECT id FROM financialEntities WHERE title = ?`, searchParams.filter.fromEntity, (err, row) => { 
                    if (err) { 
                        // console.log("Recurring Entity: In getItems: fetchFromReferenceID: err: ", err);
                        reject(constructErrorMsgFromSQLiteError(err, "Error, could not get from reference id", {value: null}));
                    }
                    resolve(row ? row.id : null);
                });
            });

            const fetchToReferenceID = new Promise((resolve, reject) => { 
                db.get(`SELECT id FROM financialEntities WHERE title = ?`, searchParams.filter.toEntity, (err, row) => { 
                    if (err) { 
                        // console.log("Recurring Entity: In getItems: fetchToReferenceID: err: ", err);
                        reject(constructErrorMsgFromSQLiteError(err, "Error, could not get to reference id", {value: null}));
                    }
                    resolve(row ? row.id : null);
                });
            });

            Promise.all([fetchFromReferenceID, fetchToReferenceID]).then(([fromReferenceID, toReferenceID]) => { 
                // operations to change the name of certain fields to fit the column names in the database
                delete searchParams.filter.fromEntity;
                delete searchParams.filter.toEntity;
                const fromEntity = filterParamsVisibility.fromEntity;
                const toEntity = filterParamsVisibility.toEntity;
                delete filterParamsVisibility.fromEntity;
                delete filterParamsVisibility.toEntity;
                filterParamsVisibility.fromReference = fromEntity;
                filterParamsVisibility.toReference = toEntity;
                searchParams.filter.fromReference = fromReferenceID;
                searchParams.filter.toReference = toReferenceID;
                const parameters = [];
                let query = `SELECT id, \
                            title, \
                            recurringFrequencyType as recurringFrequency, \
                            value, \
                            transactionType, \
                            transactionCategory \
                            FROM recurringTransactions \
                            WHERE (( title LIKE ? ) OR ( description LIKE ? ))`;
                parameters.push(`%${searchParams.search}%`, `%${searchParams.search}%`);
                Object.keys(searchParams.filter).forEach((searchField) => { 
                    if (searchParams.filter[searchField] === null || 
                        !filterParamsVisibility[searchField] ||
                        !validFilterParams.has(searchField)) return;
                    //range based query construction
                    if (typeof searchParams.filter[searchField] === "object" && searchField !== "sort") {
                        if (searchParams.filter[searchField].min !== null && 
                            searchParams.filter[searchField].max !== null) {
                            let minField = null;
                            let maxField = null;
                            switch(searchField.slice(-4)) {
                                case "Date":
                                    minField = moment.tz(searchParams.filter[searchField].min, timeZone).tz("UTC").format().substring(0, 19) + "Z";
                                    maxField = moment.tz(searchParams.filter[searchField].max, timeZone).tz("UTC").format().substring(0, 19) + "Z";
                                    break;
                                default:
                                    minField = searchParams.filter[searchField].min;
                                    maxField = searchParams.filter[searchField].max;
                                    break;
                            }
                            query += ` AND ( ${searchField} BETWEEN ? AND ? )`;
                            parameters.push(String(minField), String(maxField));
                        }
                        return;
                    }
                    //value based query construction
                    if (searchParams.filter[searchField] === null || 
                        searchParams.filter[searchField] === "choose" || 
                        searchField === "sort") return;
                    query += ` AND ( ${searchField} = ? )`;
                    parameters.push(String(searchParams.filter[searchField]));
                });
                //construct query for sort
                if (searchParams.filter.sort.field !== null && 
                    searchParams.filter.sort.field !== "choose" &&
                    validSortFields.has(searchParams.filter.sort.field)) {
                    query += ` ORDER BY ${searchParams.filter.sort.field} ${searchParams.filter.sort.ascending === "true"? "ASC": searchParams.filter.sort.ascending === "false"? "DESC" : ""}`;
                 }
                //query and get the information from the database
                db.all(query, parameters, (err, rows) => {
                    if (err) {
                        // console.log("Recurring Entity: In getItems: err: ", err);
                        reject(constructErrorMsgFromSQLiteError(err, "Error could not fetch recurring transactions based on search parameters", {value: null}));
                    }
                    resolve(rows && rows.length > 0? rows : []);
                });
             }).catch((err) => { 
                // console.log("Recurring Entity: In getItems: err: ", err);
                reject(constructErrorMsgFromSQLiteError(err[0] || err[1], "Error could not fetch recurring transactions based on search parameters", {value: null}));
             });
        });
    });

    
    /*
    return [
        { id: 91, 
            title: "name",
            recurringFrequency: "2024-01-01",
            value: 100,
            transactionType: "Out",
            transactionCategory: "Groceries",
            },
            { id: 92, 
                title: "name",
                recurringFrequency: "2024-01-01",
                value: 100,
                transactionType: "Out",
                transactionCategory: "Groceries",
            },
            { id: 93, 
                title: "name",
                recurringFrequency: "2024-01-01",
                value: 100,
                transactionType: "Out",
                transactionCategory: "Groceries",
            }
    ]; */
}

function createEntry() {

    return new Promise((resolve, reject) => {
        db.serialize(() => {
            const currentDateTime = new Date().toISOString().substring(0, 19) + "Z";
            const uuid = uuidv4();
            db.run(`INSERT INTO recurringTransactions (\
                    id, \
                    title, \
                    description, \
                    value, \
                    currency, \
                    transactionType, \
                    transactionCategory, \
                    fromReference, \
                    toReference, \
                    createdDate, \
                    modifiedDate, \
                    recurringFrequencyType, \
                    recurringFrequencyDayOfTheWeek, \
                    recurringFrequencyDayOfTheMonth, \
                    recurringFrequencyMonthOfTheYear, \
                    recurringFrequencyTime, \
                    recurringTransactionStartDate, \
                    recurringTransactionEndDate, \
                    lastRecurringTransactionDate \
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                    uuid, 
                    "New Entry", 
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    currentDateTime, 
                    currentDateTime,
                    null, 
                    null, 
                    null, 
                    null, 
                    null, 
                    null, 
                    null, 
                    null, 
                    (err) => {
                        if (err) {
                            // console.log("Recurring Entity: In createEntry: err: ", err);
                            reject(constructErrorMsgFromSQLiteError(err, "Error could not create new entry; check whether title already exist.", {value: null}));
                        }
                        resolve({
                            id: uuid, 
                            title: "NEW Entry",
                            recurringFrequency: null,
                            value: null,
                            transactionType: null,
                            transactionCategory: null,
                        });
                    });
        });
    });
    /*
    return { id: 1, 
        title: "name",
        recurringFrequency: "2024-01-01",
        value: 100,
        transactionType: "Out",
        transactionCategory: "Groceries",
        };
    */
}

function modifyItem(event, selectedItem) {
    if (!validateBrowserWindowPath(event.senderFrame.url)) return new Promise((resolve, reject) => { reject(constructValidationError("URL Validation Failed", {value: null})); });
    // console.log("In modifyItem: selectedItem: ", selectedItem);
    selectedItem = convertDataToDBFormat(selectedItem);
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            const getFromFinancialEntityID = new Promise((resolve, reject) => { 
                db.all(`SELECT id FROM financialEntities WHERE title = ?`, selectedItem.fromEntity, (err, row) => { 
                    if (err) { 
                        // console.log("Recurring Entity: In modifyItem: getFromFinancialEntityID: err: ", err);
                        reject(constructErrorMsgFromSQLiteError(err, "Error could not get from financial entity id", {value: null}));
                    }
                    resolve(row && row.length > 0 ? row[0].id : null);
                });
            });

            const getToFinancialEntityID = new Promise((resolve, reject) => { 
                db.all(`SELECT id FROM financialEntities WHERE title = ?`, selectedItem.toEntity, (err, row) => { 
                    if (err) { 
                        // console.log("Recurring Entity: In modifyItem: getFromFinancialEntityID: err: ", err);
                        reject(constructErrorMsgFromSQLiteError(err, "Error could not get to financial entity id", {value: null}));
                    }
                    resolve(row && row.length > 0 ? row[0].id : null);
                });
            });

            Promise.all([getFromFinancialEntityID, 
                        getToFinancialEntityID]).then(([fromReference, toReference]) => {
                const recurringTransactionStartDate = moment.tz(selectedItem.recurringTransactionStartDate, timeZone).tz("UTC").format().substring(0, 19) + "Z";
                const recurringTransactionEndDate = moment.tz(selectedItem.recurringTransactionEndDate, timeZone).tz("UTC").format().substring(0, 19) + "Z";
                db.run(`UPDATE recurringTransactions SET \
                        title = ?, \
                        description = ?, \
                        value = ?, \
                        currency = ?, \
                        transactionType = ?, \
                        transactionCategory = ?, \
                        fromReference = ?, \
                        toReference = ?, \
                        modifiedDate = ?, \
                        recurringFrequencyType = ?, \
                        recurringFrequencyDayOfTheWeek = ?, \
                        recurringFrequencyDayOfTheMonth = ?, \
                        recurringFrequencyMonthOfTheYear = ?, \
                        recurringFrequencyTime = ?, \
                        recurringTransactionStartDate = ?, \
                        recurringTransactionEndDate = ? \
                        WHERE id = ?`,
                        selectedItem.title,
                        selectedItem.description,
                        selectedItem.value,
                        selectedItem.currency !== "choose"? selectedItem.currency : null,
                        selectedItem.transactionType,
                        selectedItem.transactionCategory !== "choose"? selectedItem.transactionCategory : null,
                        fromReference,
                        toReference,
                        new Date().toISOString().substring(0, 19) + "Z",
                        selectedItem.recurringFrequency.frequency && selectedItem.recurringFrequency.frequency !== "choose"? selectedItem.recurringFrequency.frequency : null,
                        selectedItem.recurringFrequency.frequency === "Weekly" ? selectedItem.recurringFrequency.dayOfTheWeek: null,
                        selectedItem.recurringFrequency.frequency === "Monthly" || selectedItem.recurringFrequency.frequency === "Yearly"? selectedItem.recurringFrequency.dayOfTheMonth: null,
                        selectedItem.recurringFrequency.frequency === "Yearly" ? selectedItem.recurringFrequency.month: null,
                        selectedItem.recurringFrequency.frequency !== "choose"? selectedItem.recurringFrequency.time : null,
                        recurringTransactionStartDate,
                        recurringTransactionEndDate,
                        selectedItem.id,
                        (err) => {
                            if (err) {
                                // console.log("Recurring Entity: In modifyItem: err: ", err);
                                reject(constructErrorMsgFromSQLiteError(err, "Error could not modify item", {value: null}));
                            }
                            resolve({
                                    id: selectedItem.id, 
                                    title: selectedItem.title,
                                    recurringFrequency: selectedItem.recurringFrequency.frequency ?? undefined,
                                    value: selectedItem.value,
                                    transactionType: selectedItem.transactionType,
                                    transactionCategory: selectedItem.transactionCategory,   
                            });
                        });
            }).catch((err) => {
                // console.log("Recurring Entity: In modifyItem: err: ", err);
                reject(constructErrorMsgFromSQLiteError(err[0] || err[1], "Error could not modify item", {value: null}));
            });
        });
    });
    /*
    return { modifyStatus: true, item: { id: 1, 
                                        title: "Modified name",
                                        recurringFrequency: "Monthly",
                                        value: 100,
                                        transactionType: "Out",
                                        transactionCategory: "Groceries",
                                        }
            };
    */
}

function deleteItem(event, uuid) {
    if (!validateBrowserWindowPath(event.senderFrame.url)) return new Promise((resolve, reject) => { reject(constructValidationError("URL Validation Failed", {value: null})); });
    // console.log("In deleteItem: uuid: " + uuid);
    return new Promise((resolve, reject) => {
        new Promise((resolve, reject) => {
            db.run(`DELETE FROM recurringTransactions WHERE id = ?`, uuid, (err) => {
                if (err) {
                    // console.log("Recurring Entity: In deleteItem: err: ", err);
                    reject(constructErrorMsgFromSQLiteError(err, "Error could not delete the recurring transaction", {value: null}));
                }
                resolve(uuid);
            });
        }).then((uuid) => {
            db.run(`UPDATE transactions SET recurringReference = NULL \
                    WHERE recurringReference = ?`, uuid, (err) => {
                        if (err) {
                            // console.log("Recurring Entity: In deleteItem: err: ", err);
                            reject(constructErrorMsgFromSQLiteError(err, "Error could not update the transactions table, after deleting recurring transaction", {value: null}));
                        }
                        resolve();
                     });
        }).catch((err) => {
            // console.log("Recurring Entity: In deleteItem: err: ", err);
            reject(constructErrorMsgFromSQLiteError(err, "Error could not delete the recurring transaction", {value: null}));
        });
    });
    //return true;
}

function getSelectedItem(event, uuid) {
    if (!validateBrowserWindowPath(event.senderFrame.url)) return new Promise((resolve, reject) => { reject(constructValidationError("URL Validation Failed", {value: null})); });

    // console.log("In getSelectedItem: uuid: " + uuid);

    return new Promise((resolve, reject) => {

        new Promise((resolve, reject) => {
            db.all(`SELECT \
                    title, \
                    description, \
                    value, \
                    currency, \
                    transactionType, \
                    transactionCategory, \
                    fromReference, \
                    toReference, \
                    createdDate, \
                    modifiedDate, \
                    recurringFrequencyType AS frequency, \
                    recurringFrequencyDayOfTheWeek AS dayOfTheWeek, \
                    recurringFrequencyDayOfTheMonth AS dayOfTheMonth, \
                    recurringFrequencyMonthOfTheYear AS month, \
                    recurringFrequencyTime AS time, \
                    recurringTransactionStartDate, \
                    recurringTransactionEndDate, \
                    lastRecurringTransactionDate \
                    FROM recurringTransactions WHERE id = ?`, uuid, (err, row) => {
                        if (err) {
                            // console.log("Recurring Entity: In getSelectedItem: getRecurringTransactions: err: ", err);
                            reject(constructErrorMsgFromSQLiteError(err, "Error could not fetch the details of recurring transaction", {value: null}));
                        }
                        resolve(row && row.length > 0 ? row[0] : null);
                    });
        }).then((recurringTransactionRow) => {

            const getFromEntityTitle = new Promise((resolve, reject) => {
                db.get(`SELECT title, type FROM financialEntities WHERE id = ?`, recurringTransactionRow.fromReference, (err, row) => { 
                    if (err) { 
                        // console.log("Recurring Entity: In getSelectedItem: getFromEntityTitle: err: ", err);
                        reject(constructErrorMsgFromSQLiteError(err, "Error could not fetch the from entity title", {value: null}));
                    }
                    resolve(row ? row : null);
                });
            });

            const getToEntityTitle = new Promise((resolve, reject) => {
                db.get(`SELECT title, type FROM financialEntities WHERE id = ?`, recurringTransactionRow.toReference, (err, row) => { 
                    if (err) { 
                        // console.log("Recurring Entity: In getSelectedItem: getToEntityTitle: err: ", err);
                        reject(constructErrorMsgFromSQLiteError(err, "Error could not fetch the to entity title", {value: null}));
                    }
                    resolve(row ? row : null);
                });
            });

            Promise.all([getFromEntityTitle,
                        getToEntityTitle]).then(([fromFinancialEntityRow, toFinancialEntityRow]) => {
                const creatdDate = moment(recurringTransactionRow.createdDate).tz(timeZone).format().substring(0, 19);
                const modifiedDate = moment(recurringTransactionRow.modifiedDate).tz(timeZone).format().substring(0, 19);
                const recurringTransactionStartDate = moment(recurringTransactionRow.recurringTransactionStartDate).tz(timeZone).format().substring(0, 19);
                const recurringTransactionEndDate = moment(recurringTransactionRow.recurringTransactionEndDate).tz(timeZone).format().substring(0, 19);
                const lastRecurringTransactionDate = moment(recurringTransactionRow.lastRecurringTransactionDate).tz(timeZone).format().substring(0, 19);
                const selectedItem = convertDataFromDBFormat({
                                                                id: uuid, 
                                                                title: recurringTransactionRow.title,
                                                                description: recurringTransactionRow.description,
                                                                value: recurringTransactionRow.value,
                                                                currency: recurringTransactionRow.currency,
                                                                transactionType: recurringTransactionRow.transactionType,
                                                                transactionCategory: recurringTransactionRow.transactionCategory,
                                                                fromType: fromFinancialEntityRow ? fromFinancialEntityRow.type : null,
                                                                fromEntity: fromFinancialEntityRow ? fromFinancialEntityRow.title : null,
                                                                toType: toFinancialEntityRow ? toFinancialEntityRow.type : null,
                                                                toEntity: toFinancialEntityRow ? toFinancialEntityRow.title : null,
                                                                createdDate: creatdDate,
                                                                modifiedDate: modifiedDate,
                                                                recurringFrequency: {
                                                                    frequency: recurringTransactionRow.frequency ?? undefined,
                                                                    dayOfTheWeek: recurringTransactionRow.dayOfTheWeek ?? undefined,
                                                                    dayOfTheMonth: recurringTransactionRow.dayOfTheMonth ?? undefined,
                                                                    month: recurringTransactionRow.month ?? undefined,
                                                                    time: recurringTransactionRow.time?? undefined,
                                                                },
                                                                recurringTransactionStartDate: recurringTransactionStartDate,
                                                                recurringTransactionEndDate: recurringTransactionEndDate,
                                                                lastRecurringTransactionDate: lastRecurringTransactionDate,
                                                            });
                resolve(selectedItem);
            });
        }).catch((err) => {
            // console.log("Recurring Entity: In getSelectedItem: err: ", err);
            reject(constructErrorMsgFromSQLiteError(err, "Error could not fetch the details of recurring transaction", {value: null}));
        });
    });
    /*
    return {
        id: "", //uuidv4 template
        title: null,
        description: null,
        value: null,
        currency: null,
        transactionType: null,
        transactionCategory: null,
        fromEntity: null, //computed by backend
        fromType: null,
        toEntity: null, //computed by backend
        toType: null,
        //recurringEntity: null,
        //file: [], 
        createdDate: "YYYY-MM-DDThh:mm:ss",
        modifiedDate: "YYYY-MM-DDThh:mm:ss",
        //transactionDate: "YYYY-MM-DDThh:mm:ss",
        recurringFrequency: {},
        recurringTransactionStartDate: "YYYY-MM-DDThh:mm:ss",
        recurringTransactionEndDate: "YYYY-MM-DDThh:mm:ss",
    };
    */
}

module.exports = {
    setDB,
    setTimeZone,
    getAllItems,
    getItems,
    createEntry,
    modifyItem,
    deleteItem,
    getSelectedItem,
    getRecurringTransactions,
    enterRecurringTransactions,
    getIdFromTitle,
    updateFinancialEntityReferenceID,
};