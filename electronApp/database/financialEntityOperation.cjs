const moment = require('moment-timezone');
const { v4: uuidv4 } = require('uuid');
const { validateBrowserWindowPath, 
        constructErrorMsgFromSQLiteError,
        constructValidationError,
     } = require('./commonOperations.cjs');

let db = null;
let timeZone = null;
const validFilterParams = new Set(["type", "createdDate", "modifiedDate", "sort"]);
const validSortFields = new Set(["title", "type", "createdDate", "modifiedDate"]);

function setDB(database) {
    db = database;
}

function setTimeZone(selectedTimeZone) {
    timeZone = selectedTimeZone;
}

function getReferenceIdOnTitle(event, title) {
    if (!validateBrowserWindowPath(event.senderFrame.url)) return new Promise((resolve, reject) => { reject(constructValidationError("URL Validation Failed", {value: null})); });
    return new Promise((resolve, reject) => {
        if (title === "choose" || title === "Empty Value") resolve(null);
        db.get(`SELECT id FROM financialEntities WHERE title = ?`, title, (err, row) => {
            if (err) {
                console.log("financial entity : getReferenceIdOnTitle error = ", err);
                reject(constructErrorMsgFromSQLiteError(err));
            }
            console.log("financial entity : getReferenceIdOnTitle row = ", row);
            resolve(row? row.id : null);
        });
    });
}

function getIdFromTitle(event, title) {
    if (!validateBrowserWindowPath(event.senderFrame.url)) return new Promise((resolve, reject) => { reject(constructValidationError("URL Validation Failed", {value: null})); });
    return new Promise((resolve, reject) => { 
        db.get(`SELECT id FROM financialEntities WHERE title = ?`, title, (err, row) => {
            if (err) {
                console.log("financial entity : getIdFromTitle error = ", err);
                reject(constructErrorMsgFromSQLiteError(err, "Error in getting id from title in financialEntities table", {value: null}));
            }
            console.log("financial entity : getIdFromTitle row = ", row);
            resolve(row? row.id : null);
        });
    });
}

//backend simulation to get transaction entities
function getTransactionEntities() {

    return new Promise((resolve, reject) => {
        db.all("SELECT title AS name, type FROM financialEntities", (err, rows) => {
            if (err) {
                console.log("financial entity : getAllItems error = ", err);
                reject(constructErrorMsgFromSQLiteError(err, "Error in fetching all financial entities", {value: null}));
            }
            console.log("financial entity : getAllItems rows = ", rows);
            const transactionEntities = rows && rows.length > 0 ? rows : [];
            resolve(transactionEntities); 
        });
    });
    // return (
    //         [{name: "entity1", type: "Internal"}, {name: "entity2", type: "Internal"}, {name: "entity3", type: "External"}, {name: "entity4", type: "External"}]
    // ); //could also return [] if the operation fails
}

function getAllItems() {

    console.log("financial entity : getAllItems called");

    return new Promise((resolve, reject) => {
        db.all("SELECT id, title, type FROM financialEntities", (err, rows) => {
            if (err) {
                console.log("financial entity : getAllItems error = ", err);
                reject(constructErrorMsgFromSQLiteError(err, "Error in fetching all financial entities", {value: []}));
            }
            console.log("financial entity : getAllItems rows = ", rows);
            const sideBarItems = rows && rows.length > 0 ? rows : [];
            resolve(sideBarItems);     
        });
    });
    /*
    return [
        {id: 1, title: "entity1", type: "Internal"},
        {id: 2, title: "entity2", type: "Internal"},
        {id: 3, title: "entity3", type: "External"},
        {id: 4, title: "entity4", type: "External"},
    ];*/

}

