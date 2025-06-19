import { ipcMain } from 'electron'
import { INVOKE_EVENTS, UI_EVENTS } from '@shared/events'
import { appStore } from './store'

export function setInvokes() {
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
}
