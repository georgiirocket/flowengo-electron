import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { INVOKE_EVENTS } from '@shared/events'

// Custom APIs for renderer
const api = {
  getAppState: () => {
    return ipcRenderer.invoke(INVOKE_EVENTS.getAppState)
  },
  signUp: (username: string, password: string) => {
    return ipcRenderer.invoke(INVOKE_EVENTS.signUp, username, password)
  },
  signIn: (password: string) => {
    return ipcRenderer.invoke(INVOKE_EVENTS.signIn, password)
  },
  signOut: () => {
    return ipcRenderer.invoke(INVOKE_EVENTS.signOut)
  },
  getProtectedData: () => {
    return ipcRenderer.invoke(INVOKE_EVENTS.getProtectedData)
  },
  saveProtectedData: (data: unknown) => {
    return ipcRenderer.invoke(INVOKE_EVENTS.saveProtectedData, data)
  },
  clearAppData: () => {
    return ipcRenderer.invoke(INVOKE_EVENTS.clearAppData)
  },
  getAppVersion: () => {
    return ipcRenderer.invoke(INVOKE_EVENTS.appVersion)
  },
  on: (channel: string, callback: (data: unknown) => void) => {
    const listener = (_event: Electron.IpcRendererEvent, data: unknown) => callback(data)

    ipcRenderer.on(channel, listener)

    return () => ipcRenderer.removeListener(channel, listener)
  },
  emit: (channel: string, data: unknown) => {
    ipcRenderer.send(channel, data)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
