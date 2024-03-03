const { app, BrowserWindow, Menu } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
      width: 1200,
      height: 900
    })
  
    win.loadFile('dist/index.html')
}

const isMac = process.platform === 'darwin'
const openLinkCallback = link => async () => {
  const { shell } = require('electron')
  await shell.openExternal(link)
}
const template = [
  // { role: 'appMenu' }
  ...(isMac
    ? [{
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
      }]
    : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      { label: '&New File...' },
      { label: '&Open...' },
      { label: '&Save' },
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
      ...(isMac
        ? [
            { role: 'pasteAndMatchStyle' },
            { role: 'delete' },
            { role: 'selectAll' },
            { type: 'separator' },
            {
              label: 'Speech',
              submenu: [
                { role: 'startSpeaking' },
                { role: 'stopSpeaking' }
              ]
            }
          ]
        : [
            { role: 'delete' },
            { type: 'separator' },
            { role: 'selectAll' }
          ])
    ]
  },
  {
    label: 'Circuit',
    submenu: [
      { label: 'New Verilog Module' },
      { label: 'Insert Subcircuit' }
    ]
  },
  {
    label: 'Tools',
    submenu: [
      { label: 'Combinational Analysis' },
      { label: 'Hex-Bin-Dec Converter' },
      { label: 'Save Image' },
      { label: 'Themes' },
      { label: 'Custom Shortcut' },
      { label: 'Export Verilog' },
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
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
      ...(isMac
        ? [
            { type: 'separator' },
            { role: 'front' },
            { type: 'separator' },
            { role: 'window' }
          ]
        : [
            { role: 'close' }
          ])
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