const { v4: uuidv4 } = require('uuid');
const { dialog } = require('electron');
const path = require('node:path');
const fs = require('node:fs');

let currentSelectedItemFiles = {};
let db = null;

function setDB(database) {
    db = database;
}

//when we get selectedItem from the database, we set a object in the
//nodejs to store the fileName and the fileBlob
//file blob simulated backend functions
function getFileBlob(fileName) {
    //communicate with backend to get the file blob
    console.log( "get file blob fileName: ", fileName);
    return currentSelectedItemFiles[fileName] ?? null; //could also return null if the operation fails
    //return  fileBufferData;
}

function setFileBlob(fileName, arrayBuffer) {
    //communicate with backend to set the file blob
    console.log( "set file blob fileName: ", fileName, " fileBlob: ", arrayBuffer);
    currentSelectedItemFiles[fileName] = arrayBuffer;
    return true; //could also return false if the operation fails
}

function deleteFileBlob(event, fileName) {
    //communicate with backend to delete the file blob
    console.log( "delete file blob fileName: ", fileName);
    //const currentSelectedItemFiles = getCurrentSelectedItemFiles();
    const currentSelectedItemFilenames = new Set(Object.keys(currentSelectedItemFiles));
    if (currentSelectedItemFilenames.has(fileName)){
        delete currentSelectedItemFiles[fileName];
        return true;
    }
    return false; //could also return false if the operation fails
}


//file all files entry from files table based on uuid
function getFileEntries(event, uuid) {
    //communicate with backend to get all file entries
    console.log("getAllFileEntries called with id: ", uuid);
    //specifically it fetches the data from the files table based on the uuid
    //this works as the the uuid of the files in the files table is same
    //as the uuid of the transaction in the transaction table
    return currentSelectedItemFiles; //could also return null if the operation fails
}


//backed function to get all items for the side bar
function getAllItems() {
    //communicate with backend to get all items
    console.log("getAllItems called");

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
                console.log(`Get All Items Error ${err}`);
                reject([]);
            }
            else {
                console.log("Get All Items Success");
                console.log(typeof rows);
                resolve(rows && rows.length > 0 ? rows : []);
            }
        });
    }); //could also return null if the operation fails
}

