import type { OutputBackend } from '@common/interfaces/input-backend'

interface Response {
  error: string
  data?: OutputBackend
}

export const getProtectedData = async (): Promise<Response> => {
  const response: Response = { error: '' }

  try {
    const { data } = await window.api.getProtectedData()

    response.data = data as OutputBackend
  } catch (e) {
    response.error = (e as Error).message
  }

  return response
}
