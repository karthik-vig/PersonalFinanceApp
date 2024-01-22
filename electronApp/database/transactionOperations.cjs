const { v4: UUIDv4 } = require('uuid');

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
    const fileBufferData = currentSelectedItemFiles.get(fileName, null);
    return  fileBufferData;//could also return null if the operation fails
}

function setFileBlob(event, fileName, arrayBuffer) {
    //communicate with backend to set the file blob
    console.log( "set file blob fileName: ", fileName, " fileBlob: ", arrayBuffer);
    return true; //could also return false if the operation fails
}

function deleteFileBlob(event, fileName) {
    //communicate with backend to delete the file blob
    console.log( "delete file blob fileName: ", fileName);
    //const currentSelectedItemFiles = getCurrentSelectedItemFiles();
    if (currentSelectedItemFiles.keys().includes(fileName)){
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
    return  {"SuperFile71.txt" : Buffer.from("hello world1 " + uuid, "utf-8"),
            "SuperFile72.txt" : Buffer.from("hello world2 " + uuid, "utf-8"),
            "SuperFile73.txt" : Buffer.from("hello world3 " + uuid, "utf-8"),
            };//could also return null if the operation fails
}


//backed function to get all items for the side bar
function getAllItems() {
    //communicate with backend to get all items
    console.log("getAllItems called");
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
        ]; //could also return null if the operation fails
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
    }; //could also return null if the operation fails 
    //*/
}

//using id to delete an entry; return false if the operation fails
function deleteItem(event, id) {
    //communicate with backend to delete the item
    console.log("deleteItem called with id: ", id);
    return true; //could also return false if the operation fails
}

//takes selecteItem to modify an entry; return object if the operation succes; null if failure
function modifyItem(event, selectedItem){
    //communicate with backend to modify the item
    console.log("modifyItem called with id: ", selectedItem.id);
    return {
        modifyStatus: true,
        item: {id: selectedItem.id, 
                title: "someName5", 
                transactionDate: "2023.08.01", 
                value: 5000, 
                transactionType:"in", 
                transactionCategory: "Telecommunications",
            },
    }; //could also return null if the operation fails
}

//for simulation
//this should actually be a backed side function;
//this would create an entry and enter it into the database
//and return the following info for the side bar.
function createEntry() {

    if (db === null) return null;

    const uuid = UUIDv4();

    db.serialize(() => {
        
        db.run(`INSERT INTO transaction (\
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
                ${uuid}, \
                "NEW ENTRY", \
                NULL, \
                NULL, \
                NULL, \
                NULL, \
                NULL, \
                NULL, \
                NULL, \
                NULL, \
                false, \
                yyyy-MM-ddThh:mm:ss, \
                yyyy-MM-ddThh:mm:ss, \
                yyyy-MM-ddThh:mm:ss \
                )`);
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