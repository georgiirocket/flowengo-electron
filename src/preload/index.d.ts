import { ElectronAPI } from '@electron-toolkit/preload'
import { AppState } from '../shared/app-state'
import { UI_EVENTS } from '../shared/events'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getAppState: () => Promise<AppState>
      signUp: (username: string, password: string) => Promise<AppState>
      signIn: (password: string) => Promise<AppState>
      signOut: () => Promise<void>
      getProtectedData: () => Promise<{ data: unknown }>
      saveProtectedData: (data: unknown) => Promise<{ status: string }>
      clearAppData: () => Promise<{ status: string }>
      on<T>(channel: UI_EVENTS, callback: (data: T) => void): () => void
      emit: (channel: UI_EVENTS, data: unknown) => void
    }
  }
}
