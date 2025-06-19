interface Response {
  error: string
}

export const saveProtectedData = async (data: unknown): Promise<Response> => {
  const response: Response = { error: '' }

  try {
    await window.api.saveProtectedData(data)
  } catch (e) {
    response.error = (e as Error).message
  }

  return response
}
