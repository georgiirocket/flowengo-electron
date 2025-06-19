'use client'

import { type StoreApi, useStore } from 'zustand'
import { type Store, createNewStepItemStore } from '../store'
import { createContext, type FC, type PropsWithChildren, useContext, useRef } from 'react'

type TypeStore = Store
const createStoreFn = createNewStepItemStore

export interface IContext {
  store: StoreApi<TypeStore>
}

const Context = createContext<IContext>(undefined!)

type InitProps = { data: Parameters<typeof createStoreFn>[0] }

const Provider: FC<PropsWithChildren<InitProps>> = ({ children, data }) => {
  const storeRef = useRef<StoreApi<TypeStore>>(undefined)

  if (!storeRef.current) {
    storeRef.current = createStoreFn(data)
  }

  return <Context.Provider value={{ store: storeRef.current }}>{children}</Context.Provider>
}

/**
 * Use context (store)
 */
const useContextStore = <T,>(selector: (state: TypeStore) => T): T => {
  const { store } = useContext(Context)

  return useStore(store as StoreApi<TypeStore>, selector)
}

export const NewStepItemProvider = Provider
export const useNewStepItemCtxStore = useContextStore
