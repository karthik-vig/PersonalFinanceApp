//const sqlite = require('sqlite3');
//const fs = require('node:fs');
const { v4: uuidv4 } = require('uuid');

let db = null;

function setDB(database) {
    db = database;
}

function getReferenceIdOnTitle(event, title) {
    return new Promise((resolve, reject) => {
        if (title === "choose" || title === "Empty Value") resolve(null);
        db.get(`SELECT id FROM financialEntities WHERE title = ?`, title, (err, row) => {
            if (err) {
                console.log("financial entity : getReferenceIdOnTitle error = ", err);
                reject(null);
            }
            console.log("financial entity : getReferenceIdOnTitle row = ", row);
            resolve(row? row.id : null);
        });
    });
}

function getIdFromTitle(event, title) {

    return new Promise((resolve, reject) => { 
        db.get(`SELECT id FROM financialEntities WHERE title = ?`, title, (err, row) => {
            if (err) {
                console.log("financial entity : getIdFromTitle error = ", err);
                reject(null);
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
                reject(true);
            }
            else {
                console.log("financial entity : getAllItems rows = ", rows);
                const transactionEntities = rows && rows.length > 0 ? rows : [];
                resolve(transactionEntities);
            }
        });
    });
    // return (
    //         [{name: "entity1", type: "Internal"}, {name: "entity2", type: "Internal"}, {name: "entity3", type: "External"}, {name: "entity4", type: "External"}]
    // ); //could also return [] if the operation fails
}

function getAllItems() {

    console.log("financial entity : getAllItems called");

    return new Promise((resolve, reject) => {
        db.all("SELECT id, title, type FROM financialEntities", [], (err, rows) => {
            if (err) {
                console.log("financial entity : getAllItems error = ", err);
                reject([]);
            }
            else {
                console.log("financial entity : getAllItems rows = ", rows);
                const sideBarItems = rows && rows.length > 0 ? rows : [];
                resolve(sideBarItems);
            }
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
    console.log("searchParams = ", searchParams);
    console.log("filterParamsVisibility = ", filterParamsVisibility);

    return new Promise((resolve, reject) => {
        let queryStmt = `SELECT id, title, type FROM financialEntities WHERE title LIKE "%${searchParams.search}%"`;
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
                        if (fieldname.slice(-4) === "Date"){ 
                            queryStmt += ` AND (${fieldname} BETWEEN "${searchParams.filter[fieldname].min + ":00"}" AND "${searchParams.filter[fieldname].max + ":00"}")`;
                        } else {
                            queryStmt += ` AND (${fieldname} BETWEEN ${searchParams.filter[fieldname].min} AND ${searchParams.filter[fieldname].max})`;
                        }
                } else {
                    queryStmt += ` AND (${fieldname} = "${searchParams.filter[fieldname]}")`;
                }
            }
        });
        let filterSortStmt = ``;
         if (filterParamsVisibility.sort && 
            searchParams.filter.sort.field !== null && 
            searchParams.filter.sort.field !== undefined) { 
                filterSortStmt = ` ORDER BY ${searchParams.filter.sort.field}`;
                filterSortStmt += searchParams.filter.sort.ascending === "true" ? " ASC" : searchParams.filter.sort.ascending === "false" ? " DESC" : ``;
            }
        queryStmt += filterSortStmt;

        db.all(queryStmt, (err, rows) => { 
            if (err) {
                console.log("Financial Entity Operations : getItems error = ", err);
                reject([]);
            }
            else {
                console.log("Financial Entity Operations : getItems rows = ", rows);
                resolve(rows && rows.length > 0 ? rows : []);
            }
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
        const currentDate = new Date().toISOString().substring(0, 19);
        db.run(`INSERT INTO financialEntities (id, title, type, createdDate, modifiedDate) \
                VALUES (?, ?, ?, ?, ?)`, uuid, "New Entry", null, currentDate, currentDate, (err) => {
            if (err) {
                console.log("Financial Entity Operations : createEntry error = ", err);
                reject(null);
            }
            else {
                console.log("Financial Entity Operations : createEntry success");
                resolve({id: uuid, title: "New Entry", type: null});
            }
        });
    });
    //return {id: 10, title: "entity10", type: "Internal"};
}

function deleteItem(event, uuid) {

    console.log("delete entry uuid = ", uuid);

    return new Promise((resolve, reject) => {
        const deleteFiancialEntity = new Promise((resolve, reject) => {
            db.run(`DELETE FROM financialEntities WHERE id = ?`, uuid, (err) => {
                if (err) {
                    console.log("Financial Entity Operations : deleteItem error = ", err);
                    reject(err);
                }
                else {
                    console.log("Financial Entity Operations : deleteItem success");
                    resolve(true);
                }
            });
        });

        const deleteTransactionsFromReference = new Promise((resolve, reject) => {
            db.run(`UPDATE transactions SET fromReference = NULL WHERE fromReference = ?`, uuid, (err) => {
                if (err) {
                    console.log("Financial Entity Operations : deleteItem error = ", err);
                    reject(err);
                }
                else {
                    console.log("Financial Entity Operations : deleteItem success");
                    resolve(true);
                }
            });
        });

        const deleteTransactionsToReference = new Promise((resolve, reject) => {
            db.run(`UPDATE transactions SET toReference = NULL WHERE toReference = ?`, uuid, (err) => {
                if (err) {
                    console.log("Financial Entity Operations : deleteItem error = ", err);
                    reject(err);
                }
                else {
                    console.log("Financial Entity Operations : deleteItem success");
                    resolve(true);
                }
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
                                    reject(true);
                                }
                    }).catch((err) => { 
                        console.log("Financial Entity Operations : deleteItem error = ", err[0] || err[1] || err[2]);
                        reject(true);
                    });  
    });
    //return true;
}

function modifyItem(event, selectedItem) {
    console.log("modifyItem selectedItem = ", selectedItem);

    return new Promise((resolve, reject) => {
        db.run(`UPDATE financialEntities \
                SET title = ?, type = ?, modifiedDate = ? \
                WHERE id = ?`, 
                selectedItem.title, 
                selectedItem.type, 
                new Date().toISOString().substring(0, 19), 
                selectedItem.id,   
                (err) => {
                    if (err) {
                        console.log("Financial Entity Operations : modifyItem error = ", err);
                        reject({ modifyStatus: false, modifiedItem: null });
                    }
                    else {
                        console.log("Financial Entity Operations : modifyItem success");
                        resolve({ modifyStatus: true, item: {
                                                                id: selectedItem.id, 
                                                                title: selectedItem.title, 
                                                                type: selectedItem.type,
                                                            } 
                                });
                    }
        });
    });

    //return { modifyStatus: true, modifiedItem: {id: 11, title: "entity11", type: "External"} };
}

function getSelectedItem(event, uuid) {
    
    console.log("getSelectedItem uuid = ", uuid);

    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM financialEntities WHERE id = ?`, uuid, (err, rows) => {
            if (err) {
                console.log("Financial Entity Operations : getSelectedItem error = ", err);
                reject(null);
            }
            else {
                console.log("Financial Entity Operations : getSelectedItem success");
                const selectedItem = rows && rows.length > 0 ? rows[0] : null;
                resolve(selectedItem);
            }
        });
    });
    //return {id: 1, title: "entity1", type: "Internal", creatdDate: "2021-01-01T00:00", modifiedDate: "2021-01-01T00:00"};
}



module.exports = {
    setDB,
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