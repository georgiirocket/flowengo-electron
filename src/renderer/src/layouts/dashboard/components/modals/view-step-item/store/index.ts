import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { IProjects } from '@common/stores/projects/types.ts'
import { ViewStepPayload } from '@common/hooks/use-view-step-item'
import { EditStepPayload } from '@common/hooks/use-edit-step-item'

export interface ViewStepStore extends ViewStepPayload {
  item: IProjects['projects'][0]['steps'][0]['items'][0]
}

export interface Store extends ViewStepStore {
  getStoreResult(): Pick<ViewStepStore, 'projectId' | 'stepId' | 'item'>
}

export const createViewStepItemStore = (init: EditStepPayload) => {
  return create<Store>()(
    immer<Store>((_, get) => ({
      projectId: init.projectId,
      stepId: init.stepId,
      item: init.item,

      getStoreResult() {
        const { projectId, stepId, item } = get()

        return {
          projectId,
          stepId,
          item: {
            ...item,
            title: item.title.length ? item.title : 'New task',
            updatedAt: new Date().toISOString()
          }
        }
      }
    }))
  )
}
