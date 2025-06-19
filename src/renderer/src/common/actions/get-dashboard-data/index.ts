import type { OutputBackend } from '@common/interfaces/input-backend'
import { AppState } from '@shared/app-state'

interface Response {
  error: string
  data?: OutputBackend
  appState?: AppState
}

export const getDashboardData = async (): Promise<Response> => {
  const response: Response = { error: '' }

  try {
    const [{ data }, appState] = await Promise.all([
      window.api.getProtectedData(),
      window.api.getAppState()
    ])

    response.data = data as OutputBackend
    response.appState = appState
  } catch (e) {
    response.error = (e as Error).message
  }

  return response
}
