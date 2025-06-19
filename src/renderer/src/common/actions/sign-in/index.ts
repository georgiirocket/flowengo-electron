import { AppState } from '@shared/app-state'

export interface SignInResponse {
  error: string
  data?: AppState
}

export const signIn = async (password: string): Promise<SignInResponse> => {
  const response: SignInResponse = { error: '' }

  try {
    response.data = await window.api.signIn(password)
  } catch (e) {
    response.error = (e as Error).message
  }

  return response
}
