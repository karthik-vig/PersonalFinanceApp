// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron');

// Expose selected APIs to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
    // Add your API methods here
    someKey: (val) => {ipcRenderer.send('someKey', val )},
});
