import { AppState } from '@shared/app-state'
import { getAppState } from '../db'

class AppStore {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private appState: AppState | null

  constructor() {
    this.appState = null
  }

  public async getAppState(): Promise<AppState> {
    const appState = await getAppState()

    this.appState = appState

    return appState
  }
}

export const appStore = new AppStore()
