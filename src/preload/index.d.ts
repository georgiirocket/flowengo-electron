import { ElectronAPI } from '@electron-toolkit/preload'
import { AppState } from '../shared/app-state'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getAppState: () => Promise<AppState>
    }
  }
}
