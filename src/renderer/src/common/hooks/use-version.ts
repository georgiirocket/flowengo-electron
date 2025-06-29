import { useEffect, useState } from 'react'

export const useVersion = () => {
  const [version, setVersion] = useState<string>('')

  useEffect(() => {
    window.api
      .getAppVersion()
      .then(setVersion)
      .catch((err) => {
        console.error('Getting app version failed', err)
      })
  }, [])

  return { version }
}
