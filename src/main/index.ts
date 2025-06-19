import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { INVOKE_EVENTS, UI_EVENTS } from '@shared/events'
import { appStore } from './store'
import { initDatabase } from './db'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 400,
    show: false,
    title: 'Flowengo Board',
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

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

  // IPC
  ipcMain.handle(INVOKE_EVENTS.getAppState, async () => {
    return await appStore.getAppState()
  })

  ipcMain.handle(INVOKE_EVENTS.signUp, async (_event, username: string, password: string) => {
    return await appStore.signUp(username, password)
  })

  ipcMain.handle(INVOKE_EVENTS.signIn, async (_event, password: string) => {
    return await appStore.signIn(password)
  })

  ipcMain.handle(INVOKE_EVENTS.signOut, () => {
    return appStore.signOut()
  })

  ipcMain.handle(INVOKE_EVENTS.getProtectedData, async () => {
    return await appStore.getProtectedData()
  })

  ipcMain.handle(INVOKE_EVENTS.saveProtectedData, async (_event, data: unknown) => {
    return await appStore.saveProtectedData(data)
  })

  ipcMain.handle(INVOKE_EVENTS.clearAppData, async () => {
    return await appStore.clearAppData()
  })

  ipcMain.on(UI_EVENTS.clearAppDataModal, (event, data: unknown) => {
    event.sender.send(UI_EVENTS.clearAppDataModal, data)
  })

  ipcMain.on(UI_EVENTS.signOut, () => {
    appStore.signOut()
  })

  ipcMain.on(UI_EVENTS.newProject, (event, data: unknown) => {
    event.sender.send(UI_EVENTS.newProject, data)
  })

  ipcMain.on(UI_EVENTS.editProject, (event, data: unknown) => {
    event.sender.send(UI_EVENTS.editProject, data)
  })

  ipcMain.on(UI_EVENTS.newStepItem, (event, data: unknown) => {
    event.sender.send(UI_EVENTS.newStepItem, data)
  })

  ipcMain.on(UI_EVENTS.editStepItem, (event, data: unknown) => {
    event.sender.send(UI_EVENTS.editStepItem, data)
  })

  ipcMain.on(UI_EVENTS.viewStepItem, (event, data: unknown) => {
    event.sender.send(UI_EVENTS.viewStepItem, data)
  })

  ipcMain.on(UI_EVENTS.userModal, (event, data: unknown) => {
    event.sender.send(UI_EVENTS.userModal, data)
  })

  //Init sql db
  await initDatabase()

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
