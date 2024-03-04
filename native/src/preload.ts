const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  onNewFile: (callback: () => void) => ipcRenderer.on('new-file', (_event) => callback()),
  onOpen: (callback: (data: string) => void) => ipcRenderer.on('open', (_event, data) => callback(data)),
  onSave: (callback: () => void) => ipcRenderer.on('save', (_event) => callback()),
  onNewVerilogModule: (callback: () => void) => ipcRenderer.on('new-verilog-module', (_event) => callback()),
  onInsertSubcircuit: (callback: () => void) => ipcRenderer.on('insert-subcircuit', (_event) => callback()),
  onPreviewCircuit: (callback: () => void) => ipcRenderer.on('preview-circuit', (_event) => callback()),
  onCombinationalAnalysis: (callback: () => void) => ipcRenderer.on('combinational-analysis', (_event) => callback()),
  onHexConverter: (callback: () => void) => ipcRenderer.on('hex-converter', (_event) => callback()),
  onSaveImage: (callback: () => void) => ipcRenderer.on('save-image', (_event) => callback()),
  onThemes: (callback: () => void) => ipcRenderer.on('themes', (_event) => callback()),
  onExportVerilog: (callback: () => void) => ipcRenderer.on('export-verilog', (_event) => callback()),
})