//this should actually be a backed side function;
//here just to simulate the effect.
function getItems(event, searchParams, filterParamsVisibility) { 
    //communicate with backend to get items
    //based on the searchParams
    console.log("getItems called with searchParams: ", searchParams);
    ///*
    return new Promise((resolve, reject) => {

        const fetchFromReferenceID = new Promise((resolve, reject) => {
            if (filterParamsVisibility.fromEntity && searchParams.filter.fromEntity && searchParams.filter.fromEntity !== "choose") {
            db.all(`SELECT id from financialEntities WHERE title = ?`, searchParams.filter.fromEntity, (err, rows) => { 
                if (err) {
                    console.log(`Get From Reference ID Error ${err}`);
                    reject(err);
                }
                else {
                    console.log("Get From Reference ID Success");
                    console.log(rows);
                    const fromReferenceID = rows && rows.length > 0 ? rows[0].id : null;
                    resolve(` AND (fromReference = "${fromReferenceID}")`);
                }
             });
            }
            else {
                resolve(``);
            }
        }).catch((err) => {
            console.log(`Get From Reference ID Error ${err}`);
            resolve(null);
        });


        const fetchToReferenceID = new Promise((resolve, reject) => {
            if (filterParamsVisibility.toEntity && searchParams.filter.toEntity && searchParams.filter.toEntity !== "choose") {
            db.all(`SELECT id from financialEntities WHERE title = ?`, searchParams.filter.toEntity, (err, rows) => { 
                if (err) {
                    console.log(`Get To Reference ID Error ${err}`);
                    reject(err);
                }
                else {
                    console.log("Get To Reference ID Success");
                    console.log(rows);
                    const toReferenceID = rows && rows.length > 0 ? rows[0].id : null;
                    resolve(` AND (toReference = "${toReferenceID}")`);
                }
             });
            }
            else {
                resolve(``);
            }
        }).catch((err) => {
            console.log(`Get From Reference ID Error ${err}`);
            resolve(null);
        });

        const fetchRecurringReferenceIDs = new Promise((resolve, reject) => {
            if (filterParamsVisibility.recurringEntity && searchParams.filter.recurringEntity && searchParams.filter.recurringEntity !== "choose") {
                db.all(`SELECT id from recurringTransactions WHERE title = ?`, searchParams.filter.recurringEntity, (err, rows) => {
                    if (err) {
                        console.log(`Get Recurring Reference ID Error ${err}`);
                        reject(err);
                    }
                    else {
                        console.log("Get Recurring Reference ID Success");
                        console.log(rows);
                        const recurringReferenceID = rows && rows.length > 0 ? rows[0].id : null;
                        resolve(` AND (recurringReference = "${recurringReferenceID}")`);
                    }
                });
            }
            else {
                resolve(``);
            }
        }).catch((err) => {
            console.log(`Get Recurring Reference ID Error ${err}`);
            resolve(null);
        });

        const fetchAllReferenceIDs = Promise.all([fetchFromReferenceID, fetchToReferenceID, fetchRecurringReferenceIDs]);

        fetchAllReferenceIDs.then(([filterFromEntityStmt, filterToEntityStmt, filterRecurringEntityStmt]) => {

        let queryStmt = `SELECT id, title, transactionDate, value, transactionType, transactionCategory FROM transactions WHERE (title LIKE "%${searchParams.search}%" OR description LIKE "%${searchParams.search}%")`;
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
                } else if (fieldname !== "fromEntity" && 
                           fieldname !== "toEntity" && 
                           fieldname !== "recurringEntity") {
                    queryStmt += ` AND (${fieldname} = "${searchParams.filter[fieldname]}")`;
                }
            }
         });
        queryStmt += filterFromEntityStmt;
        queryStmt += filterToEntityStmt;
        queryStmt += filterRecurringEntityStmt;
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
                console.log(`Get Items Error ${err}`);
                reject(null);
            }
            else {
                console.log("Get Items Success");
                console.log(rows);
                resolve(rows && rows.length > 0 ? rows : []);
            }
         });

        }).catch((err) => {
            console.log(`Get All Reference IDs Error ${err}`);
            reject(null);
        });
    });
    //*/
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
    //communicate with backend to get the selectedItem
    console.log("getSelectedItem called with id: ", uuid);
    //clear any cotents in the currentSelectedItemFiles
    currentSelectedItemFiles = {};
    
    return new Promise((resolve, reject) => {
        db.serialize(() => {

            const selectedItem = {
                id: null, //uuidv4 template
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
                recurringEntity: null, //computed by backend, could be null
                file: [],
                createdDate: "yyyy-MM-ddThh:mm:ss",
                modifiedDate: "yyyy-MM-ddThh:mm:ss",
                transactionDate: "yyyy-MM-ddThh:mm:ss",
            };

            let fromReferenceID = null;
            let toReferenceID = null;
            let recurringReferenceID = null;

            const fetchTransactionDetail = new Promise((resolve, reject) => {
                db.all(`SELECT \
                        title,\
                        description,\
                        value,\
                        currency,\
                        transactionType,\
                        transactionCategory,\
                        fromReference,\
                        toReference,\
                        recurringReference,\
                        file,\
                        createdDate,\
                        modifiedDate,\
                        transactionDate\
                        FROM transactions \
                        WHERE id = "${uuid}"`, (err, rows) => {
                    if (err) {
                        console.log(`Get Selected Item Error ${err}`);
                        reject(err);
                    }
                    else {
                        console.log("Transaction Table Information (getSelectedItem):");
                        console.log(rows);
                        if (rows && rows.length > 0) {
                            selectedItem.id = uuid;
                            selectedItem.title = rows[0].title;
                            selectedItem.description = rows[0].description;
                            selectedItem.value = rows[0].value;
                            selectedItem.currency = rows[0].currency;
                            selectedItem.transactionType = rows[0].transactionType;
                            selectedItem.transactionCategory = rows[0].transactionCategory;
                            selectedItem.createdDate = rows[0].createdDate?.substring(0, 16);
                            selectedItem.modifiedDate = rows[0].modifiedDate?.substring(0, 16);
                            selectedItem.transactionDate = rows[0].transactionDate?.substring(0, 16);
            
                            fromReferenceID = rows[0].fromReference;
                            toReferenceID = rows[0].toReference;
                            recurringReferenceID = rows[0].recurringReference;
                        }
                        resolve();
                    }
                });
            });

        fetchTransactionDetail.then(() => { 

            const fetchFromFinanaicalEntity = new Promise((resolve, reject) => {
                console.log("fromReferenceID in fetch from financial entity promise (getSelectedItem):", fromReferenceID)
                db.all(`SELECT \
                        title, \
                        type \
                        FROM financialEntities 
                        WHERE id = "${fromReferenceID}"`, (err, rows) => {
                            if (err) {
                                console.log(`Get Selected Item Error ${err}`);
                                reject(err);
                            }
                            else {
                                console.log("(FROM) Financial Entity Table Information (getSelectedItem):");
                                console.log(rows);
                                resolve(rows);
                            }
                });
            });

            const fetchToFinanaicalEntity = new Promise((resolve, reject) => {
                db.all(`SELECT \
                        title, \
                        type \
                        FROM financialEntities 
                        WHERE id = "${toReferenceID}"`, (err, rows) => {
                            if (err) {
                                console.log(`Get Selected Item Error ${err}`);
                                reject(err);
                            }
                            else {
                                console.log("(TO) Financial Entity Table Information (getSelectedItem):");
                                console.log(rows);
                                resolve(rows);
                            }
                });
            });

            const fetchRecurringTransaction = new Promise((resolve, reject) => {
                db.all(`SELECT \
                        title\
                        FROM recurringTransactions \
                        WHERE id = "${recurringReferenceID}"`, (err, rows) => {
                            if (err) {
                                console.log(`Get Recurring Transaction Reference ID in modifyItem: ${err}`);
                                //reject({modifyStatus: false, item: null});
                                reject(err);
                            }
                            else {
                                console.log("Recurring Entity Table Information (getSelectedItem):");
                                console.log(recurringReferenceID);
                                resolve(rows);            
                            }
                });
            });

        const fetchFileInformation = new Promise((resolve, reject) => { 
                db.all(`SELECT filename, filedata FROM files WHERE id = "${uuid}"`, (err, rows) => {
                    if (err) {
                        console.log(`Get Selected Item Error ${err}`);
                        reject(err);
                        //return null;
                    }
                    else {
                        console.log("Files Table Information (getSelectedItem):");
                        console.log(rows);
                        resolve(rows);
                    }
                });
        });

            const fetchAllInformation = Promise.all([ 
                fetchFromFinanaicalEntity, 
                fetchToFinanaicalEntity, 
                fetchRecurringTransaction, 
                fetchFileInformation
            ]);

            console.log("fromReferenceID in resolved area of fetch transaction detail (getSelectedItem):", fromReferenceID)
            fetchAllInformation.then(([ 
                                        fromFinancialEntityRows, 
                                        toFinancialEntityRows, 
                                        recurringEntityrows, 
                                        fileInformationRows]) => { 
                                            
                                            if (fromFinancialEntityRows && fromFinancialEntityRows.length > 0) {
                                                selectedItem.fromEntity = fromFinancialEntityRows[0].title;
                                                selectedItem.fromType = fromFinancialEntityRows[0].type;
                                            }

                                            if (toFinancialEntityRows && toFinancialEntityRows.length > 0) {
                                                selectedItem.toEntity = toFinancialEntityRows[0].title;
                                                selectedItem.toType = toFinancialEntityRows[0].type;
                                            }

                                            selectedItem.recurringEntity = recurringEntityrows && recurringEntityrows.length > 0 ? recurringEntityrows[0].title : null;

                                            if (fileInformationRows && fileInformationRows.length > 0) {
                                                fileInformationRows.forEach((row) => {
                                                    currentSelectedItemFiles[row.filename] = row.filedata;
                                                    selectedItem.file.push(row.filename);
                                                });
                                            } 
                                            console.log("selectedItem created in the backend: ", selectedItem);
                                            resolve(selectedItem);

                                        }).catch((err) => {
                                            console.log(`Get Selected Item Error ${err}`);
                                            reject(null);
                                        });
            
        }).catch((err) => {
            console.log(`Get Selected Item Error ${err}`);
            reject(null);
        });

        });
    }); //could also return null if the operation fails 
}

