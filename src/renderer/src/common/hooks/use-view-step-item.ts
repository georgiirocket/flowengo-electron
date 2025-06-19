import { useEffect, useState } from 'react'
import type { IProjects } from '@common/stores/projects/types.ts'
import { UI_EVENTS } from '@shared/events'

export type ViewStepPayload = {
  projectId: string
  stepId: string
  item: IProjects['projects'][0]['steps'][0]['items'][0]
}

export const openViewStepItemModal = (payload: ViewStepPayload): void => {
  window.api.emit(UI_EVENTS.viewStepItem, payload)
}

export const useViewStepItemModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [payload, setPayload] = useState<ViewStepPayload | null>(null)

  const close = (): void => {
    setIsOpen(false)
    setPayload(null)
  }

  const getPayload = (): ViewStepPayload => {
    if (!payload) {
      throw new Error('Payload not found')
    }

    return payload
  }

  useEffect(() => {
    const unlisten = window.api.on<ViewStepPayload>(UI_EVENTS.viewStepItem, (data) => {
      setPayload(data)
      setIsOpen(true)
    })

    return () => {
      unlisten()
    }
  }, [])

  return { isOpen, close, getPayload }
}
