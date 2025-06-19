import { useEffect, useState } from 'react'
import { UI_EVENTS } from '@shared/events'

export const openRemoveDataModal = (): void => {
  window.api.emit(UI_EVENTS.clearAppDataModal, {})
}

export const useDropDataModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const unSubscribe = window.api.on(UI_EVENTS.clearAppDataModal, () => setIsOpen(true))

    return () => {
      unSubscribe()
    }
  }, [])

  return { isOpen, setIsOpen }
}
