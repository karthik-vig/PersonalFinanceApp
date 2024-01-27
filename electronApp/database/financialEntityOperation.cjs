//const sqlite = require('sqlite3');
//const fs = require('node:fs');


//backend simulation to get transaction entities
function getTransactionEntities() {
    return (
            [{name: "entity1", type: "Internal"}, {name: "entity2", type: "Internal"}, {name: "entity3", type: "External"}, {name: "entity4", type: "External"}]
    ); //could also return [] if the operation fails
}

function getAllItems() {

    return [
        {id: 1, title: "entity1", type: "Internal"},
        {id: 2, title: "entity2", type: "Internal"},
        {id: 3, title: "entity3", type: "External"},
        {id: 4, title: "entity4", type: "External"},
    ];

}

function getItems(event, searchParams, filterParamsVisibility) {
    console.log("searchParams = ", searchParams);
    console.log("filterParamsVisibility = ", filterParamsVisibility);
    return [
        {id: 1, title: "entity1", type: "Internal"},
        {id: 3, title: "entity3", type: "External"},
    ];

}


function createEntry() {

    return {id: 10, title: "entity10", type: "Internal"};
}

function deleteItem(event, uuid) {

    console.log("delete entry uuid = ", uuid);

    return true;
}

function modifyItem(event, selectedItem) {
    console.log("modifyItem selectedItem = ", selectedItem);
    return { modifyStatus: true, modifiedItem: {id: 11, title: "entity11", type: "External"} };
}

function getSelectedItem(event, uuid) {
    
        console.log("getSelectedItem uuid = ", uuid);
    
        return {id: 1, title: "entity1", type: "Internal", creatdDate: "2021-01-01T00:00", modifiedDate: "2021-01-01T00:00"};
    
}



module.exports = {
    getTransactionEntities,
    getAllItems,
    getItems,
    createEntry,
    deleteItem,
    modifyItem,
    getSelectedItem,
};