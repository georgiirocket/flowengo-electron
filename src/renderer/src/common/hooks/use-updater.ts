import { useEffect } from 'react'
import { UI_EVENTS } from '@shared/events'
import { addToast } from '@heroui/react'

export const useUpdater = (): void => {
  useEffect(() => {
    const unlistenAvailable = window.api.on(UI_EVENTS.updateAvailable, () => {
      addToast({
        title: 'Flowengo',
        description: 'Update available. It will download in the background.',
        hideIcon: true
      })
    })

    const unlistenDownload = window.api.on(UI_EVENTS.updateDownloaded, () => {
      addToast({
        title: 'Flowengo',
        description: 'Update ready! Will install on next restart.',
        hideIcon: true
      })
    })

    return () => {
      unlistenAvailable()
      unlistenDownload()
    }
  }, [])
}
