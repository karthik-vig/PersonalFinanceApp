const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
//const fs = require('node:fs');
/*
import {
        //initializeDatabase, 
        //closeDb,
        getFileBlob,
        setFileBlob,
        deleteFileBlob,
        getAllItems,
        getItems,
        getSelectedItem,
        deleteItem,
        modifyItem,
        createEntry,
        getCurrencies,
        getTransactionCategories,
        getTransactionEntities,
    } from './database.js';
*/
const initializeDatabase = require('./database/initializeDatabase.cjs');
const transactionOperations = require('./database/transactionOperations.cjs');
const financialEntitiesOperations = require('./database/financialEntityOperation.cjs');
const recurringTransactionOperations = require('./database/recurringTransactionOperations.cjs');

function createLoadingWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            //preload: path.join(__dirname, 'preload.cjs') // Replace with the actual path to your preload script
        }
    });

    win.loadFile( path.join(__dirname, '../dist/src/additionalPages/loadingIndex.html'));

    // Open the DevTools in development mode
   //if (process.env.NODE_ENV === 'development') {
        //win.webContents.openDevTools();
    //}
    return win;
}

function createErrorWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            //preload: path.join(__dirname, 'preload.cjs') // Replace with the actual path to your preload script
        }
    });

    win.loadFile( path.join(__dirname, '../dist/additionalPages/errorIndex.html'));

    // Open the DevTools in development mode
   //if (process.env.NODE_ENV === 'development') {
        //win.webContents.openDevTools();
    //}
}

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.cjs') // Replace with the actual path to your preload script
        }
    });

    win.loadFile( path.join(__dirname, '../dist/src/index.html'));

    // Open the DevTools in development mode
   //if (process.env.NODE_ENV === 'development') {
        win.webContents.openDevTools();
    //}
}

app.whenReady().then(() => {

    const db = initializeDatabase.initDatabase();
    transactionOperations.setDB(db);
    financialEntitiesOperations.setDB(db);
    recurringTransactionOperations.setDB(db);

    //create a loading window here
    const loadingWindow = createLoadingWindow();

    //add the recurring transactions to the transaction table
    recurringTransactionOperations.enterRecurringTransactions().then( (status) => { 
        console.log("Recurring Transactions Entered: ", status);
        //close the loading window
        loadingWindow.close();
        createWindow();
    }).catch((err) => { 
        console.log("Recurring Transactions Entry Error: ", err);
        //show error dialog, exit
        loadingWindow.close();
        createErrorWindow();
    });

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    //TRANSACTION OPERATIONS
    //ipcMain.handle('getFileBlob', getFileBlob);
    //ipcMain.handle('setFileBlob', setFileBlob);
    ipcMain.handle('transactionOperations:deleteFileBlob', transactionOperations.deleteFileBlob);
    ipcMain.handle('transactionOperations:getAllItems', transactionOperations.getAllItems);
    ipcMain.handle('transactionOperations:getItems', transactionOperations.getItems);
    ipcMain.handle('transactionOperations:getSelectedItem', transactionOperations.getSelectedItem);
    ipcMain.handle('transactionOperations:deleteItem', transactionOperations.deleteItem);
    ipcMain.handle('transactionOperations:modifyItem', transactionOperations.modifyItem);
    ipcMain.handle('transactionOperations:createEntry', transactionOperations.createEntry);
    ipcMain.handle('transactionOperations:openFileDialog', transactionOperations.openGetFileDialog);
    ipcMain.handle('transactionOperations:saveFileDialog', transactionOperations.openSaveFileDialog);

    //FINANCIAL ENTITY OPERATIONS
    ipcMain.handle('financialEntityOperations:getTransactionEntities', financialEntitiesOperations.getTransactionEntities);
    ipcMain.handle('financialEntityOperations:getAllItems', financialEntitiesOperations.getAllItems);
    ipcMain.handle('financialEntityOperations:getItems', financialEntitiesOperations.getItems);
    ipcMain.handle('financialEntityOperations:createEntry', financialEntitiesOperations.createEntry);
    ipcMain.handle('financialEntityOperations:deleteItem', financialEntitiesOperations.deleteItem);
    ipcMain.handle('financialEntityOperations:modifyItem', financialEntitiesOperations.modifyItem);
    ipcMain.handle('financialEntityOperations:getSelectedItem', financialEntitiesOperations.getSelectedItem);

    

    //INITIALIZE DATABASE OPERATIONS
    ipcMain.handle('initializeDatabase:getCurrencies', initializeDatabase.getCurrencies);
    ipcMain.handle('initializeDatabase:getTransactionCategories', initializeDatabase.getTransactionCategories);

    //RECURRING TRANSACTION OPERATIONS
    ipcMain.handle('recurringTransactionOperations:getRecurringTransactions', recurringTransactionOperations.getRecurringTransactions);
    ipcMain.handle('recurringTransactionOperations:createEntry', recurringTransactionOperations.createEntry);
    ipcMain.handle('recurringTransactionOperations:deleteItem', recurringTransactionOperations.deleteItem);
    ipcMain.handle('recurringTransactionOperations:modifyItem', recurringTransactionOperations.modifyItem);
    ipcMain.handle('recurringTransactionOperations:getSelectedItem', recurringTransactionOperations.getSelectedItem);
    ipcMain.handle('recurringTransactionOperations:getAllItems', recurringTransactionOperations.getAllItems);
    ipcMain.handle('recurringTransactionOperations:getItems', recurringTransactionOperations.getItems);

});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        initializeDatabase.closeDB();
        app.quit();
    }
});
