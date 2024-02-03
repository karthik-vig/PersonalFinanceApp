const { v4: uuidv4 } = require('uuid');

let db = null;

function getRecurringTransactions() {
    //communicate with the database to get the recurring transactions
    return ["entity1", "entity2", "entity3", "entity4"];
}

function setDB(database) {
    //set the database to be used by the module
    db = database;
    console.log("In setDB: db: " + db);
}

function getAllItems() {
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
    return { modifyStatus: true, item: { id: 1, 
                                        title: "Modified name",
                                        recurringFrequency: "Monthly",
                                        value: 100,
                                        transactionType: "Out",
                                        transactionCategory: "Groceries",
                                        }
            };
}

function deleteItem(event, uuid) {
    console.log("In deleteItem: uuid: " + uuid);
    //return true;
}

function getSelectedItem(event, uuid) {
    console.log("In getSelectedItem: uuid: " + uuid);
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