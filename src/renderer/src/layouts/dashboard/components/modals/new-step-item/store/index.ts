import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { IProjects } from '@common/stores/projects/types.ts'
import { v4 } from 'uuid'
import { COLORS } from '@common/constants/colors'
import { NewStepPayload } from '@common/hooks/use-new-step-item'

export interface NewStepStore extends NewStepPayload {
  item: IProjects['projects'][0]['steps'][0]['items'][0]
}

export interface Store extends NewStepStore {
  setTitle(text: string): void
  setDescription(text: string): void
  setColor(color: COLORS): void
  getStoreResult(): Pick<NewStepStore, 'projectId' | 'stepId' | 'item'>
}

export const createNewStepItemStore = (init: NewStepPayload) => {
  return create<Store>()(
    immer<Store>((set, get) => ({
      projectId: init.projectId,
      stepId: init.stepId,
      item: {
        id: v4(),
        title: '',
        description: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        color: COLORS.zic
      },

      setTitle(text) {
        set((state) => {
          state.item.title = text
        })
      },

      setDescription(json) {
        set((state) => {
          state.item.description = json
        })
      },

      setColor(color) {
        set((state) => {
          state.item.color = color
        })
      },

      getStoreResult() {
        const { projectId, stepId, item } = get()

        return {
          projectId,
          stepId,
          item: {
            ...item,
            title: item.title.length ? item.title : 'New task',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        }
      }
    }))
  )
}
