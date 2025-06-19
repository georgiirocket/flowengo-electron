import { useEffect, useState } from 'react'
import { UI_EVENTS } from '@shared/events'

export const openUserModal = (): void => {
  window.api.emit(UI_EVENTS.userModal, {})
}

export const useUserModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const unlisten = window.api.on(UI_EVENTS.userModal, () => {
      setIsOpen(true)
    })

    return () => {
      unlisten()
    }
  }, [])

  return { isOpen, setIsOpen }
}
