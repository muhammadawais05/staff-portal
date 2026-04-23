import { createContext, useContext } from 'react'

import {
  PersistentFormOptions
} from '../components/PersistentFormProvider/PersistentFormProvider'

export interface PersistentFormContextProps {
  debounceLimit: number
  getForm: <T>(options: PersistentFormOptions) => T | undefined
  setForm: <T>(form: T, options: PersistentFormOptions) => void
  removeForm: (options: PersistentFormOptions) => void
  checkForm: (options: PersistentFormOptions) => boolean
  clearFormType: (localStorageKey: string) => void
  getFormKeys: (formName?: string) => string[]
}

export const PersistentFormContext = createContext<PersistentFormContextProps>({
  debounceLimit: 0,
  getForm: () => {
    throw new Error('getForm is not implemented')
  },
  setForm: () => {
    throw new Error('setForm is not implemented')
  },
  removeForm: () => {
    throw new Error('removeForm is not implemented')
  },
  checkForm: () => {
    throw new Error('checkForm is not implemented')
  },
  clearFormType: () => {
    throw new Error('clearFormType is not implemented')
  },
  getFormKeys: () => {
    throw new Error('getFormKeys is not implemented')
  }
})

export const usePersistentFormContext = () => useContext(PersistentFormContext)
