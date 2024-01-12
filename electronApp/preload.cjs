// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron');

// Expose selected APIs to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
    // Add your API methods here
    //getFileBlob: (fileName) => {ipcRenderer.invoke('getFileBlob', fileName)},
    //setFileBlob: (fileName, arrayBuffer) => {ipcRenderer.invoke('setFileBlob', fileName, arrayBuffer)},
    deleteFileBlob: (fileName) => ipcRenderer.invoke('deleteFileBlob', fileName),
    getAllItems: () => ipcRenderer.invoke('getAllItems'),
    getItems: (searchParams) => ipcRenderer.invoke('getItems', searchParams),
    getSelectedItem: (uuid) => ipcRenderer.invoke('getSelectedItem', uuid),
    deleteItem: (uuid) => ipcRenderer.invoke('deleteItem', uuid),
    modifyItem: (selectedItem) => ipcRenderer.invoke('modifyItem', selectedItem),
    createEntry: () => ipcRenderer.invoke('createEntry'),
    getCurrencies: () => ipcRenderer.invoke('getCurrencies'),
    getTransactionCategories: () => ipcRenderer.invoke('getTransactionCategories'),
    getTransactionEntities: () => ipcRenderer.invoke('getTransactionEntities'),
    openFileDialog: () => ipcRenderer.invoke('openFileDialog'),
    saveFileDialog: () => ipcRenderer.invoke('saveFileDialog'),
});
