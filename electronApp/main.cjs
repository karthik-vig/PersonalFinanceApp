const { 
    app, 
    BrowserWindow, 
    ipcMain, 
    protocol, 
    // Menu,
 } = require('electron');
const path = require('node:path');
const fs = require('node:fs');
const initializeDatabase = require('./database/initializeDatabase.cjs');
const transactionOperations = require('./database/transactionOperations.cjs');
const financialEntitiesOperations = require('./database/financialEntityOperation.cjs');
const recurringTransactionOperations = require('./database/recurringTransactionOperations.cjs');
const commonOperations = require('./database/commonOperations.cjs');

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: {
      standard: true,
      secure: false,
      bypassCSP: false,
      allowServiceWorkers: false,
      supportFetchAPI: false,
      corsEnabled: false,
      stream: false, 
      codeCache: false,
    }
  }
]);

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        minHeight: 600,
        minWidth: 700,
        icon: path.join(__dirname, 'piggyBankIcon.ico'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true,
            experimentalFeatures: false,
            allowRunningInsecureContent: false,
            webSecurity: true,
            preload: path.join(__dirname, 'preload.cjs') // Replace with the actual path to your preload script
        }
    });

    win.loadURL('app://mainApplication/index.html');
    //Menu.setApplicationMenu(null);
    // Open the DevTools in development mode
    if (process.env.NODE_ENV === 'development') {
        win.webContents.openDevTools();
    }
    return win;
}

function setupProcess() {
    const {db, configFile} = initializeDatabase.initDatabase();
    transactionOperations.setDB(db);
    transactionOperations.setTimeZone(configFile.timezone);
    financialEntitiesOperations.setDB(db);
    financialEntitiesOperations.setTimeZone(configFile.timezone);
    recurringTransactionOperations.setDB(db);
    recurringTransactionOperations.setTimeZone(configFile.timezone);
    commonOperations.setDB(db);
    commonOperations.setTimeZone(configFile.timezone);
}

