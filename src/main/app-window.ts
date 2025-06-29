import { BrowserWindow } from 'electron'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'
import { is } from '@electron-toolkit/utils'

class AppWindow {
  mainWindow: BrowserWindow | null

  constructor() {
    this.mainWindow = null
  }

  /**
   * New Window
   */
  public newWindow() {
    if (this.mainWindow) {
      return
    }

    this.mainWindow = new BrowserWindow({
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
  }

  /**
   * Get the main window
   */
  public getMainWindow(): BrowserWindow | null {
    return this.mainWindow
  }

  /**
   * Reload front application
   */
  public reloadFrontApp(): void {
    if (!this.mainWindow) {
      return
    }

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      void this.mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      void this.mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
  }
}

export const appWindow = new AppWindow()
