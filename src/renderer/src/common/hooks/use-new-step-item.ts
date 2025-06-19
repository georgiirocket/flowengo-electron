import { useEffect, useState } from 'react'
import { UI_EVENTS } from '@shared/events'

export type NewStepPayload = {
  projectId: string
  stepId: string
}

export const openNewStepItemModal = (payload: NewStepPayload): void => {
  window.api.emit(UI_EVENTS.newStepItem, payload)
}

export const useNewStepItemModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [payload, setPayload] = useState<NewStepPayload | null>(null)

  const close = (): void => {
    setIsOpen(false)
    setPayload(null)
  }

  const getPayload = (): NewStepPayload => {
    if (!payload) {
      throw new Error('Payload not found')
    }

    return payload
  }

  useEffect(() => {
    const unlisten = window.api.on<NewStepPayload>(UI_EVENTS.newStepItem, (data) => {
      setPayload(data)
      setIsOpen(true)
    })

    return () => {
      unlisten()
    }
  }, [])

  return { isOpen, close, getPayload }
}