//using id to delete an entry; return false if the operation fails
function deleteItem(event, id) {
    //communicate with backend to delete the item
    console.log("deleteItem called with id: ", id);
    return new Promise((resolve, reject) => {
        db.serialize(() => {

            const fetchTransactionDelete = new Promise((resolve, reject) => {
                db.run(`DELETE FROM transactions WHERE id = "${id}"`, (err) => {
                    if (err) {
                        console.log(`Delete Item Error ${err}`);
                        reject(err);
                    }
                    else {
                        console.log("Delete transaction table entry Item Successful");
                        resolve(true);
                    }
                });
            });

            const fetchFileDelete = new Promise((resolve, reject) => {
                db.run(`DELETE FROM files WHERE id = "${id}"`, (err) => {
                    if (err) {
                        console.log(`Delete Item Error ${err}`);
                        reject(err);
                    }
                    else {
                        console.log("Delete file table entry Item Successful");
                        resolve(true);
                    }
                });
            });

            const fetchAllDelete = Promise.all([fetchTransactionDelete, fetchFileDelete]);
            fetchAllDelete.then(([transactionDeleteStatus, fileDeleteStatus]) => {
                if (transactionDeleteStatus && fileDeleteStatus) resolve();
                else reject(true);
            }).catch((err) => {
                console.log(`Delete Item Error ${err}`);
                reject(true);
            });
        });
    }); // return true; //could also return false if the operation fails
}

