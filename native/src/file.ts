import { dialog, BrowserWindow } from 'electron'
import fs from 'node:fs/promises'

export async function openFile(window: BrowserWindow) {
    const { filePaths } = await dialog.showOpenDialog(window, {
        filters: [
            { name: 'Circuits', extensions: ['cv'] }
        ],
        properties: ['openFile', 'openDirectory']
    })
    
    if (filePaths.length <= 0) {
        return
    }

    try {
        const data = await fs.readFile(filePaths[0], { encoding: 'utf8' })
        window.webContents.send('open', data)
    } catch (err) {
        console.log(err)
    }
}