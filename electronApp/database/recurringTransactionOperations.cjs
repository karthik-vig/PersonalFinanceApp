//const { current } = require('immer');
const { v4: uuidv4 } = require('uuid');

let db = null;

function getRecurringTransactions() {
    //communicate with the database to get the recurring transactions
    return new Promise((resolve, reject) => {
        db.run(`SELECT title FROM recurringTransactions`, (err, rows) => { 
            if (err) { 
                console.log("Recurring Entity: In getRecurringTransactions: err: ", err);
                reject(true);
            } else {
                resolve(rows? rows : []);
            }
        });
    });
    //return ["entity1", "entity2", "entity3", "entity4"];
}

function setDB(database) {
    //set the database to be used by the module
    db = database;
    console.log("In setDB: db: " + db);
}

/*
function getDateFromDatetime(dateTime) {
    const regex = /^\d{4}[-]\d{2}[-]\d{2}[T]\d{2}[:]\d{2}[:]\d{2}$/;
    if( regex.test(dateTime) ) {
        return dateTime.substring(0, 10);
    }
    return null;
}
*/

/*
function getDecimalTimeFromDateTime(dateTime) {
    const regex = /^\d{4}[-]\d{2}[-]\d{2}[T]\d{2}[:]\d{2}[:]\d{2}$/;
    if( regex.test(dateTime) ) {
        const datetime = new Date(dateTime);
        return (datetime.getHours() + datetime.getMinutes()/60);
    }
    return null;
}
*/

//caculate the recurring transaction datetime based on the recurring transaction settings
function calculateDailyRecurringTransactions(recurringTransactionStartDatetime,
                                             lastRecurringTransactionDatetime, 
                                             recurringTransactionEndDatetime, 
                                             recurringTransactionSettings) {
    //calculate the recurring transactions based on the daily frequency
    /* recurringTransactionSettings = {
        frequency: [null, "Daily", "Weekly", "Monthly", "Yearly"],
        dayOfTheWeek: from 0 to 6 or null,
        dayOfTheMonth: from 1 to 31 or null,
        month: from 0 to 11 or null,
        time: "hh:mm:00" or null,
     }
    */ 
    const currentDatetime = new Date().toISOString().substring(0, 16);
    //const currentDate = getDateFromDatetime(currentDatetime);
    //const currentTime = getDecimalTimeFromDateTime(currentDatetime);
    lastRecurringTransactionDatetime = lastRecurringTransactionDatetime !== null? new Date(lastRecurringTransactionDatetime): null;
    recurringTransactionEndDatetime = recurringTransactionEndDatetime.substring(0, 16);
    recurringTransactionStartDatetime = recurringTransactionStartDatetime.substring(0, 16);
    //const lastRecurringTransactionTime = getDecimalTimeFromDateTime(lastRecurringTransactionDatetime);
    //const recurringTransactionEndDate = getDateFromDatetime(recurringTransactionEndDatetime);
    //const recurringTransactionEndTime = getDecimalTimeFromDateTime(recurringTransactionEndDatetime);
    const recurringTransactionTime = recurringTransactionSettings.time;

    if (currentDatetime <= lastRecurringTransactionDatetime) return [];

    const transactionDatetimes = [];
    if (lastRecurringTransactionDatetime === null && recurringTransactionTime.substring(0, 5) >= recurringTransactionStartDatetime.substring(11, 16)) { 
        lastRecurringTransactionDatetime = new Date(recurringTransactionStartDatetime);
        lastRecurringTransactionDatetime.setDate(lastRecurringTransactionDatetime.getDate() - 1);
        //lastRecurringTransactionDatetime = datetime.toISOString().substring(0, 16);
    } else if (lastRecurringTransactionDatetime === null && recurringTransactionTime.substring(0, 5) < recurringTransactionStartDatetime.substring(11, 16)) {
        lastRecurringTransactionDatetime = new Date(recurringTransactionStartDatetime);
        //datetime.setDate(datetime.getDate() - 1);
        //lastRecurringTransactionDatetime = datetime.toISOString().substring(0, 16);
    }
    const selectDatetime = new Date(lastRecurringTransactionDatetime.getFullYear(), 
                                    lastRecurringTransactionDatetime.getMonth(), 
                                    lastRecurringTransactionDatetime.getDate() + 1, 
                                    recurringTransactionTime.substring(0, 2), 
                                    recurringTransactionTime.substring(3, 5), 
                                    recurringTransactionTime.substring(6, 8), 
                                    0);

    while(selectDatetime.toISOString().substring(0, 16) <= currentDatetime && selectDatetime.toISOString().substring(0, 16) <= recurringTransactionEndDatetime) { 
        transactionDatetimes.push(selectDatetime.toISOString().substring(0, 17) + "00");
        selectDatetime.setDate(selectDatetime.getDate() + 1);
    }
    return transactionDatetimes;
}

