import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { initDatabase } from './db'
import { createMenu } from './menu'
import { setInvokes } from './invoke'
import { checkUpdates } from './updater'
import { appWindow } from './app-window'

const gotTheLock = app.requestSingleInstanceLock()

function createWindow(): void {
  appWindow.newWindow()

  // Create the browser window.
  const mainWindow = appWindow.getMainWindow()

  mainWindow?.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow?.webContents.setWindowOpenHandler((details) => {
    void shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    void mainWindow?.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    void mainWindow?.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// Only one app instance
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    const mainWindow = appWindow.getMainWindow()

    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow && mainWindow.isMinimized()) {
      mainWindow.restore()
      mainWindow.focus()
    }
  })

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.whenReady().then(async () => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })

    createMenu()
    setInvokes()
    await initDatabase()
    createWindow()

    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    checkUpdates()
  })
}
