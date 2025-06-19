interface Response {
  error: string
}

export const clearAppData = async (): Promise<Response> => {
  const response: Response = { error: '' }

  try {
    await window.api.clearAppData()
  } catch (e) {
    response.error = (e as Error).message
  }

  return response
}
