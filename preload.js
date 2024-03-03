const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  onNewFile: (callback) => ipcRenderer.on('new-file', (_event) => callback()),
  onOpen: (callback) => ipcRenderer.on('open', (_event) => callback()),
  onSave: (callback) => ipcRenderer.on('save', (_event) => callback()),
  onNewVerilogModule: (callback) => ipcRenderer.on('new-verilog-module', (_event) => callback()),
  onInsertSubcircuit: (callback) => ipcRenderer.on('insert-subcircuit', (_event) => callback()),
  onPreviewCircuit: (callback) => ipcRenderer.on('preview-circuit', (_event) => callback()),
  onCombinationalAnalysis: (callback) => ipcRenderer.on('combinational-analysis', (_event) => callback()),
  onHexConverter: (callback) => ipcRenderer.on('hex-converter', (_event) => callback()),
  onSaveImage: (callback) => ipcRenderer.on('save-image', (_event) => callback()),
  onThemes: (callback) => ipcRenderer.on('themes', (_event) => callback()),
  onExportVerilog: (callback) => ipcRenderer.on('export-verilog', (_event) => callback()),
})