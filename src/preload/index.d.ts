import { ElectronAPI } from '@electron-toolkit/preload'
import { AppState } from '../shared/app-state'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getAppState: () => Promise<AppState>
      on<T>(channel: string, callback: (data: T) => void): () => void
      emit: (channel: string, data: unknown) => void
    }
  }
}
