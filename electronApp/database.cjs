import sqlite from 'sqlite3';
import fs from 'fs';

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
        
        db.run('CREATE TABLE IF NOT EXISTS files (\
                id TEXT PRIMARY KEY, \
                filename TEXT, \
                filetype TEXT, \
                filedata BLOB, \
                )');
        
        db.run('CREATE TABLE IF NOT EXISTS financialEntities (\
                id TEXT PRIMARY KEY, \
                title TEXT, \
                type TEXT, \
                )');
        
        //in the below tabke, the recurringFrequency is the frequency of the recurring transaction
        //it is {daily, weekly, monthly, yearly}
        //the recurringDate is the date of the month or year that the transaction occurs
        //it is {daily then time only, 
        //weekly then day of week and time, 
        //monthly then day of month and time, 
        //yearly then date of the month, month of year and time}
        db.run('CREATE TABLE IF NOT EXISTS recurringEntities (\
                id TEXT PRIMARY KEY, \
                title TEXT, \
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

    let db = null;
    if (!fs.existsSync('../data')) {
        fs.mkdirSync('../data');
        db = setupDatabase();
    }
    else {
        db = openDb();
    }

    return db;
    
}


export { initializeDatabase, 
         closeDb,
        };