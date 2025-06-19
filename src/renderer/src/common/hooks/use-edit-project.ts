import { useEffect, useState } from 'react'
import type { IProjects } from '@common/stores/projects/types.ts'
import { UI_EVENTS } from '@shared/events'

type Payload = IProjects['projects'][0]

export const openEditProjectModal = (payload: Payload): void => {
  window.api.emit(UI_EVENTS.editProject, payload)
}

export const useEditProjectModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [payload, setPayload] = useState<Payload | null>(null)

  const close = (): void => {
    setIsOpen(false)
    setPayload(null)
  }

  const getPayload = (): Payload => {
    if (!payload) {
      throw new Error('Payload not found')
    }

    return payload
  }

  useEffect(() => {
    const unlisten = window.api.on<Payload>(UI_EVENTS.editProject, (data) => {
      setPayload(data)
      setIsOpen(true)
    })

    return () => {
      unlisten()
    }
  }, [])

  return { isOpen, close, getPayload }
}
