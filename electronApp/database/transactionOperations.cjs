const { v4: uuidv4 } = require('uuid');

const currentSelectedItemFiles = {};
let db = null;

function setDB(database) {
    db = database;
}

//when we get selectedItem from the database, we set a object in the
//nodejs to store the fileName and the fileBlob
//file blob simulated backend functions
function getFileBlob(event, fileName) {
    //communicate with backend to get the file blob
    console.log( "get file blob fileName: ", fileName);
    const fileBufferData = currentSelectedItemFiles.fileName ?? null;
    return  fileBufferData;//could also return null if the operation fails
}

function setFileBlob(event, fileName, arrayBuffer) {
    //communicate with backend to set the file blob
    console.log( "set file blob fileName: ", fileName, " fileBlob: ", arrayBuffer);
    currentSelectedItemFiles[fileName] = arrayBuffer;
    return true; //could also return false if the operation fails
}

function deleteFileBlob(event, fileName) {
    //communicate with backend to delete the file blob
    console.log( "delete file blob fileName: ", fileName);
    //const currentSelectedItemFiles = getCurrentSelectedItemFiles();
    if (Object.keys(currentSelectedItemFiles).includes(fileName)){
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
    /*
    return  {"SuperFile71.txt" : Buffer.from("hello world1 " + uuid, "utf-8"),
            "SuperFile72.txt" : Buffer.from("hello world2 " + uuid, "utf-8"),
            "SuperFile73.txt" : Buffer.from("hello world3 " + uuid, "utf-8"),
            };//could also return null if the operation fails
    */
    return currentSelectedItemFiles;
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
                reject(err);
            }
            else {
                console.log("Get All Items Success");
                console.log(typeof rows);
                resolve(rows);
            }
        });
    });

    /*
    return [
        {id: 1, title: "someName", transactionDate: "2023.08.11", value: 2000, transactionType:"out", transactionCategory: "Groceries"},
        {id: 2, title: "someName2", transactionDate: "2023.08.09", value: 100, transactionType:"in", transactionCategory: "Restaurants and Dining"},
        {id: 3, title: "someName3", transactionDate: "2023.08.03", value: 3500, transactionType:"in", transactionCategory: "Shopping"},
        {id: 4, title: "someName4", transactionDate: "2023.08.01", value: 5000, transactionType:"out", transactionCategory: "Utilities"},
        {id: 5, title: "someName5", transactionDate: "2023.08.01", value: 5000, transactionType:"in", transactionCategory: "Telecommunication"},
        {id: 6, title: "someName6", transactionDate: "2023.08.01", value: 5000, transactionType:"out", transactionCategory: "Transportation"},
        {id: 7, title: "someName7", transactionDate: "2023.08.01", value: 5000, transactionType:"in", transactionCategory: "Rent or Mortgage"},
        {id: 8, title: "someName8", transactionDate: "2023.08.01", value: 5000, transactionType:"out", transactionCategory: "Insurance"},
        {id: 9, title: "someName9", transactionDate: "2023.08.01", value: 5000, transactionType:"in", transactionCategory: "Healthcare"},
        {id: 10, title: "someName10", transactionDate: "2023.08.01", value: 5000, transactionType:"out", transactionCategory: "Education"},
        {id: 11, title: "someName11", transactionDate: "2023.08.01", value: 5000, transactionType:"in", transactionCategory: "Entertainment"},
        {id: 12, title: "someName12", transactionDate: "2023.08.01", value: 5000, transactionType:"out", transactionCategory: "Travel and Lodging"},
        {id: 13, title: "someName13", transactionDate: "2023.08.01", value: 5000, transactionType:"in", transactionCategory: "Personal Care"},
        {id: 14, title: "someName14", transactionDate: "2023.08.01", value: 5000, transactionType:"out", transactionCategory: "Fitness and Wellness"},
        {id: 15, title: "someName15", transactionDate: "2023.08.01", value: 5000, transactionType:"in", transactionCategory: "Investments and Savings"},
        {id: 16, title: "someName16", transactionDate: "2023.08.01", value: 5000, transactionType:"out", transactionCategory: "Loans and Credit Payments"},
        {id: 17, title: "someName17", transactionDate: "2023.08.01", value: 5000, transactionType:"in", transactionCategory: "Charity and Donations"},
        {id: 18, title: "someName18", transactionDate: "2023.08.01", value: 5000, transactionType:"out", transactionCategory: "Home Improvement and Maintenance"},
        {id: 19, title: "someName19", transactionDate: "2023.08.01", value: 5000, transactionType:"in", transactionCategory: "Childcare and Education"},
        {id: 20, title: "someName20", transactionDate: "2023.08.01", value: 5000, transactionType:"out", transactionCategory: "Pet Care"},
        {id: 21, title: "someName21", transactionDate: "2023.08.01", value: 5000, transactionType:"in", transactionCategory: "Taxes"},
        {id: 22, title: "someName22", transactionDate: "2023.08.01", value: 5000, transactionType:"out", transactionCategory: "Legal Services"},
        {id: 23, title: "someName23", transactionDate: "2023.08.01", value: 5000, transactionType:"in", transactionCategory: "Other"},
        ]; */
        //could also return null if the operation fails
}

