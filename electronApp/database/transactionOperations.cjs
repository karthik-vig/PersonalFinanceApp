const { v4: uuidv4 } = require('uuid');
const { dialog } = require('electron');
const path = require('node:path');
const fs = require('node:fs');
const moment = require('moment-timezone');
const { validateBrowserWindowPath, 
        constructErrorMsgFromSQLiteError,
        constructValidationError,
} = require('./commonOperations.cjs');

//let currentSelectedItemFiles = {};
let newFileEntry = new Map(); // format: { fileid: { filename: string, filedata: ArrayBuffer}, ...}
let filesToDelete = new Set();
let db = null;
let timeZone = null;
const validFilterParams = new Set([
    "value", 
    "currency", 
    "transactionType", 
    "transactionCategory",
    "fromEntity",
    "toEntity",
    "recurringEntity",
    "createdDate",
    "modifiedDate",
    "transactionDate",
    "sort"
]);
const validSortFields = new Set([
    "title",
    "description",
    "value",
    "createdDate",
    "modifiedDate",
    "transactionDate"
]);

function setDB(database) {
    db = database;
}

function setTimeZone(selectedTimeZone) {
    timeZone = selectedTimeZone;
}

function getStatsByCategoryPlotData(event, filterOptions) {
    const statsByCategoryPlotData = {
        labels: ["Groceries", "Restaurants and Dining", "Shopping", "Utilities", "Telecommunication",
                 "Transportation", "Rent or Mortgage", "Insurance", "Healthcare", "Education", "Entertainment",
                 "Travel and Lodging", "Personal Care", "Fitness and Wellness", "Investments and Savings", "Loans and Credit Payments",
                 "Charity and Donations", "Home Improvement and Maintenance", "Childcare and Education", "Pet Care", "Taxes", 
                 "Legal Services", "Other"],
        datasets: [
                    {
                        data: Array(23).fill(0),
                        backgroundColor: [
                            '#4CAF50', '#FF5722', '#9C27B0',
                            '#607D8B', '#3F51B5', '#FFEB3B',
                            '#795548', '#9E9E9E', '#F44336',
                            '#03A9F4', '#E91E63', '#00BCD4',
                            '#FFC107', '#8BC34A', '#CDDC39',
                            '#FF9800', '#673AB7', '#9E9D24',
                            '#2196F3', '#4CAF50', '#F44336',
                            '#3F51B5', '#607D8B'
                          ],
                        hoverBackgroundColor: [
                            '#1A7D1E', '#CD2500', '#6A007E',
                            '#2E4B59', '#0D1F83', '#CDB909',
                            '#472316', '#6C6C6C', '#C21104',
                            '#0077C2', '#B70031', '#008AA2',
                            '#CD8F00', '#599118', '#9BAA07',
                            '#CD6600', '#350885', '#6C6B00',
                            '#0064C1', '#1A7D1E', '#C21104',
                            '#0D1F83', '#2E4B59'
                          ],
                    },
                ]
    }
    if (!validateBrowserWindowPath(event.senderFrame.url)) return new Promise((resolve, reject) => { reject(constructValidationError("URL Validation Failed", {value: statsByCategoryPlotData})); });
    return new Promise((resolve, reject) => {
        const labelIndexMap = new Map(statsByCategoryPlotData.labels.map((label, index) => [label, index]));
        const parameters = [];
        let queryStmt = `SELECT COUNT(transactionCategory) AS transactionCount, transactionCategory FROM transactions WHERE 1=1`;
        if (filterOptions.transactionType !== "All" && filterOptions.transactionType !== "Expenditure") {
            queryStmt += ` AND (transactionType = ?)`;
            parameters.push(String(filterOptions.transactionType));
        }
        if (filterOptions.currency !== "All") {
            queryStmt += ` AND (currency = ?)`;
            parameters.push(String(filterOptions.currency));
        }
        if (filterOptions.startDate !== "yyyy-mm-ddThh:mm" && filterOptions.endDate !== "yyyy-mm-ddThh:mm") {
            queryStmt += ` AND (transactionDate BETWEEN ? AND ?)`;
            parameters.push(String(filterOptions.startDate), String(filterOptions.endDate));
        }
        queryStmt += ` GROUP BY transactionCategory`;
        db.all(queryStmt, parameters, (err, rows) => {
                if (err) {
                    // console.log(`Get Stats By Category Plot Data Error ${err}`);
                    reject(constructErrorMsgFromSQLiteError(err, "Error could not fetch data for the pie plot", {value: statsByCategoryPlotData}));
                }
                rows.forEach((row) => { 
                    const index = labelIndexMap.get(row.transactionCategory);
                    statsByCategoryPlotData.datasets[0].data[index] = row.transactionCount;
                });
                resolve(statsByCategoryPlotData);
        });
    });
}