//takes selecteItem to modify an entry; return object if the operation succes; null if failure
function modifyItem(event, selectedItem){
    //communicate with backend to modify the item
    console.log("modifyItem called with id: ", selectedItem.id);
    console.log("modifyItem called with selectedItem: ", selectedItem);

    return new Promise((resolve, reject) => {
        db.serialize(() => {

            const fetchFromReferenceID = new Promise((resolve, reject) => {
                db.all(`SELECT \
                        id\
                        FROM financialEntities \
                        WHERE title = ?`, selectedItem.fromEntity, (err, rows) => {
                            if (err) {
                                console.log(`Get Financial Reference ID in modifyItem: ${err}`);
                                reject(err);
                            }
                            else {
                                console.log("Get From Financial Entity Reference ID Success in modifyItem");
                                console.log(rows);
                                const fromReferenceID = rows && rows.length > 0 ? rows[0].id : null;
                                console.log(fromReferenceID);
                                resolve(fromReferenceID);
                            }
                        });
            });

            const fetchToReferenceID = new Promise((resolve, reject) => {
                db.all(`SELECT \
                        id\
                        FROM financialEntities \
                        WHERE title = ?`, selectedItem.toEntity, (err, rows) => {
                            if (err) {
                                console.log(`Get Financial Reference ID in modifyItem: ${err}`);
                                reject(err);
                            }
                            else {
                                console.log("Get To Financial Entity Reference ID Success in modifyItem");
                                const toReferenceID = rows && rows.length > 0 ? rows[0].id : null;
                                console.log(toReferenceID);
                                resolve(toReferenceID);
                            }
                        });
            });
               
            const fetchRecurringReferenceIDs = new Promise((resolve, reject) => {
                db.all(`SELECT \
                        id\
                        FROM recurringTransactions \
                        WHERE title = ?`, selectedItem.recurringEntity, (err, rows) => {
                            if (err) {
                                console.log(`Get Recurring Transaction Reference ID in modifyItem: ${err}`);
                                reject(err);
                            }
                            else {
                                console.log("Get Recurring Entity Reference ID Success in modifyItem");
                                const recurringReferenceID = rows && rows.length > 0 ? rows[0].id : null;
                                console.log(recurringReferenceID);
                                resolve(recurringReferenceID);
                            }
                        });
            });

            
            const insertFileEntries = new Promise((resolve, reject) => {
                const fileInformationInsertStmt = db.prepare(`INSERT OR REPLACE INTO files \
                                                            (id, filename, filedata) \
                                                            VALUES (?, ?, ?)`);
                Object.keys(currentSelectedItemFiles).forEach((filename) => {
                    fileInformationInsertStmt.run(selectedItem.id, filename, currentSelectedItemFiles[filename]);
                });
                fileInformationInsertStmt.finalize((err) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    else {
                        console.log("Insert File Entries Success");
                        resolve(true);
                    }
                });
            });
            
            const deleteFileEntires = new Promise((resolve, reject) => {
                const fetchFilenamesToDelete = new Promise((resolve, reject) => {
                    db.all(`SELECT filename FROM files WHERE id = ?`, selectedItem.id, (err, rows) => {
                        if (err) {
                            console.log(`Get Selected Item Error ${err}`);
                            reject(err);
                        }
                        else {
                            console.log("Files Table Information (getSelectedItem):");
                            console.log(rows);
                            resolve(rows);
                        }
                    });
                });

                fetchFilenamesToDelete.then((rows) => {
                    console.log("rows from files table in deleteFileEntries: ", rows);
                    console.log("filenames from currentSelectedItemFiles: ", Object.keys(currentSelectedItemFiles));
                    const deleteFileEntryStmt = db.prepare(`DELETE FROM files WHERE id = ? \
                                                            AND filename = ?`);
                    const currentSelectedItemFilenames = new Set(Object.keys(currentSelectedItemFiles));
                    rows.forEach((row) => {
                        if (!currentSelectedItemFilenames.has(row.filename))
                            deleteFileEntryStmt.run(selectedItem.id, row.filename);
                    });
                    deleteFileEntryStmt.finalize((err) => {
                        if (err) {
                            console.error(err);
                            resolve(false);
                        }
                        else {
                            console.log("Delete File Entries Success");
                            resolve(true);
                        }
                    });
                }).catch((err) => {
                    console.log(`Delete Item Error ${err}`);
                    reject(err);
                });
            });

            const fetchAllReferenceIDs = Promise.all([
                                                        fetchFromReferenceID, 
                                                        fetchToReferenceID, 
                                                        fetchRecurringReferenceIDs, 
                                                        insertFileEntries,
                                                        deleteFileEntires
                                                    ]);

            fetchAllReferenceIDs.then(([
                                        fromReferenceID, 
                                        toReferenceID, 
                                        recurringReferenceID, 
                                        insertFileEntriesStatus,
                                        deleteFileEntiresStatus
                                    ]) => {
                console.log("fromReferenceID in modifyItem: ");
                console.log("fromReferenceID: ", fromReferenceID);
                console.log("toReferenceID: ", toReferenceID);
                console.log("recurringReferenceID: ", recurringReferenceID);
                db.run(`UPDATE transactions SET \
                        title = ?, \
                        description = ?, \
                        value = ?, \
                        currency = ?, \
                        transactionType = ?, \
                        transactionCategory = ?, \
                        fromReference = ?, \
                        toReference = ?, \
                        recurringReference = ?, \
                        file = ?, \
                        modifiedDate = ?, \
                        transactionDate = ? \
                        WHERE id = ?`, 
                            selectedItem.title,
                            selectedItem.description,
                            selectedItem.value,
                            selectedItem.currency === "choose"? null: selectedItem.currency,
                            selectedItem.transactionType,
                            selectedItem.transactionCategory !== "choose"? selectedItem.transactionCategory : null,
                            fromReferenceID,
                            toReferenceID,
                            recurringReferenceID,
                            selectedItem.file.length > 0,
                            new Date().toISOString().substring(0, 19),
                            selectedItem.transactionDate + ":00",
                            selectedItem.id,
                            (err) => {
                            if (err) {
                                console.log(`Modify Item Error ${err}`);
                                //reject({modifyStatus: false, item: null});
                                resolve({modifyStatus: false, item: null});
                            }
                            else {
                                console.log("Modify Item Success");
                                console.log(fromReferenceID)
                                if (insertFileEntriesStatus && deleteFileEntiresStatus) {
                                resolve( {
                                    modifyStatus: true,
                                    item: {
                                            id: selectedItem.id, 
                                            title: selectedItem.title, 
                                            transactionDate: selectedItem.transactionDate, 
                                            value: selectedItem.value, 
                                            transactionType: selectedItem.transactionType, 
                                            transactionCategory: selectedItem.transactionCategory,
                                        },
                                    });
                                }
                                else {
                                    reject({modifyStatus: false, item: null});
                                }
                            }
                        });

                }).catch((err) => {
                    console.log(`Modify Item Error ${err}`);
                    reject({modifyStatus: false, item: null})
                });
            })
    }); //could also return null if the operation fails
}