function getItems(event, searchParams, filterParamsVisibility) {
    if (!validateBrowserWindowPath(event.senderFrame.url)) return new Promise((resolve, reject) => { reject(constructValidationError("URL Validation Failed", {value: []})); });
    console.log("searchParams = ", searchParams);
    console.log("filterParamsVisibility = ", filterParamsVisibility);

    return new Promise((resolve, reject) => {
        const parameters = [];
        let queryStmt = `SELECT id, title, type FROM financialEntities WHERE title LIKE ?`;
        parameters.push(`%${searchParams.search}%`);
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
                            queryStmt += ` AND (${fieldname} BETWEEN ? AND ?)`;
                            parameters.push(String(minDate), String(maxDate));
                        }
                } else if (validFilterParams.has(fieldname) && 
                           typeof searchParams.filter[fieldname] !== "object") {
                    queryStmt += ` AND (${fieldname} = ?)`;
                    parameters.push(String(searchParams.filter[fieldname]));
                }
            }
        });
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
                console.log("Financial Entity Operations : getItems error = ", err);
                reject(constructErrorMsgFromSQLiteError(err, "Search operation failed", {value: []}));
            }
            console.log("Financial Entity Operations : getItems rows = ", rows);
            resolve(rows && rows.length > 0 ? rows : []);
         });
    });
    /*
    return [
        {id: 1, title: "entity1", type: "Internal"},
        {id: 3, title: "entity3", type: "External"},
    ];
    */
}


function createEntry() {

    console.log("Financial Entity Operations : createEntry called");

    return new Promise((resolve, reject) => {
        const uuid = uuidv4();
        const currentDate = new Date().toISOString().substring(0, 19) + "Z";
        db.run(`INSERT INTO financialEntities (id, title, type, createdDate, modifiedDate) \
                VALUES (?, ?, ?, ?, ?)`, uuid, "New Entry", null, currentDate, currentDate, (err) => {
            if (err) {
                console.log("Financial Entity Operations : createEntry error = ", err);
                reject(constructErrorMsgFromSQLiteError(err, "Error in creating new entry; Entry with the same title may already exist.", {value: null}));
            }
            console.log("Financial Entity Operations : createEntry success");
            resolve({id: uuid, title: "New Entry", type: null});
        });
    });
    //return {id: 10, title: "entity10", type: "Internal"};
}

function deleteItem(event, uuid) {

    if (!validateBrowserWindowPath(event.senderFrame.url)) return new Promise((resolve, reject) => { reject(constructValidationError("URL Validation Failed", {value: null})); });
    console.log("delete entry uuid = ", uuid);

    return new Promise((resolve, reject) => {
        const deleteFiancialEntity = new Promise((resolve, reject) => {
            db.run(`DELETE FROM financialEntities WHERE id = ?`, uuid, (err) => {
                if (err) {
                    console.log("Financial Entity Operations : deleteItem error = ", err);
                    reject(constructErrorMsgFromSQLiteError(err, "Error in deleting entry", {value: null}));
                }
                console.log("Financial Entity Operations : deleteItem success");
                resolve(true);
            });
        });

        const deleteTransactionsFromReference = new Promise((resolve, reject) => {
            db.run(`UPDATE transactions SET fromReference = NULL WHERE fromReference = ?`, uuid, (err) => {
                if (err) {
                    console.log("Financial Entity Operations : deleteItem error = ", err);
                    reject(constructErrorMsgFromSQLiteError(err, "Error in deleting transaction table's fromReference", {value: null}));
                }
                console.log("Financial Entity Operations : deleteItem success");
                resolve(true);
            });
        });

        const deleteTransactionsToReference = new Promise((resolve, reject) => {
            db.run(`UPDATE transactions SET toReference = NULL WHERE toReference = ?`, uuid, (err) => {
                if (err) {
                    console.log("Financial Entity Operations : deleteItem error = ", err);
                    reject(constructErrorMsgFromSQLiteError(err, "Error in deleting transaction table's toReference", {value: null}));
                }
                console.log("Financial Entity Operations : deleteItem success");
                resolve(true);

            });
        });

        Promise.all([deleteFiancialEntity, 
                    deleteTransactionsFromReference, 
                    deleteTransactionsToReference
                    ]).then(([
                            deleteFiancialEntityStatus, 
                            deleteTransactionsFromReferenceStatus,
                            deleteTransactionsToReferenceStatus
                        ]) => {
                            console.log("Financial Entity Operations : deleteItem all promises success");
                            if (deleteFiancialEntityStatus && 
                                deleteTransactionsFromReferenceStatus && 
                                deleteTransactionsToReferenceStatus) {
                                    resolve();
                                } else {
                                    reject({
                                        type: "Custom Error", 
                                        message: "Error in deleting entry", 
                                        additionalInfo: { value: null }
                                    });
                                }
                    }).catch((err) => { 
                        console.log("Financial Entity Operations : deleteItem error = ", err[0] || err[1] || err[2]);
                        reject(constructErrorMsgFromSQLiteError(err[0] || err[1] || err[2], "Error in deleting entry", {value: null}));
                    });  
    });
    //return true;
}