function getLinePlotData(event, filterOptions) {
    const expenditurePlotData = {
        labels: [],
        datasets: []
    };

    switch (filterOptions.transactionType) {
        case "In":
            expenditurePlotData.datasets.push({id: 0, label: "In", data: [], backgroundColor: "#008000", borderColor:"#008000"});
            break;
        case "Out":
            expenditurePlotData.datasets.push({id: 1, label: "Out", data: [], backgroundColor: "#800000", borderColor:"#800000"});
            break;
        case "Expenditure":
            expenditurePlotData.datasets.push({id: 2, label: "Expenditure", data: [], backgroundColor: "#ff5f1f", borderColor:"#ff5f1f"});
            break;
        default:
            expenditurePlotData.datasets.push({id: 0, label: "In", data: [], backgroundColor: "#008000", borderColor:"#008000"});
            expenditurePlotData.datasets.push({id: 1, label: "Out", data: [], backgroundColor: "#800000", borderColor:"#800000"});
            expenditurePlotData.datasets.push({id: 2, label: "Expenditure", data: [], backgroundColor: "#ff5f1f", borderColor:"#ff5f1f"});
    }
    if (!validateBrowserWindowPath(event.senderFrame.url)) return new Promise((resolve, reject) => { reject(constructValidationError("URL Validation Failed", {value: expenditurePlotData})); });
    return new Promise((resolve, reject) => { 

        const parameters = [];
        let queryStmt = `SELECT \
                        transactionDate, \
                        value, \
                        transactionType \
                        FROM transactions \
                        WHERE 1=1`;
        //build query based on the filter options
        if (filterOptions.transactionType !== "All" && filterOptions.transactionType !== "Expenditure") {
            queryStmt += ` AND (transactionType = ?)`;
            parameters.push(String(filterOptions.transactionType));
        }
        if (filterOptions.transactionCategory !== "All") {
            queryStmt += ` AND (transactionCategory = ?)`;
            parameters.push(String(filterOptions.transactionCategory));
        }
        if (filterOptions.currency !== "All") {
            queryStmt += ` AND (currency = ?)`;
            parameters.push(String(filterOptions.currency));
        }
        if (filterOptions.startDate !== "yyyy-mm-ddThh:mm" && filterOptions.endDate !== "yyyy-mm-ddThh:mm") {
            queryStmt += ` AND (transactionDate BETWEEN ? AND ?)`;
            parameters.push(String(filterOptions.startDate), String(filterOptions.endDate));
        }
        queryStmt += ` ORDER BY transactionDate ASC`;
        db.all(queryStmt, parameters, (err, rows) => {
                if (err) {
                    // console.log(`Get Line Plot Data Error ${err}`);
                    reject(constructErrorMsgFromSQLiteError(err, "Error could not fetch data for the line plot", {value: expenditurePlotData}));
                }

                const expenditurePlotDataMap = new Map();
                if (!Array.isArray(rows) || rows.length === 0) resolve(expenditurePlotData);
                rows.forEach((row) => {
                    const date = moment(row.transactionDate).tz(timeZone).format().substring(0, 10);
                    if (expenditurePlotDataMap.has(date)) {
                        switch (filterOptions.transactionType) {
                            case "In":
                                expenditurePlotDataMap.get(date).In += row.value;
                                break;
                            case "Out":
                                expenditurePlotDataMap.get(date).Out += row.value;
                                break;
                        }
                    } else {
                        expenditurePlotDataMap.set(date, {
                            In: row.transactionType === "In" ? row.value : 0,
                            Out: row.transactionType === "Out" ? row.value : 0,
                        });
                    }
                });
   

                // expenditurePlotData.datasets.push()
                 for (const [label, value] of expenditurePlotDataMap) {
                    expenditurePlotData.labels.push(label);
                    switch (filterOptions.transactionType) {
                        case "In":
                            expenditurePlotData.datasets[0].data.push(value.In);
                            break;
                        case "Out":
                            expenditurePlotData.datasets[0].data.push(value.Out);
                            break;
                        case "Expenditure":
                            expenditurePlotData.datasets[0].data.push(value.In - value.Out);
                            break;
                        default:
                            expenditurePlotData.datasets[0].data.push(value.In);
                            expenditurePlotData.datasets[1].data.push(value.Out);
                            expenditurePlotData.datasets[2].data.push(value.In - value.Out);
                    }
                }
                resolve(expenditurePlotData);
            });
    });
}