//this would create an entry and enter it into the database
//and return the following info for the side bar.
function createEntry() {

    return new Promise((resolve, reject) => {
        if (db === null) return null;

        const uuid = uuidv4();

        db.serialize(() => {
            
            const currentDateTime = new Date().toISOString().substring(0, 19);

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
                ) VALUES (\
                    "${uuid}", \
                    "NEW ENTRY", \
                    NULL, \
                    NULL, \
                    NULL, \
                    NULL, \
                    NULL, \
                    NULL, \
                    NULL, \
                    NULL, \
                    0, \
                    "${currentDateTime}", \
                    "${currentDateTime}", \
                    NULL \
                    )`, (err) => {
                        if (err) {
                            console.log(`Create Entry Error ${err}`);
                            reject(true);
                        }
                        else {
                            console.log("Create Entry Success");
                            resolve({
                                id: uuid, 
                                title: "NEW ENTRY", 
                                transactionDate: null, 
                                value: null, 
                                transactionType: null, 
                                transactionCategory: null,
                            });
                        }
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
    const fileNames = []
    filePaths.forEach((filePath) => {
        console.log(path);
        const bufferData = fs.readFileSync(filePath);
        const fileName = path.basename(filePath);
        fileNames.push(fileName);
        setFileBlob(fileName, bufferData);
    });
    return fileNames;
}


async function openSaveFileDialog(event, fileName ){
    const bufferData = getFileBlob(fileName);
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
        console.log(err);
        return false;
    }
    return true;
}


module.exports = {
    setDB,
    deleteFileBlob,
    getFileEntries,
    getAllItems,
    getItems,
    getSelectedItem,
    deleteItem,
    modifyItem,
    createEntry,
    openGetFileDialog,
    openSaveFileDialog,
};