function modifyItem(event, selectedItem) {

    if (!validateBrowserWindowPath(event.senderFrame.url)) return new Promise((resolve, reject) => { reject(constructValidationError("URL Validation Failed", {value: { modifyStatus: false, modifiedItem: null }})); });
    console.log("modifyItem selectedItem = ", selectedItem);

    return new Promise((resolve, reject) => {
        db.run(`UPDATE financialEntities \
                SET title = ?, type = ?, modifiedDate = ? \
                WHERE id = ?`, 
                selectedItem.title, 
                selectedItem.type, 
                new Date().toISOString().substring(0, 19) + "Z", 
                selectedItem.id,   
                (err) => {
                    if (err) {
                        console.log("Financial Entity Operations : modifyItem error = ", err);
                        reject(constructErrorMsgFromSQLiteError(err, "Error in modifying entry", {value: { modifyStatus: false, modifiedItem: null } }));
                    }
                    console.log("Financial Entity Operations : modifyItem success");
                    resolve({ modifyStatus: true, item: {
                                                            id: selectedItem.id, 
                                                            title: selectedItem.title, 
                                                            type: selectedItem.type,
                                                        } 
                            });
        });
    });

    //return { modifyStatus: true, modifiedItem: {id: 11, title: "entity11", type: "External"} };
}

function getSelectedItem(event, uuid) {
    
    if (!validateBrowserWindowPath(event.senderFrame.url)) return new Promise((resolve, reject) => { reject(constructValidationError("URL Validation Failed", {value: null})); });
    console.log("getSelectedItem uuid = ", uuid);

    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM financialEntities WHERE id = ?`, uuid, (err, row) => {
            if (err) {
                console.log("Financial Entity Operations : getSelectedItem error = ", err);
                reject(constructErrorMsgFromSQLiteError(err, "Error in getting selected item", {value: null}));
            }
            console.log("Financial Entity Operations : getSelectedItem success");
            const selectedItem = row? row : null;
            if(selectedItem) {
                selectedItem.createdDate = moment(selectedItem.createdDate).tz(timeZone).format().substring(0, 19);
                selectedItem.modifiedDate = moment(selectedItem.modifiedDate).tz(timeZone).format().substring(0, 19);
            }
            selectedItem.createdDate = selectedItem.createdDate.substring(0, 19);
            selectedItem.modifiedDate = selectedItem.modifiedDate.substring(0, 19);
            resolve(selectedItem);
        });
    });
    //return {id: 1, title: "entity1", type: "Internal", creatdDate: "2021-01-01T00:00", modifiedDate: "2021-01-01T00:00"};
}



module.exports = {
    setDB,
    setTimeZone,
    getTransactionEntities,
    getAllItems,
    getItems,
    createEntry,
    deleteItem,
    modifyItem,
    getSelectedItem,
    getIdFromTitle,
    getReferenceIdOnTitle
};