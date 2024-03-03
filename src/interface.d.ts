export interface IElectronAPI {
    onNewFile: (callback: () => void) => void,
    onOpen: (callback: () => void) => void,
    onSave: (callback: () => void) => void,
    onNewVerilogModule: (callback: () => void) => void,
    onInsertSubcircuit: (callback: () => void) => void,
    onPreviewCircuit: (callback: () => void) => void,
    onCombinationalAnalysis: (callback: () => void) => void,
    onHexConverter: (callback: () => void) => void,
    onSaveImage: (callback: () => void) => void,
    onThemes: (callback: () => void) => void,
    onExportVerilog: (callback: () => void) => void,
}
  
declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}