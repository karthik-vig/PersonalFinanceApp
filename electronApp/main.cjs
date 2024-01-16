const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('node:path');
const fs = require('node:fs');
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
const financialEntitiesOperation = require('./database/financialEntityOperation.cjs');

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

    win.loadFile( path.join(__dirname, '../dist/index.html'));

    // Open the DevTools in development mode
   //if (process.env.NODE_ENV === 'development') {
        win.webContents.openDevTools();
    //}
}

app.whenReady().then(() => {
    createWindow();

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

    ipcMain.handle('transactionOperations:openFileDialog', async () => {
        const { filePaths } = await dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [
                { name: 'All Files', extensions: ['*'] }
              ],
        });
        const fileNames = []
        filePaths.forEach((filePath) => {
            console.log(path);
            const bufferData = fs.readFileSync(filePath);
            const fileName = path.basename(filePath);
            fileNames.push(fileName);
        transactionOperations.setFileBlob(fileName, bufferData);
        });
        return fileNames;
    });

    ipcMain.handle('transactionOperations:saveFileDialog', async ( fileName ) => {
        const { filePath } = await dialog.showSaveDialog({
            title: 'Save File',
            defaultPath: path.join(__dirname, fileName),
            filters: [
                { name: 'All Files', extensions: ['*'] }
              ],
        });
        if (filePath) {
            const bufferData = transactionOperations.getFileBlob(fileName);
            fs.writeFileSync(filePath, bufferData);
            return true;
        }
        return false;
    });

    //FINANCIAL ENTITY OPERATIONS
    ipcMain.handle('financialEntityOperations:getTransactionEntities', financialEntitiesOperation.getTransactionEntities);

    //INITIALIZE DATABASE OPERATIONS
    ipcMain.handle('initializeDatabase:getCurrencies', initializeDatabase.getCurrencies);
    ipcMain.handle('initializeDatabase:getTransactionCategories', initializeDatabase.getTransactionCategories);

});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
