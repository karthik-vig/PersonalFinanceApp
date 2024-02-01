
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
    console.log("In getItems: searchParams: " + searchParams + " filterParamsVisibility: " + filterParamsVisibility)
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
    return { id: 1, 
        title: "name",
        recurringFrequency: "2024-01-01",
        value: 100,
        transactionType: "Out",
        transactionCategory: "Groceries",
        };
}

function modifyItem(event, selectedItem) {
    console.log("In modifyItem: selectedItem: " + selectedItem);
    return { modifyStatus: true, modifyItem: { id: 1, 
                                               title: "name",
                                               recurringFrequency: "2024-01-01",
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
        recurringFrequency: null,
        recurringTransactionStartDate: "yyyy-MM-ddThh:mm:ss",
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