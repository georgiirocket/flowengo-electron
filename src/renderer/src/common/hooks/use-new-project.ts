import { useEffect, useState } from 'react'
import { UI_EVENTS } from '@shared/events'

export const openNewProjectModal = (): void => {
  window.api.emit(UI_EVENTS.newProject, {})
}

export const useNewProjectModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const unlisten = window.api.on(UI_EVENTS.newProject, () => {
      setIsOpen(false)
    })

    return () => {
      unlisten()
    }
  }, [])

  return { isOpen, setIsOpen }
}
