import { AppState } from '@shared/app-state'
import { getAppState } from '../db'

class AppStore {
  private appState: AppState | null

  constructor() {
    this.appState = null
  }

  public async getAppState(): Promise<AppState> {
    this.appState = await getAppState()

    return this.appState
  }
}

export const appStore = new AppStore()
