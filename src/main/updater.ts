import { autoUpdater } from 'electron-updater'
import { UI_EVENTS } from '@shared/events'
import { appWindow } from './app-window'

/**
 * Check for updates
 */
export function checkUpdates() {
  void autoUpdater.checkForUpdatesAndNotify()

  autoUpdater.on('update-available', () => {
    appWindow.getMainWindow()?.webContents.send(UI_EVENTS.updateAvailable)
  })

  autoUpdater.on('update-downloaded', () => {
    appWindow.getMainWindow()?.webContents.send(UI_EVENTS.updateDownloaded)
  })

  autoUpdater.on('error', (err) => {
    console.error(err.message)
    appWindow.getMainWindow()?.webContents.send(UI_EVENTS.updateError)
  })
}
