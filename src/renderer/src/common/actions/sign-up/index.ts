import { AppState } from '@shared/app-state'

interface SignUpRequest {
  username: string
  password: string
}

export interface CreateAccountResponse {
  error: string
  data?: AppState
}

export const signUp = async (input: SignUpRequest): Promise<CreateAccountResponse> => {
  const response: CreateAccountResponse = { error: '' }

  try {
    response.data = await window.api.signUp(input.username, input.password)
  } catch (e) {
    response.error = (e as Error).message
  }

  return response
}
