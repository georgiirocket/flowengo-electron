import { useEffect, useState } from 'react'
import type { IProjects } from '@common/stores/projects/types.ts'
import { UI_EVENTS } from '@shared/events'

export type EditStepPayload = {
  projectId: string
  stepId: string
  item: IProjects['projects'][0]['steps'][0]['items'][0]
}

export const openEditStepItemModal = (payload: EditStepPayload): void => {
  window.api.emit(UI_EVENTS.editStepItem, payload)
}

export const useEditStepItemModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [payload, setPayload] = useState<EditStepPayload | null>(null)

  const close = (): void => {
    setIsOpen(false)
    setPayload(null)
  }

  const getPayload = (): EditStepPayload => {
    if (!payload) {
      throw new Error('Payload not found')
    }

    return payload
  }

  useEffect(() => {
    const unlisten = window.api.on<EditStepPayload>(UI_EVENTS.editStepItem, (data) => {
      setIsOpen(false)
      setPayload(data)
    })

    return () => {
      unlisten()
    }
  }, [])

  return { isOpen, close, getPayload }
}