function updateFinancialEntityReferenceID(event, 
                                          oldFinancialEntityReferenceID, 
                                          newFinancialEntityReferenceID) {
    if (!validateBrowserWindowPath(event.senderFrame.url)) return new Promise((resolve, reject) => { reject(constructValidationError("URL Validation Failed", {value: null})); });
    return new Promise((resolve, reject) => {
        const upateFromReferenceID = new Promise((resolve, reject) => {
            db.run(`UPDATE transactions SET \
                    fromReference = ? \
                    WHERE fromReference = ?`, 
                    newFinancialEntityReferenceID, 
                    oldFinancialEntityReferenceID, 
                    (err) => {
                        if (err) reject(constructErrorMsgFromSQLiteError(err, "Error could not update the from reference", {value: null}));
                        resolve();
                    });
        });

        const upateToReferenceID = new Promise((resolve, reject) => {
            db.run(`UPDATE transactions SET \
                    toReference = ? \
                    WHERE toReference = ?`, 
                    newFinancialEntityReferenceID, 
                    oldFinancialEntityReferenceID, 
                    (err) => {
                        if (err) reject(constructErrorMsgFromSQLiteError(err, "Error could not update the to reference", {value: null}));
                        resolve();
                    });
        });

        Promise.all([upateFromReferenceID, upateToReferenceID]).then(() => {
            resolve();
        }).catch((err) => {
            // console.log(`Update Financial Entity Reference ID Error ${err}`);
            reject(constructErrorMsgFromSQLiteError(err, "Error could not update the financial entity reference(s)", {value: null}));
        });
    });
}

function modifyTransactionReferenceID(event, recurringTransactionSelectedItem) {
    if (!validateBrowserWindowPath(event.senderFrame.url)) return new Promise((resolve, reject) => { reject(constructValidationError("URL Validation Failed", {value: null})); });
    return new Promise((resolve, reject) => { 
        db.run(`UPDATE transactions SET \
                    title = ?, \
                    description = ?, \
                    value = ?, \
                    currency = ?, \
                    transactionType = ?, \
                    transactionCategory = ?, \
                    fromReference = ( SELECT id FROM financialEntities WHERE title = ? ), \
                    toReference = ( SELECT id FROM financialEntities WHERE title = ? ), \
                    modifiedDate = ? \
                    WHERE recurringReference = ?`, [
                    recurringTransactionSelectedItem.title,
                    recurringTransactionSelectedItem.description,
                    recurringTransactionSelectedItem.value,
                    recurringTransactionSelectedItem.currency,
                    recurringTransactionSelectedItem.transactionType,
                    recurringTransactionSelectedItem.transactionCategory,
                    recurringTransactionSelectedItem.fromEntity,
                    recurringTransactionSelectedItem.toEntity,
                    new Date().toISOString().substring(0, 19) + "Z",
                    recurringTransactionSelectedItem.id, ], (err) => {
                        if (err) {
                            reject(constructErrorMsgFromSQLiteError(err, "Error could not update the finanacial entity reference in transactions", {value: null}));
                            return;
                        }
                        resolve(true);
                    });
    });
}

