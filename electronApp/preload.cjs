// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron');

// Expose selected APIs to the renderer process
contextBridge.exposeInMainWorld('transactionOperations', {
    // Add your API methods here
    //getFileBlob: (fileName) => {ipcRenderer.invoke('getFileBlob', fileName)},
    //setFileBlob: (fileName, arrayBuffer) => {ipcRenderer.invoke('setFileBlob', fileName, arrayBuffer)},
    deleteFileBlob: (fileName) => ipcRenderer.invoke('transactionOperations:deleteFileBlob', fileName),
    getAllItems: () => ipcRenderer.invoke('transactionOperations:getAllItems'),
    getItems: (searchParams, filterParamsVisibility) => ipcRenderer.invoke('transactionOperations:getItems', searchParams, filterParamsVisibility),
    getSelectedItem: (uuid) => ipcRenderer.invoke('transactionOperations:getSelectedItem', uuid),
    deleteItem: (uuid) => ipcRenderer.invoke('transactionOperations:deleteItem', uuid),
    modifyItem: (selectedItem) => ipcRenderer.invoke('transactionOperations:modifyItem', selectedItem),
    createEntry: () => ipcRenderer.invoke('transactionOperations:createEntry'),
    //getTransactionEntities: () => ipcRenderer.invoke('financialEntityOperations:getTransactionEntities'),
    openFileDialog: () => ipcRenderer.invoke('transactionOperations:openFileDialog'),
    saveFileDialog: (fileName) => ipcRenderer.invoke('transactionOperations:saveFileDialog', fileName),
});

contextBridge.exposeInMainWorld('financialEntityOperations', {
    // Add your API methods here
    //getFileBlob: (fileName) => {ipcRenderer.invoke('getFileBlob', fileName)},
    //setFileBlob: (fileName, arrayBuffer) => {ipcRenderer.invoke('setFileBlob', fileName, arrayBuffer)},
    getTransactionEntities: () => ipcRenderer.invoke('financialEntityOperations:getTransactionEntities'),
    getAllItems: () => ipcRenderer.invoke('financialEntityOperations:getAllItems'),
    getItems: (searchParams, filterParamsVisibility) => ipcRenderer.invoke('financialEntityOperations:getItems', searchParams, filterParamsVisibility),
    createEntry: () => ipcRenderer.invoke('financialEntityOperations:createEntry'),
    deleteItem: (uuid) => ipcRenderer.invoke('financialEntityOperations:deleteItem', uuid),
    modifyItem: (selectedItem) => ipcRenderer.invoke('financialEntityOperations:modifyItem', selectedItem),
    getSelectedItem: (uuid) => ipcRenderer.invoke('financialEntityOperations:getSelectedItem', uuid),
});

contextBridge.exposeInMainWorld('initializeDatabase', {
    // Add your API methods here
    //getFileBlob: (fileName) => {ipcRenderer.invoke('getFileBlob', fileName)},
    //setFileBlob: (fileName, arrayBuffer) => {ipcRenderer.invoke('setFileBlob', fileName, arrayBuffer)},
    getCurrencies: () => ipcRenderer.invoke('initializeDatabase:getCurrencies'),
    getTransactionCategories: () => ipcRenderer.invoke('initializeDatabase:getTransactionCategories'),
});

contextBridge.exposeInMainWorld('recurringTransactionOperations', {
    getRecurringTransactions: () => ipcRenderer.invoke('recurringTransactionOperations:getRecurringTransactions'),
});
