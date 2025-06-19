import { AppState } from '@shared/app-state'

export const getAppState = async (): Promise<AppState> => {
  return window.api.getAppState()
}
