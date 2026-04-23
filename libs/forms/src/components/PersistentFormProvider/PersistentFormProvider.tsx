import React, { ReactNode, useCallback, useState } from 'react'

import { PersistentFormContext } from '../../contexts'
import { useFormStorage } from '../../hooks'
import { getFormStoreKey } from '../../utils'

type FormStore = { [key: string]: unknown }

export type PersistentFormOptions = {
  nodeId: string
  formName?: string
  localStorageKey?: string
}

const DEFAULT_FORM_NAME = 'default'

export interface Props {
  debounceLimit: number
  children?: ReactNode
}

const PersistentFormProvider = ({
  children,
  debounceLimit
}: Props) => {
  const [store, setStore] = useState<FormStore>({})
  const {
    getForm: getFormFromStorage,
    setForm: setFormInStorage,
    removeForm: removeFormFromStorage,
    getFormType,
    clearFormType
  } = useFormStorage()

  const getForm = useCallback(
    <T extends {}>({
      nodeId,
      formName = DEFAULT_FORM_NAME,
      localStorageKey
    }: PersistentFormOptions): T | undefined => {
      const key = getFormStoreKey(nodeId, formName)

      let form = store[key] as T | undefined

      if (!form && localStorageKey) {
        form = getFormFromStorage<T>({
          key: localStorageKey,
          formName
        })
      }

      return form
    },
    [getFormFromStorage, store]
  )

  const setForm = useCallback(
    <T extends {}>(
      form: T,
      {
        nodeId,
        formName = DEFAULT_FORM_NAME,
        localStorageKey
      }: PersistentFormOptions
    ) => {
      const key = getFormStoreKey(nodeId, formName)

      setStore(currentStore => ({ ...currentStore, [key]: form }))

      if (localStorageKey) {
        setFormInStorage(form, { key: localStorageKey, formName })
      }
    },
    [setFormInStorage]
  )

  const removeForm = useCallback(
    ({
      nodeId,
      formName = DEFAULT_FORM_NAME,
      localStorageKey
    }: PersistentFormOptions) => {
      const key = getFormStoreKey(nodeId, formName)

      setStore(currentStore => ({ ...currentStore, [key]: undefined }))

      if (localStorageKey) {
        removeFormFromStorage({ key: localStorageKey, formName })
      }
    },
    [removeFormFromStorage]
  )

  const checkForm = useCallback(
    ({
      nodeId,
      formName = DEFAULT_FORM_NAME,
      localStorageKey
    }: PersistentFormOptions) => {
      const key = getFormStoreKey(nodeId, formName)

      if (localStorageKey) {
        const formType = getFormType(localStorageKey)

        return formType === formName
      }

      return Boolean(store[key])
    },
    [getFormType, store]
  )

  const getFormKeys = useCallback(
    (formName: string = DEFAULT_FORM_NAME) => {
      const keys = Object.keys(store)

      const formNameReplaced = `__${formName}`

      return keys
        .filter(key => Boolean(store[key]))
        .map(key => key.replace(formNameReplaced, ''))
    },
    [store]
  )

  return (
    <PersistentFormContext.Provider
      value={{
        debounceLimit,
        getForm,
        setForm,
        removeForm,
        checkForm,
        clearFormType,
        getFormKeys
      }}
    >
      {children}
    </PersistentFormContext.Provider>
  )
}

export default PersistentFormProvider
