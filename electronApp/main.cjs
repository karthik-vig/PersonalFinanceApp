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
const {
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
} = require('./database.cjs');

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

    //ipcMain.handle('getFileBlob', getFileBlob);
    //ipcMain.handle('setFileBlob', setFileBlob);
    ipcMain.handle('deleteFileBlob', deleteFileBlob);
    ipcMain.handle('getAllItems', getAllItems);
    ipcMain.handle('getItems', getItems);
    ipcMain.handle('getSelectedItem', getSelectedItem);
    ipcMain.handle('deleteItem', deleteItem);
    ipcMain.handle('modifyItem', modifyItem);
    ipcMain.handle('createEntry', createEntry);
    ipcMain.handle('getCurrencies', getCurrencies);
    ipcMain.handle('getTransactionCategories', getTransactionCategories);
    ipcMain.handle('getTransactionEntities', getTransactionEntities);

    ipcMain.handle('openFileDialog', async () => {
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
        setFileBlob(fileName, bufferData);
        });
        return fileNames;
    });

    ipcMain.handle('saveFileDialog', async ( fileName ) => {
        const { filePath } = await dialog.showSaveDialog({
            title: 'Save File',
            defaultPath: path.join(__dirname, fileName),
            filters: [
                { name: 'All Files', extensions: ['*'] }
              ],
        });
        if (filePath) {
            const bufferData = getFileBlob(fileName);
            fs.writeFileSync(filePath, bufferData);
            return true;
        }
        return false;
    });

});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
