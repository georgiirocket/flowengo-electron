import { autoUpdater } from 'electron-updater'
import { BrowserWindow } from 'electron'
import { UI_EVENTS } from '@shared/events'

/**
 * Check for updates
 */
export function checkUpdates() {
  void autoUpdater.checkForUpdatesAndNotify()

  autoUpdater.on('update-available', () => {
    const win = BrowserWindow.getAllWindows()[0]

    win.webContents.send(UI_EVENTS.updateAvailable)
  })

  autoUpdater.on('update-downloaded', () => {
    const win = BrowserWindow.getAllWindows()[0]

    win.webContents.send(UI_EVENTS.updateDownloaded)
  })

  autoUpdater.on('error', (err) => {
    console.error('Update error:', err)
    const win = BrowserWindow.getAllWindows()[0]

    win.webContents.send(UI_EVENTS.updateError)
  })
}
