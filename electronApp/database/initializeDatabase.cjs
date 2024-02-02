const sqlite = require('sqlite3');
const fs = require('node:fs');


let db = null;

function getCurrencies() {
    return (
        [
            "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM",
            "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BOV", "BRL", "BSD",
            "BTN", "BWP", "BYR", "BZD", "CAD", "CDF", "CHE", "CHF", "CHW", "CLF", "CLP",
            "CNY", "COP", "COU", "CRC", "CUC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP",
            "DZD", "EGP", "ERN", "ETB", "EUR", "FKP", "GBP", "GEL", "GHS", "GIP", "GMD",
            "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "IDR", "ILS", "INR", "IQD",
            "IRR", "ISK", "JMD", "JOD", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD",
            "KYD", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD",
            "MMK", "MNT", "MOP", "MRO", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD",
            "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR",
            "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG",
            "SEK", "SGD", "SHP", "SLL", "SOS", "SRD", "SSP", "STD", "SVC", "SYP", "SZL",
            "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TWD", "UAH", "UGX", "USD", "USN",
            "UYU", "UZS", "VEF", "VND", "XAF", "XAG", "XAU", "XBA", "XBB", "XBC", "XBD",
            "XCD", "XDR", "XOF", "XOF", "XPD", "XPF", "XPT", "XSU", "XTS", "XUA", "YER",
            "ZAR", "ZMW", "ZWL"
        ] 
    ); //could also return [] if the operation fails
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
    const db = new sqlite.Database('../data/database.db');
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
                filename TEXT NOT NULL, \
                filedata BLOB, \
                PRIMARY KEY (id, filename) \
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
                files bool, \
                createdDate DATETIME, \
                modifiedDate DATETIME, \
                recurringFrequency TEXT, \
                recurringTransactionStartDate DATETIME, \
                recurringTransactionEndDate DATETIME \
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
    
    if (!fs.existsSync('../data')) {
        fs.mkdirSync('../data');
    }
    db = setupDatabase();
    return db;
}

module.exports = {
    initDatabase,
    getCurrencies,
    getTransactionCategories,
    closeDB,
}