//const sqlite = require('sqlite3');
//const fs = require('node:fs');
const { v4: uuidv4 } = require('uuid');

let db = null;

function setDB(database) {
    db = database;
}

//backend simulation to get transaction entities
function getTransactionEntities() {
    return (
            [{name: "entity1", type: "Internal"}, {name: "entity2", type: "Internal"}, {name: "entity3", type: "External"}, {name: "entity4", type: "External"}]
    ); //could also return [] if the operation fails
}

function getAllItems() {

    console.log("financial entity : getAllItems called");

    return new Promise((resolve) => {
        db.all("SELECT id, title, type FROM financialEntities", [], (err, rows) => {
            if (err) {
                console.log("financial entity : getAllItems error = ", err);
                resolve([]);
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

    return new Promise((resolve) => {
        let queryStmt = `SELECT id, title, type FROM financialEntities WHERE title LIKE "%${searchParams.search}%"`;
        Object.keys(filterParamsVisibility).forEach((fieldname) => {
            if (fieldname !== "sort" && filterParamsVisibility[fieldname] && searchParams.filter[fieldname]) {
                if (typeof searchParams.filter[fieldname] === "object" &&
                    searchParams.filter[fieldname].min !== null &&
                    searchParams.filter[fieldname].max !== null) {
                        queryStmt += ` AND (${fieldname} BETWEEN ${searchParams.filter[fieldname].min} AND ${searchParams.filter[fieldname].max})`;
                } else {
                    queryStmt += ` AND (${fieldname} = "${searchParams.filter[fieldname]}")`;
                }
            }
        });
        const filterSortStmt = ((filterParamsVisibility.sort && 
                                 searchParams.filter.sort.ascending === "true" && 
                                 searchParams.filter.sort.field) ? 
                                ` ORDER BY ${searchParams.filter.sort.field} ASC` : 
                                    (searchParams.filter.sort.field && 
                                     searchParams.filter.sort.ascending === false) ? 
                                     ` ORDER BY ${searchParams.filter.sort.field} DESC` : ``
                                );
        queryStmt += filterSortStmt;

        db.all(queryStmt, (err, rows) => { 
            if (err) {
                console.log("Financial Entity Operations : getItems error = ", err);
                resolve([]);
            }
            else {
                console.log("Financial Entity Operations : getItems rows = ", rows);
                resolve(rows);
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

    return new Promise((resolve) => {
        const uuid = uuidv4();
        const currentDate = new Date().toISOString().substring(0, 16);
        db.run(`INSERT INTO financialEntities (id, title, type, createdDate, modifiedDate) \
                VALUES (?, ?, ?, ?, ?)`, uuid, "New Entry", null, currentDate, currentDate, (err) => {
            if (err) {
                console.log("Financial Entity Operations : createEntry error = ", err);
                resolve(null);
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

    return new Promise((resolve) => {
        db.run(`DELETE FROM financialEntities WHERE id = ?`, uuid, (err) => {
            if (err) {
                console.log("Financial Entity Operations : deleteItem error = ", err);
                resolve(false);
            }
            else {
                console.log("Financial Entity Operations : deleteItem success");
                resolve(true);
            }
        });
    });
    //return true;
}

function modifyItem(event, selectedItem) {
    console.log("modifyItem selectedItem = ", selectedItem);

    return new Promise((resolve) => {
        db.run(`UPDATE financialEntities \
                SET title = ?, type = ?, modifiedDate = ? \
                WHERE id = ?`, 
                selectedItem.title, 
                selectedItem.type, 
                new Date().toISOString().substring(0, 16), 
                selectedItem.id,   
                (err) => {
                    if (err) {
                        console.log("Financial Entity Operations : modifyItem error = ", err);
                        resolve({ modifyStatus: false, modifiedItem: null });
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

    return new Promise((resolve) => {
        db.all(`SELECT * FROM financialEntities WHERE id = ?`, uuid, (err, rows) => {
            if (err) {
                console.log("Financial Entity Operations : getSelectedItem error = ", err);
                resolve(null);
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
};