function enterRecurringTransactions() {
    console.log("In enterRecurringTransactions");
    return new Promise((resolve, reject) => {
        db.all(`SELECT *
                FROM recurringTransactions`, (err, rows) => { 
                    if (err) { 
                        console.log(`Error getting recurring transactions ${err}`); 
                        reject(true);
                    }
                    
                    console.log("Recurring transactions retrieved successfully");
                    //console.log(rows);
                    let newLastRecurringTransactionDatetime = null;
                    rows.forEach( (row) => {
                        newLastRecurringTransactionDatetime = row.lastRecurringTransactionDate;
                        //create a transaction entries based on the recurring frequency settings in transaction table
                        //need to handle each frequency type separately
                        let transactionDatetimes = [];
                        const recurringTransactionSettings =  {
                            frequency: row.recurringFrequencyType,
                            dayOfTheWeek: row.recurringFrequencyDayOfTheWeek,
                            dayOfTheMonth: row.recurringFrequencyDayOfTheMonth,
                            month: row.recurringFrequencyMonthOfTheYear,
                            time: row.recurringFrequencyTime,
                        };
                        if (row.recurringFrequencyType === "Daily") {
                            transactionDatetimes = calculateDailyRecurringTransactions(
                                                                                    row.recurringTransactionStartDate,
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
                                                                new Date().toISOString().substring(0, 19),
                                                                new Date().toISOString().substring(0, 19),
                                                                transactionDatetime);
                        });
                        transactionTableInsertionStmt.finalize((err) => {
                            if (err) {
                                console.log(`Error inserting recurring transaction ${err}`);
                                reject(true);
                            }
                        });
                        //update the lastRecurringTransactionDate in the recurringTransactions table
                        db.run(`UPDATE recurringTransactions SET lastRecurringTransactionDate = ? WHERE id = ?`,
                                newLastRecurringTransactionDatetime, 
                                row.id, 
                                (err) => { 
                                    if (err) { 
                                        console.log(`Error updating lastRecurringTransactionDate ${err}`); 
                                        reject(true);
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
                console.log("Recurring Entity: In getAllItems: err: ", err);
                reject(true);
            } else {
                resolve(rows? rows : []);
            }
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
    console.log("In getItems: searchParams: ", searchParams, " filterParamsVisibility: ", filterParamsVisibility)
    searchParams = JSON.parse(JSON.stringify(searchParams));
    searchParams = convertDataToDBFormat(searchParams);
    return new Promise((resolve, reject) => { 
        db.serialize(() => { 
            const fetchFromReferenceID = new Promise((resolve, reject) => { 
                db.get(`SELECT id FROM financialEntities WHERE title = ?`, searchParams.fromEntity, (err, row) => { 
                    if (err) { 
                        console.log("Recurring Entity: In getItems: fetchFromReferenceID: err: ", err);
                        reject(true);
                    } else {
                        resolve(row && row.length > 0 ? row.id : null);
                    }
                });
            });

            const fetchToReferenceID = new Promise((resolve, reject) => { 
                db.get(`SELECT id FROM financialEntities WHERE title = ?`, searchParams.toEntity, (err, row) => { 
                    if (err) { 
                        console.log("Recurring Entity: In getItems: fetchToReferenceID: err: ", err);
                        reject(true);
                    } else {
                        resolve(row && row.length > 0 ? row.id : null);
                    }
                });
            });

            Promise.all([fetchFromReferenceID, fetchToReferenceID]).then(([fromReferenceID, toReferenceID]) => { 
                delete searchParams.filter.fromEntity;
                delete searchParams.filter.toEntity;
                searchParams.filter.fromReference = fromReferenceID;
                searchParams.filter.toReference = toReferenceID;
                let query = `SELECT id, \
                            title, \
                            recurringFrequencyType as recurringFrequency, \
                            value, \
                            transactionType, \
                            transactionCategory \
                            FROM recurringTransactions \
                            WHERE ((title LIKE "%${searchParams.search}%") OR (description LIKE "%${searchParams.search}%"))`;
                Object.keys(searchParams.filter).forEach((searchField) => { 
                    if (searchParams.filter[searchField] === null || !filterParamsVisibility[searchField]) return;
                    //range based query construction
                    if (typeof searchParams.filter[searchField] === "object" && searchField !== "sort") {
                        if (searchParams.filter[searchField].min !== null && searchParams.filter[searchField].max !== null) {
                            query += ` AND (${searchField} BETWEEN "${searchParams.filter[searchField].min}" AND "${searchParams.filter[searchField].max}")`;
                        }
                        return;
                    }
                    //value based query construction
                    if (searchParams.filter[searchField] === null || searchParams.filter[searchField] === "choose" || searchField === "sort") return;
                    query += ` AND (${searchField} = "${searchParams.filter[searchField]}")`;
                });
                //construct query for sort
                if (searchParams.filter.sort.field !== null && searchParams.filter.sort.field !== "choose") {
                    query += ` ORDER BY ${searchParams.filter.sort.field} ${searchParams.filter.sort.ascending === "true"? "ASC": searchParams.filter.sort.ascending === "false"? "DESC" : ""}`;
                 }
                //query and get the information from the database
                db.all(query, (err, rows) => {
                    if (err) {
                        console.log("Recurring Entity: In getItems: err: ", err);
                        reject(true);
                    } else {
                        resolve(rows? rows : []);
                    }
                });
             }).catch((err) => { 
                console.log("Recurring Entity: In getItems: err: ", err);
                reject(true);
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
            const currentDateTime = new Date().toISOString().substring(0, 19);
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
                    ) VALUES (?, "NEW Entry", NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)`, 
                    uuid, currentDateTime, currentDateTime, (err) => {
                        if (err) {
                            console.log("Recurring Entity: In createEntry: err: ", err);
                            reject(true);
                        } else {
                            resolve({
                                id: uuid, 
                                title: "NEW Entry",
                                recurringFrequency: null,
                                value: null,
                                transactionType: null,
                                transactionCategory: null,
                            });
                        }
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
    console.log("In modifyItem: selectedItem: ", selectedItem);
    selectedItem = convertDataToDBFormat(selectedItem);
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            const getFromFinancialEntityID = new Promise((resolve, reject) => { 
                db.all(`SELECT id FROM financialEntities WHERE title = ?`, selectedItem.fromEntity, (err, row) => { 
                    if (err) { 
                        console.log("Recurring Entity: In modifyItem: getFromFinancialEntityID: err: ", err);
                        reject(true);
                    } else {
                        resolve(row && row.length > 0 ? row[0].id : null);
                    }
                });
            });

            const getToFinancialEntityID = new Promise((resolve, reject) => { 
                db.all(`SELECT id FROM financialEntities WHERE title = ?`, selectedItem.toEntity, (err, row) => { 
                    if (err) { 
                        console.log("Recurring Entity: In modifyItem: getFromFinancialEntityID: err: ", err);
                        reject(true);
                    } else {
                        resolve(row && row.length > 0 ? row[0].id : null);
                    }
                });
            });

            Promise.all([getFromFinancialEntityID, 
                        getToFinancialEntityID]).then(([fromReference, toReference]) => {

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
                        new Date().toISOString().substring(0, 19),
                        selectedItem.recurringFrequency.frequency && selectedItem.recurringFrequency.frequency !== "choose"? selectedItem.recurringFrequency.frequency : null,
                        selectedItem.recurringFrequency.frequency === "Weekly" ? selectedItem.recurringFrequency.dayOfTheWeek: null,
                        selectedItem.recurringFrequency.frequency === "Monthly" || selectedItem.recurringFrequency.frequency === "Yearly"? selectedItem.recurringFrequency.dayOfTheMonth: null,
                        selectedItem.recurringFrequency.frequency === "Yearly" ? selectedItem.recurringFrequency.month: null,
                        selectedItem.recurringFrequency.frequency !== "choose"? selectedItem.recurringFrequency.time : null,
                        selectedItem.recurringTransactionStartDate,
                        selectedItem.recurringTransactionEndDate,
                        selectedItem.id,
                        (err) => {
                            if (err) {
                                console.log("Recurring Entity: In modifyItem: err: ", err);
                                reject(true);
                            } else {
                                resolve({
                                        id: selectedItem.id, 
                                        title: selectedItem.title,
                                        recurringFrequency: selectedItem.recurringFrequency.frequency ?? undefined,
                                        value: selectedItem.value,
                                        transactionType: selectedItem.transactionType,
                                        transactionCategory: selectedItem.transactionCategory,   
                                });
                            }
                        });
            }).catch((err) => {
                console.log("Recurring Entity: In modifyItem: err: ", err);
                reject(true);
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
    console.log("In deleteItem: uuid: " + uuid);
    return new Promise((resolve, reject) => {
        new Promise((resolve, reject) => {
            db.run(`DELETE FROM recurringTransactions WHERE id = ?`, uuid, (err) => {
                if (err) {
                    console.log("Recurring Entity: In deleteItem: err: ", err);
                    reject(true);
                } else {
                    resolve(uuid);
                }
            });
        }).then((uuid) => {
            db.run(`UPDATE transactions SET recurringReference = NULL \
                    WHERE recurringReference = ?`, uuid, (err) => {
                        if (err) {
                            console.log("Recurring Entity: In deleteItem: err: ", err);
                            reject(true);
                        } else {
                            resolve();
                        }
                     });
        }).catch((err) => {
            console.log("Recurring Entity: In deleteItem: err: ", err);
            reject(true);
        });
    });
    //return true;
}

function getSelectedItem(event, uuid) {
    console.log("In getSelectedItem: uuid: " + uuid);

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
                            console.log("Recurring Entity: In getSelectedItem: getRecurringTransactions: err: ", err);
                            reject(true);
                        } else {
                            resolve(row && row.length > 0 ? row[0] : null);
                        }
                    });
        }).then((recurringTransactionRow) => {

            const getFromEntityTitle = new Promise((resolve, reject) => {
                db.get(`SELECT title, type FROM financialEntities WHERE id = ?`, recurringTransactionRow.fromReference, (err, row) => { 
                    if (err) { 
                        console.log("Recurring Entity: In getSelectedItem: getFromEntityTitle: err: ", err);
                        reject(true);
                    } else {
                        resolve(row ? row : null);
                    }
                });
            });

            const getToEntityTitle = new Promise((resolve, reject) => {
                db.get(`SELECT title, type FROM financialEntities WHERE id = ?`, recurringTransactionRow.toReference, (err, row) => { 
                    if (err) { 
                        console.log("Recurring Entity: In getSelectedItem: getToEntityTitle: err: ", err);
                        reject(true);
                    } else {
                        resolve(row ? row : null);
                    }
                });
            });

            Promise.all([getFromEntityTitle,
                        getToEntityTitle]).then(([fromFinancialEntityRow, toFinancialEntityRow]) => {
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
                                                                createdDate: recurringTransactionRow.createdDate,
                                                                modifiedDate: recurringTransactionRow.modifiedDate,
                                                                recurringFrequency: {
                                                                    frequency: recurringTransactionRow.frequency ?? undefined,
                                                                    dayOfTheWeek: recurringTransactionRow.dayOfTheWeek ?? undefined,
                                                                    dayOfTheMonth: recurringTransactionRow.dayOfTheMonth ?? undefined,
                                                                    month: recurringTransactionRow.month ?? undefined,
                                                                    time: recurringTransactionRow.time?? undefined,
                                                                },
                                                                recurringTransactionStartDate: recurringTransactionRow.recurringTransactionStartDate,
                                                                recurringTransactionEndDate: recurringTransactionRow.recurringTransactionEndDate,
                                                                lastRecurringTransactionDate: recurringTransactionRow.lastRecurringTransactionDate,
                                                            });
                resolve(selectedItem);
            });
        }).catch((err) => {
            console.log("Recurring Entity: In getSelectedItem: err: ", err);
            reject(null);
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
    getAllItems,
    getItems,
    createEntry,
    modifyItem,
    deleteItem,
    getSelectedItem,
    getRecurringTransactions,
    enterRecurringTransactions,
};