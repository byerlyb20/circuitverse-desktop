import { app, BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron'
import path from 'node:path'

import { openFile } from './file.js'

let mainWindow: BrowserWindow

const createWindow = () => {
    mainWindow = new BrowserWindow({
      width: 1200,
      height: 900,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
  
    mainWindow.loadFile('../dist/index.html')
}

const isMac = process.platform === 'darwin'
const openLinkCallback = (link: string) => async () => {
  const { shell } = require('electron')
  await shell.openExternal(link)
}
const template: MenuItemConstructorOptions[] = [
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      {
        label: '&New File...',
        accelerator: process.platform === 'darwin' ? 'Cmd+N' : 'Ctrl+N',
        click: () => mainWindow.webContents.send('new-file')
      },
      { type: 'separator' },
      {
        label: '&Open...',
        accelerator: process.platform === 'darwin' ? 'Cmd+O' : 'Ctrl+O',
        click: async () => await openFile(mainWindow)
      },
      { type: 'separator' },
      {
        label: '&Save As...',
        accelerator: process.platform === 'darwin' ? 'Cmd+S' : 'Ctrl+S',
        click: () => mainWindow.webContents.send('save')
      },
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      // ...(isMac
      //   ? [
      //       { role: 'pasteAndMatchStyle' },
      //       { role: 'delete' },
      //       { role: 'selectAll' },
      //       { type: 'separator' },
      //       {
      //         label: 'Speech',
      //         submenu: [
      //           { role: 'startSpeaking' },
      //           { role: 'stopSpeaking' }
      //         ]
      //       }
      //     ]
      //   : [
      //       { role: 'delete' },
      //       { type: 'separator' },
      //       { role: 'selectAll' }
      //     ])
    ]
  },
  {
    label: 'Circuit',
    submenu: [
      {
        label: 'New Verilog Module',
        click: () => mainWindow.webContents.send('new-verilog-module')
      },
      {
        label: 'Insert Subcircuit',
        click: () => mainWindow.webContents.send('insert-subcircuit')
      }
    ]
  },
  {
    label: 'Tools',
    submenu: [
      {
        label: 'Combinational Analysis',
        click: () => mainWindow.webContents.send('combinational-analysis')
      },
      {
        label: 'Hex-Bin-Dec Converter',
        click: () => mainWindow.webContents.send('hex-converter')
      },
      {
        label: 'Save Image',
        click: () => mainWindow.webContents.send('save-image')
      },
      {
        label: 'Themes',
        click: () => mainWindow.webContents.send('themes')
      },
      {
        label: 'Export Verilog',
        click: () => mainWindow.webContents.send('export-verilog')
      },
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      {
        label: 'Preview Circuit',
        click: () => mainWindow.webContents.send('preview-circuit')
      },
      { type: 'separator' },
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      // TODO: Figure out how to make TypeScript happy with destructuring
      // ...(isMac
      //   ? [
      //       { type: 'separator' },
      //       { role: 'front' },
      //       { type: 'separator' },
      //       { role: 'window' }
      //     ]
      //   : [
      //       { role: 'close' }
      //     ])
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Tutorial Guide'
      },
      {
        label: 'User Manual',
        click: openLinkCallback('https://docs.circuitverse.org/')
      },
      {
        label: 'Learn Digital Logic',
        click: openLinkCallback('https://learn.circuitverse.org/')
      }
    ]
  }
]

// Add the Mac app menu
if (isMac) {
  template.unshift({
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideOthers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  })
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})