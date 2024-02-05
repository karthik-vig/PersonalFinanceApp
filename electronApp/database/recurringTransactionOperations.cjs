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
    ];
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
                    recurringTransactionEndDate \
                    ) VALUES (?, "NEW Entry", NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL)`, 
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

    return new Promise((resolve, reject) => {
        db.serialize(() => {
            const getFromFinancialEntityID = new Promise((resolve, reject) => { 
                db.run(`SELECT id FROM financialEntities WHERE title = ?`, selectedItem.fromEntity, (err, row) => { 
                    if (err) { 
                        console.log("Recurring Entity: In modifyItem: getFromFinancialEntityID: err: ", err);
                        reject(true);
                    } else {
                        resolve(row && row.length > 0 ? row[0].id : null);
                    }
                });
            });

            const getToFinancialEntityID = new Promise((resolve, reject) => { 
                db.run(`SELECT id FROM financialEntities WHERE title = ?`, selectedItem.toEntity, (err, row) => { 
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
                    recurringFrequencyType, \
                    recurringFrequencyDayOfTheWeek, \
                    recurringFrequencyDayOfTheMonth, \
                    recurringFrequencyMonthOfTheYear, \
                    recurringFrequencyTime, \
                    recurringTransactionStartDate, \
                    recurringTransactionEndDate \
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
                db.all(`SELECT title FROM financialEntities WHERE id = ?`, recurringTransactionRow.fromReference, (err, row) => { 
                    if (err) { 
                        console.log("Recurring Entity: In getSelectedItem: getFromEntityTitle: err: ", err);
                        reject(true);
                    } else {
                        resolve(row && row.length > 0 ? row[0].title : null);
                    }
                });
            });

            const getToEntityTitle = new Promise((resolve, reject) => {
                db.all(`SELECT title FROM financialEntities WHERE id = ?`, recurringTransactionRow.toReference, (err, row) => { 
                    if (err) { 
                        console.log("Recurring Entity: In getSelectedItem: getToEntityTitle: err: ", err);
                        reject(true);
                    } else {
                        resolve(row && row.length > 0 ? row[0].title : null);
                    }
                });
            });

            Promise.all([getFromEntityTitle,
                        getToEntityTitle]).then(([fromEntity, toEntity]) => {
                resolve({
                    id: uuid, 
                    title: recurringTransactionRow.title,
                    description: recurringTransactionRow.description,
                    value: recurringTransactionRow.value,
                    currency: recurringTransactionRow.currency,
                    transactionType: recurringTransactionRow.transactionType,
                    transactionCategory: recurringTransactionRow.transactionCategory,
                    fromEntity: fromEntity,
                    toEntity: toEntity,
                    createdDate: recurringTransactionRow.createdDate,
                    modifiedDate: recurringTransactionRow.modifiedDate,
                    recurringFrequency: {
                        frequency: recurringTransactionRow.recurringFrequencyType ?? undefined,
                        recurringFrequencyDayOfTheWeek: recurringTransactionRow.recurringFrequencyDayOfTheWeek ?? undefined,
                        recurringFrequencyDayOfTheMonth: recurringTransactionRow.recurringFrequencyDayOfTheMonth ?? undefined,
                        recurringFrequencyMonthOfTheYear: recurringTransactionRow.recurringFrequencyMonthOfTheYear ?? undefined,
                        recurringFrequencyTime: recurringTransactionRow.recurringFrequencyTime?? undefined,
                    },
                    recurringTransactionStartDate: recurringTransactionRow.recurringTransactionStartDate,
                    recurringTransactionEndDate: recurringTransactionRow.recurringTransactionEndDate,
                });
            });
        }).catch((err) => {
            console.log("Recurring Entity: In getSelectedItem: err: ", err);
            reject(true);
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
};