app.whenReady().then(() => {

    protocol.handle('app', (req) => {
        const { host, pathname } = new URL(req.url);
        if (host !== "mainapplication") return;
        switch (pathname) {
            case "/index.html":
                return new Response( fs.readFileSync(path.join(__dirname, "../dist/index.html"), 'utf8'),
                                     { headers: { "content-type": "text/html" } }
                                    );
            case "/assets/index.css":
                return new Response( fs.readFileSync(path.join(__dirname, "../dist/assets/index.css"), 'utf8'),
                                        { headers: { "content-type": "text/css" } }
                                    );
            case "/assets/index.js":
                return new Response( fs.readFileSync(path.join(__dirname, "../dist/assets/index.js"), 'utf8'),
                                        { headers: { "content-type": "text/javascript" } }
                                    );
            case "/assets/Montserrat-Medium.ttf":
                return new Response( fs.readFileSync(path.join(__dirname, "../dist/assets/Montserrat-Medium.ttf")),
                                        { headers: { "content-type": "font/ttf" } }
                                    );
            case "/assets/RobotoCondensed-VariableFont_wght.ttf":
                return new Response( fs.readFileSync(path.join(__dirname, "../dist/assets/RobotoCondensed-VariableFont_wght.ttf")),
                                        { headers: { "content-type": "font/ttf" } }
                                    );
            default:
                return new Response( "Error - Not Found", { status: 404 } );
        }
    });



    let win = null;

    //do the setup process
    setupProcess();

    //add the recurring transactions to the transaction table
    recurringTransactionOperations.enterRecurringTransactions().then( (status) => { 
        console.log("Recurring Transactions Entered: ", status);
        if (status) win = createWindow();
    }).catch((err) => { 
        console.log("Recurring Transactions Entry Error: ", err);
    });

    
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            win = createWindow();
        }
    });

    //refresh the application
    ipcMain.handle('refresh', (event, page) => {
        recurringTransactionOperations.enterRecurringTransactions().then( (status) => { 
            console.log("Recurring Transactions Entered: ", status);
            console.log("Refreshing the application, the page is: ", page);
            win.reload();
        }).catch((err) => { 
            console.log("Recurring Transactions Entry Error: ", err);
        });
    });

    //full refresh of the application
    ipcMain.handle('fullRefresh', async () => {
        //do the setup process
        setupProcess();
        recurringTransactionOperations.enterRecurringTransactions().then( (status) => {
            console.log("Recurring Transactions Entered: ", status);
            if (status) win.reload();
        }).catch((err) => {
            console.log("Recurring Transactions Entry Error: ", err);
        });
    });

    //COMMON OPERATIONS
    ipcMain.handle('commonOperations:getStatsAboutDB', commonOperations.getStatsAboutDB);

    
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
    ipcMain.handle('transactionOperations:deleteTransactionOnRecurringReferenceID', transactionOperations.deleteTransactionOnRecurringReferenceID);
    ipcMain.handle('transactionOperations:modifyTransactionReferenceID', transactionOperations.modifyTransactionReferenceID);
    ipcMain.handle('transactionOperations:updateFinancialEntityReferenceID', transactionOperations.updateFinancialEntityReferenceID);
    ipcMain.handle('transactionOperations:getLinePlotData', transactionOperations.getLinePlotData);
    ipcMain.handle('transactionOperations:getStatsByCategoryPlotData', transactionOperations.getStatsByCategoryPlotData);

    //FINANCIAL ENTITY OPERATIONS
    ipcMain.handle('financialEntityOperations:getTransactionEntities', financialEntitiesOperations.getTransactionEntities);
    ipcMain.handle('financialEntityOperations:getAllItems', financialEntitiesOperations.getAllItems);
    ipcMain.handle('financialEntityOperations:getItems', financialEntitiesOperations.getItems);
    ipcMain.handle('financialEntityOperations:createEntry', financialEntitiesOperations.createEntry);
    ipcMain.handle('financialEntityOperations:deleteItem', financialEntitiesOperations.deleteItem);
    ipcMain.handle('financialEntityOperations:modifyItem', financialEntitiesOperations.modifyItem);
    ipcMain.handle('financialEntityOperations:getSelectedItem', financialEntitiesOperations.getSelectedItem);
    ipcMain.handle('financialEntityOperations:getIdFromTitle', financialEntitiesOperations.getIdFromTitle);
    ipcMain.handle('financialEntityOperations:getReferenceIdOnTitle', financialEntitiesOperations.getReferenceIdOnTitle);
    

    //INITIALIZE DATABASE OPERATIONS
    ipcMain.handle('initializeDatabase:getCurrencies', initializeDatabase.getCurrencies);
    ipcMain.handle('initializeDatabase:getTransactionCategories', initializeDatabase.getTransactionCategories);
    ipcMain.handle('initializeDatabase:updateConfigFile', initializeDatabase.updateConfigFile);
    ipcMain.handle('initializeDatabase:openFilePathDialog', initializeDatabase.openFilePathDialog);
    ipcMain.handle('initializeDatabase:getConfigFile', initializeDatabase.getConfigFile);

    //RECURRING TRANSACTION OPERATIONS
    ipcMain.handle('recurringTransactionOperations:getRecurringTransactions', recurringTransactionOperations.getRecurringTransactions);
    ipcMain.handle('recurringTransactionOperations:createEntry', recurringTransactionOperations.createEntry);
    ipcMain.handle('recurringTransactionOperations:deleteItem', recurringTransactionOperations.deleteItem);
    ipcMain.handle('recurringTransactionOperations:modifyItem', recurringTransactionOperations.modifyItem);
    ipcMain.handle('recurringTransactionOperations:getSelectedItem', recurringTransactionOperations.getSelectedItem);
    ipcMain.handle('recurringTransactionOperations:getAllItems', recurringTransactionOperations.getAllItems);
    ipcMain.handle('recurringTransactionOperations:getItems', recurringTransactionOperations.getItems);
    ipcMain.handle('recurringTransactionOperations:getIdFromTitle', recurringTransactionOperations.getIdFromTitle);
    ipcMain.handle('recurringTransactionOperations:updateFinancialEntityReferenceID', recurringTransactionOperations.updateFinancialEntityReferenceID);

});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        initializeDatabase.closeDB();
        app.quit();
    }
});

app.on('web-contents-created', (event, contents) => { 
    contents.on('will-navigate', (event) => {
        event.preventDefault(); //prevent the window from navigating
    });

    contents.on('will-redirect', (event) => {
        event.preventDefault(); //prevent the window from redirecting
    });

    contents.setWindowOpenHandler(() => { 
        return { action: 'deny' }; //prevent the window from opening a new window
    });
});