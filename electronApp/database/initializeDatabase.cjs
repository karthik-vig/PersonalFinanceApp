const sqlite = require('sqlite3');
const fs = require('node:fs');


let db = null;

function getCurrencies() {
    return (
            ["USD", "CAD", "INR", "EUR", "GBP", "AUD", "JPY"]   //could also return [] if the operation fails
    );
}

function getTransactionCategories() {
    return (
            ["Salary", "Rent", "Groceries", "Utilities", "Entertainment", "Miscellaneous"]   //could also return [] if the operation fails
    );
}

function openDB() {
    db = new sqlite.Database('../data/database.db');
    return db;
}

function closeDB() {
    db.close();
}

function setupDatabase() {
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
                createdDate datetime, \
                modifiedDate datetime, \
                transactionDate datetime, \
                )');
        
        //make sure fileName is unique for a given uuid
        db.run('CREATE TABLE IF NOT EXISTS files (\
                id TEXT NOT NULL, \
                filename TEXT NOT NULL, \
                filedata BLOB, \
                )');
        
        db.run('CREATE TABLE IF NOT EXISTS financialEntities (\
                id TEXT PRIMARY KEY, \
                title TEXT UNIQUE, \
                type TEXT, \
                )');

        //this table is for storing the currency and transaction categories and other additional data
        db.run('CREATE TABLE IF NOT EXISTS additionalDataStore (\
                currency TEXT NOT NULL, \
                transactionCategories TEXT NOT NULL, \
                )');
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
                createdDate datetime, \
                modifiedDate datetime, \
                recurringFrequency TEXT, \
                recurringDate TEXT, \
                )');
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

/*
function openDb() {
    const db = new sqlite.Database('../data/database.db');
    return db;
  }
  
  function closeDb(db) {
      db.close();
  }
  
  function setupDatabase() {
  
      const db = openDb();
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
                  createdDate datetime, \
                  modifiedDate datetime, \
                  transactionDate datetime, \
                  )');
          
          //make sure fileName is unique for a given uuid
          db.run('CREATE TABLE IF NOT EXISTS files (\
                  id TEXT NOT NULL, \
                  filename TEXT NOT NULL, \
                  filedata BLOB, \
                  )');
          
          db.run('CREATE TABLE IF NOT EXISTS financialEntities (\
                  id TEXT PRIMARY KEY, \
                  title TEXT UNIQUE, \
                  type TEXT, \
                  )');
  
          //this table is for storing the currency and transaction categories and other additional data
          db.run('CREATE TABLE IF NOT EXISTS additionalDataStore (\
                  currency TEXT NOT NULL, \
                  transactionCategories TEXT NOT NULL, \
                  )');
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
                  createdDate datetime, \
                  modifiedDate datetime, \
                  recurringFrequency TEXT, \
                  recurringDate TEXT, \
                  )');
      });
  
      return db;
  }
  
  function initializeDatabase() {
      
      if (!fs.existsSync('../data')) {
          fs.mkdirSync('../data');
      }
      const db = setupDatabase();
      return db;
  }


//backend simulation to get currencies
function getCurrencies() {
    return (
            ["USD", "CAD", "INR", "EUR", "GBP", "AUD", "JPY"]
    ); //could also return [] if the operation fails
}

//backend simulation to get transaction categories
function getTransactionCategories() {
    return (
            ["Salary", "Rent", "Groceries", "Utilities", "Entertainment", "Miscellaneous"]
    ); //could also return [] if the operation fails
}
*/

module.exports = {
    initDatabase,
    getCurrencies,
    getTransactionCategories,
    openDB,
    closeDB,
}