//this should actually be a backed side function;
//here just to simulate the effect.
function getItems(event, searchParams) { 
    //communicate with backend to get items
    //based on the searchParams
    console.log("getItems called with searchParams: ");
    console.log(searchParams);
    return [
        {id: 1, title: "someName", transactionDate: "2023.08.11", value: 2000, transactionType:"out", transactionCategory: "Groceries"},
        {id: 2, title: "someName2", transactionDate: "2023.08.09", value: 100, transactionType:"in", transactionCategory: "Restaurants and Dining"},
        {id: 3, title: "someName3", transactionDate: "2023.08.03", value: 3500, transactionType:"in", transactionCategory: "Shopping"},
        {id: 4, title: "someName4", transactionDate: "2023.08.01", value: 5000, transactionType:"out", transactionCategory: "Utilities"},
        {id: 5, title: "someName5", transactionDate: "2023.08.01", value: 5000, transactionType:"in", transactionCategory: "Telecommunications"},
        ]; //could also return null if the operation fails
}

//some other functions are:
//for getting the selectedItem value based on id; return null if the operation fails
function getSelectedItem(event, uuid) {
    //communicate with backend to get the selectedItem
    console.log("getSelectedItem called with id: ", uuid);
    //get the currentSelectedItemFiles object
    //const currentSelectedItemFiles = getCurrentSelectedItemFiles();
    //clear any cotents in the currentSelectedItemFiles
    //console.log(typeof currentSelectedItemFiles);
    //console.log(getFileEntries(uuid));
    Object.keys(currentSelectedItemFiles).forEach((key) => {
        delete currentSelectedItemFiles[key];
    });
    //set the currentSelectedItemFiles
    const fileInfo = getFileEntries(uuid);
    Object.keys(fileInfo).forEach((key) => {
        currentSelectedItemFiles[key] = fileInfo[key];
    });
    console.log("currentSelectedItemFiles: ", currentSelectedItemFiles);
    
    return new Promise((resolve, reject) => {
        db.serialize(() => {

            let fromReferenceID = null;
            let toReferenceID = null;
            let recurringReferenceID = null;

            const selectedItem = {
                id: null, //uuidv4 template
                title: null,
                description: null,
                value: 0.0,
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
                    //return null;
                }
                else {
                    console.log("Get Selected Item Success");
                    console.log(rows);
                    if (rows && rows.length > 0) {
                        selectedItem.id = uuid;
                        selectedItem.title = rows[0].title;
                        selectedItem.description = rows[0].description;
                        selectedItem.value = rows[0].value;
                        selectedItem.currency = rows[0].currency;
                        selectedItem.transactionType = rows[0].transactionType;
                        selectedItem.transactionCategory = rows[0].transactionCategory;
                        //selectedItem.fromEntity = fromEntity;
                        //selectedItem.toEntity = toEntity;
                        //selectedItem.recurringEntity = recurringEntity;
                        selectedItem.createdDate = rows[0].createdDate?.substring(0, 16);
                        selectedItem.modifiedDate = rows[0].modifiedDate?.substring(0, 16);
                        selectedItem.transactionDate = rows[0].transactionDate?.substring(0, 16);

                        fromReferenceID = rows[0].fromReference;
                        toReferenceID = rows[0].toReference;
                        recurringReferenceID = rows[0].recurringReference;
                    } 
                }
            });

            db.all(`SELECT \
                    title \
                    FROM financialEntities 
                    WHERE id = "${fromReferenceID}"`, (err, rows) => {
                        if (err) {
                            console.log(`Get Selected Item Error ${err}`);
                            reject(err);
                        }
                        else {
                            console.log("Get Selected Item Success");
                            console.log(rows);
                            if (rows && rows.length > 0) {
                                selectedItem.fromEntity = rows[0].title;
                            }
                        }
            });

            db.all(`SELECT \
                    title \
                    FROM financialEntities 
                    WHERE id = "${toReferenceID}"`, (err, rows) => {
                        if (err) {
                            console.log(`Get Selected Item Error ${err}`);
                            reject(err);
                        }
                        else {
                            console.log("Get Selected Item Success");
                            console.log(rows);
                            selectedItem.toEntity = rows && rows.length > 0 ? rows[0].title : null;
                        }
            });

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
                            console.log("Get Recurring Entity Reference ID Success in modifyItem");
                            recurringReferenceID = rows && rows.length > 0 ? rows[0].title : null;
                            console.log(recurringReferenceID);
                        }
            });

            db.all(`SELECT filename, filedata FROM files WHERE id = "${uuid}"`, (err, rows) => {
                if (err) {
                    console.log(`Get Selected Item Error ${err}`);
                    //return null;
                }
                else {
                    console.log("Get Selected Item Success");
                    console.log(rows);
                    if (rows && rows.length > 0) {
                        rows.forEach((row) => {
                            currentSelectedItemFiles[row.filename] = row.fileBlob;
                            selectedItem.file.push(row.filename);
                        });
                    } 
                    console.log("selectedItem created in the backend: ", selectedItem);
                    resolve(selectedItem);
                }
            });
        });
    });
    /*
    return {
        id: String(uuid), //uuidv4 template
        title: null,
        description: null,
        value: 0.0,
        currency: null,
        transactionType: null,
        transactionCategory: null,
        fromEntity: null, //computed by backend
        fromType: null,
        toEntity: null, //computed by backend
        toType: null,
        recurringEntity: "entity1", //computed by backend, could be null
        file: Object.keys(currentSelectedItemFiles),
        createdDate: "yyyy-MM-ddThh:mm:ss",
        modifiedDate: "yyyy-MM-ddThh:mm:ss",
        transactionDate: "yyyy-MM-ddThh:mm:ss",
    }; */
    //could also return null if the operation fails 
    //*/
}