function deleteTransactionOnRecurringReferenceID(event, recurringReferenceID) {
    if (!validateBrowserWindowPath(event.senderFrame.url)) return new Promise((resolve, reject) => { reject(constructValidationError("URL Validation Failed", {value: null})); });
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM transactions WHERE recurringReference = ?`, recurringReferenceID, (err) => { 
            if (err) reject(constructErrorMsgFromSQLiteError(err, "Error could not delete the transaction(s) based on a recurring transaction reference", {value: null}));
            resolve(true);
        });
    });
}

//when we get selectedItem from the database, we set a object in the
//nodejs to store the fileName and the fileBlob
//file blob simulated backend functions
function getFileDetail(fileid) {
    //communicate with backend to get the file blob
    return new Promise((resolve, reject) => {
        if (newFileEntry.has(fileid)) {
            const fileDetail = newFileEntry.get(fileid);
            resolve({ filename: fileDetail.filename, filedata: fileDetail.filedata });
            return;
        }
        db.get(`SELECT filename, filedata  FROM files WHERE fileid = ?`, [ String(fileid), ], (err, row) => { 
            if (err) {
                reject(constructErrorMsgFromSQLiteError(err, "Error could not fetch the file details", {value: null}));
                return;
            }
            if (row) resolve(row);
            reject(constructValidationError("File Detail Not Found", {value: null}));
            return;
        });
    });
    //return  fileBufferData;
}


async function deleteFileBlob(event, fileid) { // was filename
    if (!validateBrowserWindowPath(event.senderFrame.url)) return false;
    // check if the fileid is in the newFileEntry map and if it is delete it
    newFileEntry.has(fileid) && newFileEntry.delete(fileid);
    // else add the fileid to the filesToDelete set
    newFileEntry.has(fileid) || filesToDelete.add(fileid);
    return true;
}



//backed function to get all items for the side bar
function getAllItems() {
    //communicate with backend to get all items
    // console.log("getAllItems called");

    return new Promise((resolve, reject) => {
        db.all(`SELECT \
                id,\
                title,\
                transactionDate,\
                value,\
                transactionType,\
                transactionCategory\
                FROM transactions`, (err, rows) => {
            if (err) {
                // console.log(`Get All Items Error ${err}`);
                reject(constructErrorMsgFromSQLiteError(err, "Error could not fetch all items", {value: []}));
            }
            // console.log("Get All Items Success");
            // console.log(typeof rows);
            if(rows && rows.length > 0) {
                rows.forEach((row) => {
                    row.transactionDate = moment(row.transactionDate).tz(timeZone).format().substring(0, 19);
                });
            }
            resolve(rows && rows.length > 0 ? rows : []);
        });
    }); //could also return null if the operation fails
}

//this should actually be a backed side function;
//here just to simulate the effect.
function getItems(event, searchParams, filterParamsVisibility) { 
    if (!validateBrowserWindowPath(event.senderFrame.url)) return new Promise((resolve, reject) => { reject(constructValidationError("URL Validation Failed", {value: null})); });
    return new Promise((resolve, reject) => { 
        const parameters = [];
        let queryStmt = `SELECT id, title, transactionDate, value, transactionType, transactionCategory FROM transactions WHERE (title LIKE ? OR description LIKE ?)`;
        parameters.push(`%${searchParams.search}%`, `%${searchParams.search}%`);
        Object.keys(filterParamsVisibility).forEach((fieldname) => { 
            if (fieldname !== "sort" && 
                filterParamsVisibility[fieldname] && 
                searchParams.filter[fieldname] !== null &&
                searchParams.filter[fieldname] !== undefined) {
                if (typeof searchParams.filter[fieldname] === "object" &&
                    searchParams.filter[fieldname].min !== null &&
                    searchParams.filter[fieldname].max !== null &&
                    searchParams.filter[fieldname].min !== undefined &&
                    searchParams.filter[fieldname].max !== undefined) {
                        if (fieldname.slice(-4) === "Date" && validFilterParams.has(fieldname)){ 
                            const minDate = moment.tz(searchParams.filter[fieldname].min + ":00", timeZone).tz("UTC").format().substring(0, 19) + "Z";
                            const maxDate = moment.tz(searchParams.filter[fieldname].max + ":00", timeZone).tz("UTC").format().substring(0, 19) + "Z";
                            queryStmt += ` AND ( ${fieldname} BETWEEN ? AND ?)`;
                            parameters.push(String(minDate), String(maxDate));
                        } else if (fieldname === "value" && validFilterParams.has(fieldname)){
                            queryStmt += ` AND (value BETWEEN ? AND ?)`;
                            parameters.push(Number(searchParams.filter[fieldname].min), Number(searchParams.filter[fieldname].max));
                        }
                } else if (fieldname !== "fromEntity" && 
                           fieldname !== "toEntity" && 
                           fieldname !== "recurringEntity") {
                    if (validFilterParams.has(fieldname)) {
                        queryStmt += ` AND (${fieldname} = ?)`;
                        parameters.push(String(searchParams.filter[fieldname]));
                    }
                }
            }
         });
        if (filterParamsVisibility.fromEntity && 
            searchParams.filter.fromEntity && 
            searchParams.filter.fromEntity !== "choose") {
            queryStmt += ` AND ( fromReference = (SELECT id FROM financialEntities WHERE title = ? ) )`;
            parameters.push(String(searchParams.filter.fromEntity));
        }
        if (filterParamsVisibility.toEntity && 
            searchParams.filter.toEntity && 
            searchParams.filter.toEntity !== "choose") {
            queryStmt += ` AND ( toReference = (SELECT id FROM financialEntities WHERE title = ? ) )`;
            parameters.push(String(searchParams.filter.toEntity));
        }
        if (filterParamsVisibility.recurringEntity && 
            searchParams.filter.recurringEntity && 
            searchParams.filter.recurringEntity !== "choose") {
            queryStmt += ` AND ( recurringReference = (SELECT id FROM recurringTransactions WHERE title = ? ) )`;
            parameters.push(String(searchParams.filter.recurringEntity));
        }
        let filterSortStmt = ``;
        if (filterParamsVisibility.sort && 
        searchParams.filter.sort.field !== null && 
        searchParams.filter.sort.field !== undefined &&
        validSortFields.has(searchParams.filter.sort.field)) { 
            filterSortStmt = ` ORDER BY ${searchParams.filter.sort.field}`;
            filterSortStmt += searchParams.filter.sort.ascending === "true" ? " ASC" : searchParams.filter.sort.ascending === "false" ? " DESC" : ``;
        }
        queryStmt += filterSortStmt;

        db.all(queryStmt, parameters, (err, rows) => { 
            if (err) {
                // console.log(`Get Items Error ${err}`);
                reject(constructErrorMsgFromSQLiteError(err, "Error could not fetch items based on the search parameters", {value: null}));
                return;
            }
            // console.log("Get Items Success");
            // console.log(rows);
            if(rows && rows.length > 0) {
                rows.forEach((row) => {
                    row.transactionDate = moment(row.transactionDate).tz(timeZone).format().substring(0, 19);
                });
            }
            resolve(rows && rows.length > 0 ? rows : []);
         });
    });
    /*
    return [
        {id: 1, title: "someName", transactionDate: "2023.08.11", value: 2000, transactionType:"out", transactionCategory: "Groceries"},
        {id: 2, title: "someName2", transactionDate: "2023.08.09", value: 100, transactionType:"in", transactionCategory: "Restaurants and Dining"},
        {id: 3, title: "someName3", transactionDate: "2023.08.03", value: 3500, transactionType:"in", transactionCategory: "Shopping"},
        {id: 4, title: "someName4", transactionDate: "2023.08.01", value: 5000, transactionType:"out", transactionCategory: "Utilities"},
        {id: 5, title: "someName5", transactionDate: "2023.08.01", value: 5000, transactionType:"in", transactionCategory: "Telecommunications"},
        ]; */
        //could also return null if the operation fails
}

//some other functions are:
//for getting the selectedItem value based on id; return null if the operation fails
function getSelectedItem(event, uuid) {
    if (!validateBrowserWindowPath(event.senderFrame.url)) return new Promise((resolve, reject) => { reject(constructValidationError("URL Validation Failed", {value: null})); });
    //reset the files to delete and new file entry
    newFileEntry = new Map();
    filesToDelete = new Set();
    return new Promise ((resolve, reject) => { 
        db.get(`SELECT \
                id , \
                title, \
                description, \
                value, \
                currency, \
                transactionType, \
                transactionCategory, \
                (SELECT title FROM financialEntities WHERE id = fromReference) AS fromEntity, \
                (SELECT type FROM financialEntities WHERE id = fromReference) AS fromType, \
                (SELECT title FROM financialEntities WHERE id = toReference) AS toEntity, \
                (SELECT type FROM financialEntities WHERE id = toReference) AS toType, \
                (SELECT title FROM recurringTransactions WHERE id = recurringReference) AS recurringEntity, \
                file, \
                createdDate, \
                modifiedDate, \
                transactionDate \
                FROM transactions \
                WHERE id = ?`, [ String(uuid), ], (err, row) => {
                    if (err) {
                        reject(constructErrorMsgFromSQLiteError(err, "Could not fetch the selected item", {value: null}));
                        return;
                    }
                    // conver the datetime from UTC to local selected timezone.
                    row.createdDate = moment(row.createdDate).tz(timeZone).format().substring(0, 16);
                    row.modifiedDate = moment(row.modifiedDate).tz(timeZone).format().substring(0, 16);
                    row.transactionDate = moment(row.transactionDate).tz(timeZone).format().substring(0, 16);
                    // check if there are any files associated with the transaction and fetch them too before resolving the promise
                    if (row.file === 0) {
                        row.file = [];
                        resolve(row);
                        return;
                    } 
                    row.file = [];
                    db.all(`SELECT fileid, filename, filedata FROM files WHERE id = ?`, [ String(uuid), ], (err, filerows) => { 
                        if (err) reject(constructErrorMsgFromSQLiteError(err, "Could not fetch the file details for the selected item", {value: null}));
                        filerows.forEach((filerow) => {
                            row.file.push({fileid: filerow.fileid, filename: filerow.filename});
                            //currentSelectedItemFiles[filerow.filename] = filerow.filedata;
                        });
                        resolve(row);
                    });
                    //resolve(row);
                });
    }); // could also return null if the operation fails
}

//using id to delete an entry; return false if the operation fails
function deleteItem(event, id) {
    if (!validateBrowserWindowPath(event.senderFrame.url)) return new Promise((resolve, reject) => { reject(constructValidationError("URL Validation Failed", {value: null})); });
    //communicate with backend to delete the item
    // console.log("deleteItem called with id: ", id);
    return new Promise((resolve, reject) => { 
            db.run(`BEGIN TRANSACTION`, (err) => {
                if (err) {
                    db.run(`ROLLBACK`);
                    reject(constructErrorMsgFromSQLiteError(err, "Error could not begin the transaction", {value: null}));
                    return;
                }
                db.run(`DELETE FROM transactions WHERE id = ?`, [ String(id), ], (err) => {
                    if (err) { 
                        db.run(`ROLLBACK`);
                        reject(constructErrorMsgFromSQLiteError(err, "Error could not delete the transacton entry", {value: null}));
                        return;
                    }
                    db.run(`DELETE FROM files WHERE id = ?`, [ String(id), ], (err) => { 
                        if (err) { 
                            db.run(`ROLLBACK`);
                            reject(constructErrorMsgFromSQLiteError(err, "Error could not delete the file entries associated with the transaction entry", {value: null}));
                            return;
                        }
                        db.run(`COMMIT`, (err) => { 
                            if (err) {
                                db.run(`ROLLBACK`);
                                reject(constructErrorMsgFromSQLiteError(err, "Error could not commit the transaction", {value: null}));
                                return;
                            }
                            resolve(true);
                        });
                    });
                });
            });      
    }); //could also return false if the operation fails
}

//takes selecteItem to modify an entry; return object if the operation succes; null if failure
function modifyItem(event, selectedItem){
    if (!validateBrowserWindowPath(event.senderFrame.url)) return new Promise((resolve, reject) => { reject(constructValidationError("URL Validation Failed", {value: {modifyStatus: false, item: null}})); });
    //communicate with backend to modify the item
    // console.log("modifyItem called with id: ", selectedItem.id);
    // console.log("modifyItem called with selectedItem: ", selectedItem);

    const selectedItemFilesToDelete = filesToDelete;
    filesToDelete = new Set();
    const selectedItemNewFilesEntry = newFileEntry;
    newFileEntry = new Map();

    return new Promise((resolve, reject) => {
        db.run(`BEGIN TRANSACTION`, (err) => {
            if (err) {
                db.run(`ROLLBACK`);
                reject(constructErrorMsgFromSQLiteError(err, "Error could not begin the transaction", {value: null}));
                return;
            }
            db.run(`UPDATE transactions SET \
                    title = ?, \
                    description = ?, \
                    value = ?, \
                    currency = ?, \
                    transactionType = ?, \
                    transactionCategory = ?, \
                    fromReference = (SELECT id FROM financialEntities WHERE title = ?), \
                    toReference = (SELECT id FROM financialEntities WHERE title = ?), \
                    recurringReference = (SELECT id FROM recurringTransactions WHERE title = ?), \
                    file = ?, \
                    modifiedDate = ?, \
                    transactionDate = ? \
                    WHERE id = ?`, [ 
                    selectedItem.title,
                    selectedItem.description,
                    selectedItem.value,
                    selectedItem.currency === "choose"? null: selectedItem.currency,
                    selectedItem.transactionType,
                    selectedItem.transactionCategory !== "choose"? selectedItem.transactionCategory : null,
                    selectedItem.fromEntity,
                    selectedItem.toEntity,
                    selectedItem.recurringEntity,
                    selectedItem.file.length > 0,
                    new Date().toISOString().substring(0, 19) + "Z",
                    moment.tz(selectedItem.transactionDate, timeZone).tz("UTC").format().substring(0, 19) + "Z",
                    selectedItem.id, ], (err) => { 
                        if (err) {
                            db.run(`ROLLBACK`);
                            reject(constructErrorMsgFromSQLiteError(err, "Error could not modify the transaction entry", {value: null}));
                            return;
                        }
                        // delete files from the files table that were marked for deletion
                        const fileDeleteStmt = db.prepare(`DELETE FROM files WHERE fileid = ?`);
                        selectedItemFilesToDelete.forEach((fileid) => {
                            fileDeleteStmt.run(fileid);
                        });
                        fileDeleteStmt.finalize((err) => {
                            if (err) {
                                db.run(`ROLLBACK`);
                                reject(constructErrorMsgFromSQLiteError(err, "Error could not delete the file entries associated with the transaction entry", {value: null}));
                                return;
                            }
                            // insert new files into the files table
                            const insertNewFilesStmt = db.prepare(`INSERT OR REPLACE INTO files (id, fileid, filename, filedata) VALUES (?, ?, ?, ?)`);
                            selectedItemNewFilesEntry.forEach((fileDetail, fileid) => {
                                insertNewFilesStmt.run(selectedItem.id, fileid, fileDetail.filename, fileDetail.filedata);
                            });
                            insertNewFilesStmt.finalize((err) => {
                                if (err) {
                                    db.run(`ROLLBACK`);
                                    reject(constructErrorMsgFromSQLiteError(err, "Error could not insert the file entries associated with the transaction entry", {value: null}));
                                    return;
                                }
                                db.run(`COMMIT`, (err) => {
                                    if (err) {
                                        db.run(`ROLLBACK`);
                                        reject(constructErrorMsgFromSQLiteError(err, "Error could not commit the transaction", {value: null}));
                                        return;
                                    }
                                    resolve({modifyStatus: true, item: selectedItem});
                                });
                            });
                        });
                    });
        });
    });
}


//this would create an entry and enter it into the database
//and return the following info for the side bar.
function createEntry() {

    return new Promise((resolve, reject) => {
        if (db === null) return null;

        const uuid = uuidv4();

        db.serialize(() => {
            
            const currentDateTime = new Date().toISOString().substring(0, 19) + "Z";

            db.run(`INSERT INTO transactions (\
                id, \
                title,\
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
                ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    uuid,
                    "NEW ENTRY",
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    0,
                    currentDateTime,
                    currentDateTime,
                    currentDateTime.substring(0, 16) + ":00Z", 
                    (err) => {
                        if (err) {
                            // console.log(`Create Entry Error ${err}`);
                            reject(constructErrorMsgFromSQLiteError(err, "Error could not create new transactions entry", {value: null}));
                        }
                        // console.log("Create Entry Success");
                        resolve({
                            id: uuid, 
                            title: "NEW ENTRY", 
                            transactionDate: null, 
                            value: null, 
                            transactionType: null, 
                            transactionCategory: null,
                        });
                    });
        });
    }); 
}


