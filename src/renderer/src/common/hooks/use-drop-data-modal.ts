import { useEffect, useState } from 'react'
import { EVENTS } from '@shared/events'

export const openRemoveDataModal = (): void => {
  window.api.emit(EVENTS.dropData, {})
}

export const useDropDataModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const unSubscribe = window.api.on(EVENTS.dropData, () => setIsOpen(true))

    return () => {
      unSubscribe()
    }
  }, [])

  return { isOpen, setIsOpen }
}
