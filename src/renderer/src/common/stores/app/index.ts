import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { AppState } from '@shared/app-state'

export interface AppStore extends AppState {}

export interface Store extends AppStore {
  setAppData(data: AppState): void
  clear(): void
}

export const createAppStore = (initData: AppState) => {
  return create<Store>()(
    immer<Store>((set) => ({
      isInitialized: initData.isInitialized,
      userName: initData.userName,
      createDate: initData.createDate,

      /**
       * Set app data
       * @param data
       */
      setAppData: (data) => {
        set((state) => {
          state.isInitialized = data.isInitialized
          state.userName = data.userName
          state.createDate = data.createDate
        })
      },

      clear: () => {
        set((state) => {
          state.isInitialized = false
          state.userName = ''
          state.createDate = ''
        })
      }
    }))
  )
}