async function openGetFileDialog(){
    const { filePaths } = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            { name: 'All Files', extensions: ['*'] }
          ],
    });
    const fileDetails = [];
    filePaths.forEach((filePath) => {
        // console.log(path);
        const bufferData = fs.readFileSync(filePath);
        const fileName = path.basename(filePath);
        const fileid = uuidv4();
        fileDetails.push({fileid: fileid, filename: fileName})
        newFileEntry.set(fileid, {filename: fileName, filedata: bufferData});
    });
    return fileDetails;
}


async function openSaveFileDialog(event, fileid ){
    if (!validateBrowserWindowPath(event.senderFrame.url)) return false;
    let fileName, bufferData;
    getFileDetail(fileid).then(async (fileDetail) => { 
        fileName = fileDetail.filename;
        bufferData = fileDetail.filedata;
        const saveFileResult = await dialog.showSaveDialog({
            title: 'Save File',
            defaultPath: path.join(__dirname, fileName),
            filters: [
                { name: 'All Files', extensions: ['*'] }
              ],
        });
        if (saveFileResult.canceled || !saveFileResult.filePath || !bufferData) return false;
        try {
            fs.writeFileSync(saveFileResult.filePath, bufferData);
        } catch (err) {
            // console.log(err);
            return false;
        }
        return true;
    }).catch(() => {
        return false;
    });
}


module.exports = {
    setDB,
    setTimeZone,
    deleteFileBlob,
    //getFileEntries,
    getAllItems,
    getItems,
    getSelectedItem,
    deleteItem,
    modifyItem,
    createEntry,
    openGetFileDialog,
    openSaveFileDialog,
    deleteTransactionOnRecurringReferenceID,
    modifyTransactionReferenceID,
    updateFinancialEntityReferenceID,
    getLinePlotData,
    getStatsByCategoryPlotData,
};