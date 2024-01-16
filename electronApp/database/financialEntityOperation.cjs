//const sqlite = require('sqlite3');
//const fs = require('node:fs');


//backend simulation to get transaction entities
function getTransactionEntities() {
    return (
            [{name: "entity1", type: "Internal"}, {name: "entity2", type: "Internal"}, {name: "entity3", type: "External"}, {name: "entity4", type: "External"}]
    ); //could also return [] if the operation fails
}


module.exports = {
    getTransactionEntities,
};