//using id to delete an entry; return false if the operation fails
function deleteItem(event, id) {
    //communicate with backend to delete the item
    console.log("deleteItem called with id: ", id);
    return new Promise((resolve) => {
        let transactionDeleteStatus = false;
        db.serialize(() => {
            db.run(`DELETE FROM transactions WHERE id = "${id}"`, (err) => {
                if (err) {
                    console.log(`Delete Item Error ${err}`);
                    resolve(false);
                }
                else {
                    console.log("Delete Item Success");
                    transactionDeleteStatus = true;
                }
            });

            db.run(`DELETE FROM files WHERE id = "${id}"`, (err) => {
                if (err) {
                    console.log(`Delete Item Error ${err}`);
                    resolve(false);
                }
                else {
                    console.log("Delete Item Success");
                    if (transactionDeleteStatus) resolve(true);
                }
            });
        });
    });
   // return true; //could also return false if the operation fails
}

//takes selecteItem to modify an entry; return object if the operation succes; null if failure
function modifyItem(event, selectedItem){
    //communicate with backend to modify the item
    console.log("modifyItem called with id: ", selectedItem.id);
    console.log("modifyItem called with fromeEntity: ", selectedItem.fromEntity);

    return new Promise((resolve) => {
        db.serialize(() => {
            let fromReferenceID = null;
            let toReferenceID = null;
            let recurringReferenceID = null;
            db.all(`SELECT \
                    id\
                    FROM financialEntities \
                    WHERE title = "${selectedItem.fromEntity}"`, (err, rows) => {
                        if (err) {
                            console.log(`Get Financial Reference ID in modifyItem: ${err}`);
                            resolve({modifyStatus: false, item: null});
                        }
                        else {
                            console.log("Get From Financial Entity Reference ID Success in modifyItem");
                            console.log(rows);
                            fromReferenceID = rows && rows.length > 0 ? rows[0].id : null;
                            console.log(fromReferenceID);
                        }
                    });

            db.all(`SELECT \
                    id\
                    FROM financialEntities \
                    WHERE title = "${selectedItem.toEntity}"`, (err, rows) => {
                        if (err) {
                            console.log(`Get Financial Reference ID in modifyItem: ${err}`);
                            resolve({modifyStatus: false, item: null});
                        }
                        else {
                            console.log("Get To Financial Entity Reference ID Success in modifyItem");
                            toReferenceID = rows && rows.length > 0 ? rows[0].id : null;
                            console.log(toReferenceID);
                        }
                    });
                
            db.all(`SELECT \
                    id\
                    FROM recurringTransactions \
                    WHERE title = "${selectedItem.recurringEntity}"`, (err, rows) => {
                        if (err) {
                            console.log(`Get Recurring Transaction Reference ID in modifyItem: ${err}`);
                            resolve({modifyStatus: false, item: null});
                        }
                        else {
                            console.log("Get Recurring Entity Reference ID Success in modifyItem");
                            recurringReferenceID = rows && rows.length > 0 ? rows[0].id : null;
                            console.log(recurringReferenceID);
                        }
                    });

            Object.keys(currentSelectedItemFiles).forEach((filename) => {
                db.run(`INSERT OR REPLACE INTO files \
                        (id, filename, filedata) \
                        VALUES (?, ?, ?)`, [selectedItem.id, filename, currentSelectedItemFiles[filename]], (err) => {
                            if (err) {
                                console.error(err);
                                resolve({modifyStatus: false, item: null});
                            }
                    });
            });

            console.log("Before the udpate of the transactions table")

            db.run(`UPDATE transactions SET \
                    title = "${selectedItem.title}", \
                    description = "${selectedItem.description}", \
                    value = ${selectedItem.value}, \
                    currency = "${selectedItem.currency === "choose"? null: selectedItem.currency}", \
                    transactionType = "${selectedItem.transactionType}", \
                    transactionCategory = "${selectedItem.transactionCategory !== "choose"? selectedItem.transactionCategory : null}", \
                    fromReference = "${fromReferenceID}", \
                    toReference = "${toReferenceID}", \
                    recurringReference = "${recurringReferenceID}", \
                    file = "${selectedItem.file.length > 0}", \
                    modifiedDate = "${new Date().toISOString()}", \
                    transactionDate = "${selectedItem.transactionDate}" \
                    WHERE id = "${selectedItem.id}"`, (err) => {
                        if (err) {
                            console.log(`Modify Item Error ${err}`);
                            //reject({modifyStatus: false, item: null});
                            resolve({modifyStatus: false, item: null});
                        }
                        else {
                            console.log("Modify Item Success");
                            console.log(fromReferenceID)
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
                    });

        });
    });

    /*
    return {
        modifyStatus: true,
        item: {id: selectedItem.id, 
                title: "someName5", 
                transactionDate: "2023.08.01", 
                value: 5000, 
                transactionType:"in", 
                transactionCategory: "Telecommunications",
            },
    }; */
    //could also return null if the operation fails
}

//for simulation
//this should actually be a backed side function;
//this would create an entry and enter it into the database
//and return the following info for the side bar.
function createEntry() {

    if (db === null) return null;

    const uuid = uuidv4();

    db.serialize(() => {
        
        const currentDateTime = new Date().toISOString();

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
                    }
                    else {
                        console.log("Create Entry Success");
                    }
                });
    });

    return (
            {id: uuid, 
            title: "NEW ENTRY", 
            transactionDate: null, 
            value: null, 
            transactionType: null, 
            transactionCategory: null,}
    ); //could also return null if the operation fails
}


module.exports = {
    setDB,
    getFileBlob,
    setFileBlob,
    deleteFileBlob,
    getFileEntries,
    getAllItems,
    getItems,
    getSelectedItem,
    deleteItem,
    modifyItem,
    createEntry,
};