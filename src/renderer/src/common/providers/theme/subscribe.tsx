import { FC, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { UI_EVENTS } from '@shared/events'

const Subscribe: FC = () => {
  const themeProps = useTheme()

  useEffect(() => {
    window.api.emit(UI_EVENTS.theme, { theme: themeProps.theme })
  }, [themeProps.theme])

  return null
}

export default Subscribe
