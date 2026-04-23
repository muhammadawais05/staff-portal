import { useCallback } from 'react'
import { localStorageService } from '@staff-portal/local-storage-service'

type FormStorageOptions = {
  key: string
  formName: string
}

type FormStorageDataType<T> = {
  [key in string]: T
}

export type FormStorageType<T> = {
  data: Partial<FormStorageDataType<T>>
  formType?: string | undefined
}

export const useFormStorage = () => {
  const setForm = useCallback(
    <T>(value: T, { key, formName }: FormStorageOptions) => {
      if (!key) {
        return
      }

      let item = localStorageService.getItem(key) as FormStorageType<T>

      item = {
        formType: formName,
        data: {
          ...item?.data,
          [formName]: value
        }
      }

      localStorageService.setItem(key, item)
    },
    []
  )

  const getForm = useCallback(
    <T>({ key, formName }: FormStorageOptions): T | undefined => {
      if (!key) {
        return undefined
      }

      const item = localStorageService.getItem(key) as FormStorageType<T>

      if (!item) {
        return undefined
      }

      if (formName in item.data) {
        return item.data[formName]
      }

      return undefined
    },
    []
  )

  const getFormType = useCallback(<T>(key: string) => {
    if (!key) {
      return undefined
    }

    const item = localStorageService.getItem(key) as FormStorageType<T>

    if (!item) {
      return undefined
    }

    return item.formType
  }, [])

  const clearFormType = useCallback(<T>(key: string) => {
    if (!key) {
      return
    }

    const item = localStorageService.getItem(key) as FormStorageType<T>

    if (item) {
      localStorageService.setItem(key, { ...item, formType: undefined })
    }
  }, [])

  const removeForm = useCallback(<T>({ key, formName }: FormStorageOptions) => {
    if (!key) {
      return
    }

    const item = localStorageService.getItem(key) as FormStorageType<T>

    if (item) {
      delete item.data[formName]

      if (Object.keys(item.data).length === 0) {
        localStorageService.removeItem(key)
      } else {
        localStorageService.setItem(key, { ...item, formType: undefined })
      }
    }
  }, [])

  return { getForm, getFormType, setForm, clearFormType, removeForm }
}
