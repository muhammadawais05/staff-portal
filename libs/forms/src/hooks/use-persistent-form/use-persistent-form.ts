import { useCallback, useEffect } from 'react'
import { useForm } from '@toptal/picasso-forms'
import { useDebouncedCallback } from 'use-debounce'

import { usePersistentFormContext } from '../../contexts'
import { PersistentFormOptions } from '../../components/PersistentFormProvider/PersistentFormProvider'

const DEFAULT_FORM_NAME = 'default'

export const usePersistentForm = <T>({
  nodeId,
  formName = DEFAULT_FORM_NAME,
  localStorageKey
}: PersistentFormOptions) => {
  const { subscribe } = useForm<T>()
  const { setForm, debounceLimit } = usePersistentFormContext()

  const handleSetForm = useCallback(
    (values: T) => {
      setForm(values, { nodeId, formName, localStorageKey })
    },
    [localStorageKey, nodeId, formName, setForm]
  )

  const setFormDebounced = useDebouncedCallback(handleSetForm, debounceLimit)

  useEffect(
    () =>
      subscribe(
        ({ values }) => {
          setFormDebounced(values)
        },
        { values: true }
      ),
    [setFormDebounced, subscribe]
  )
}
