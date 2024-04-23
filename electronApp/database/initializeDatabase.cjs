const sqlite = require('sqlite3');
const fs = require('node:fs');
const { dialog } = require('electron');
const getConfigFileTemplate = require('./configFileTemplate.cjs');
const { validateBrowserWindowPath } = require('./commonOperations.cjs');


let db = null;
let configFile = null;

function getCurrencies() {
    return configFile.currencies; //could also return [] if the operation fails
}

function getTransactionCategories() {
    return (
        ["Groceries", "Restaurants and Dining", "Shopping", "Utilities", "Telecommunication",
         "Transportation", "Rent or Mortgage", "Insurance", "Healthcare", "Education", "Entertainment",
         "Travel and Lodging", "Personal Care", "Fitness and Wellness", "Investments and Savings", "Loans and Credit Payments",
         "Charity and Donations", "Home Improvement and Maintenance", "Childcare and Education", "Pet Care", "Taxes", 
         "Legal Services", "Other" ]
    ); //could also return [] if the operation fails
}

function openDB() {
    const db = new sqlite.Database(configFile.filePath);
    return db;
}

function closeDB() {
    if (db !== null) db.close();
}

function setupDatabase() {

    const db = openDB();

    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS transactions (\
                id TEXT PRIMARY KEY, \
                title TEXT, \
                description TEXT, \
                value REAL, \
                currency TEXT, \
                transactionType TEXT, \
                transactionCategory TEXT, \
                fromReference TEXT, \
                toReference TEXT, \
                recurringReference TEXT, \
                file bool, \
                createdDate DATETIME, \
                modifiedDate DATETIME, \
                transactionDate DATETIME \
                )', (err) => { 
                    if (err) { 
                        console.log(`Transaction table creation ${err}`); 
                    }
                    else {
                        console.log("Transactions table created successfully");
                    }

            });
        
        //make sure fileName is unique for a given uuid
        db.run('CREATE TABLE IF NOT EXISTS files (\
                id TEXT NOT NULL, \
                fileid TEXT PRIMARY KEY, \
                filename TEXT NOT NULL, \
                filedata BLOB \
                )', (err) => { 
                    if (err) { 
                        console.log(`Files table creation ${err}`); 
                    }
                    else {
                        console.log("Files table created successfully");
                    } 
            });
        
        db.run('CREATE TABLE IF NOT EXISTS financialEntities (\
                id TEXT PRIMARY KEY, \
                title TEXT UNIQUE, \
                type TEXT, \
                createdDate DATETIME, \
                modifiedDate DATETIME \
                )', (err) => { 
                    if (err) { 
                        console.log(`financialEntities table creation ${err}`); 
                    }
                    else {
                        console.log("financialEntities table created successfully");
                    }
            });

        //in the below tabke, the recurringFrequency is the frequency of the recurring transaction
        //it is {daily, weekly, monthly, yearly}
        //the recurringDate is the date of the month or year that the transaction occurs
        //it is {daily then time only, 
        //weekly then day of week and time, 
        //monthly then day of month and time, 
        //yearly then date of the month, month of year and time}
        db.run('CREATE TABLE IF NOT EXISTS recurringTransactions (\
                id TEXT PRIMARY KEY, \
                title TEXT UNIQUE, \
                description TEXT, \
                value REAL, \
                currency TEXT, \
                transactionType TEXT, \
                transactionCategory TEXT, \
                fromReference TEXT, \
                toReference TEXT, \
                createdDate DATETIME, \
                modifiedDate DATETIME, \
                recurringFrequencyType TEXT, \
                recurringFrequencyDayOfTheWeek TEXT, \
                recurringFrequencyDayOfTheMonth TEXT, \
                recurringFrequencyMonthOfTheYear TEXT, \
                recurringFrequencyTime TEXT, \
                recurringTransactionStartDate DATETIME, \
                recurringTransactionEndDate DATETIME, \
                lastRecurringTransactionDate DATETIME \
                )', (err) => { 
                    if (err) { 
                        console.log(`recurringTransactions table creation ${err}`); 
                    }
                    else {
                        console.log("recurringTransactions table created successfully");
                    }
            });
    });

    return db;
}
function initDatabase() {
    
    if (!fs.existsSync('./data')) {
        fs.mkdirSync('./data');
    }
    switch(fs.existsSync('./data/config.json')) {
        case false:
            fs.writeFileSync('./data/config.json', JSON.stringify(getConfigFileTemplate(), null, 4));
            configFile = getConfigFileTemplate();
            break;
        case true:
            configFile = JSON.parse(fs.readFileSync('./data/config.json'));
            break;
    }
    db = setupDatabase();
    return {db, configFile};
}

async function updateConfigFile(event, filePath, timezone) {
    if (!validateBrowserWindowPath(event.senderFrame.url)) return;
    configFile.filePath = filePath;
    configFile.timezone = timezone;
    fs.writeFileSync('./data/config.json', JSON.stringify(configFile, null, 4));
    return;
}

async function openFilePathDialog() {
    const { filePaths } = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            { name: 'All Files', extensions: ['*'] }
          ],
    });
    return filePaths[0];
}

async function getConfigFile() {
    return configFile;
}

module.exports = {
    initDatabase,
    getCurrencies,
    getTransactionCategories,
    closeDB,
    updateConfigFile,
    openFilePathDialog,
    getConfigFile,
}