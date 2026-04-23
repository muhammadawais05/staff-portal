import { useCallback, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { TagSelectorProps, AutocompleteItem } from '@toptal/picasso'
import { DEBOUNCE_LIMIT } from '@staff-portal/config'

type UseTagSelectorProps = Pick<TagSelectorProps, 'options' | 'loading'> & {
  getOptions: (term: string) => void
}

const useTagSelector = ({
  options,
  getOptions,
  loading: loadingFromProps
}: UseTagSelectorProps): Pick<
  TagSelectorProps,
  'options' | 'loading' | 'inputValue' | 'onInputChange'
> => {
  const [updating, setUpdating] = useState(false)
  const loading = loadingFromProps || updating
  const [inputValue, setInputValue] = useState('')
  const [optionList, setOptionList] = useState(options)
  const [previousTerm, setPreviousTerm] = useState('')

  useEffect(() => {
    setOptionList(options)
  }, [options])

  const getOptionsDebounced = useDebouncedCallback((term: string) => {
    getOptions(term)

    /**
     * This condition and assignment is needed because the useEffect
     * is not triggered if the options have the same values (didn't change)
     */
    if (term === previousTerm) {
      setOptionList(options)
    }

    setPreviousTerm(term)
    setUpdating(false)
  }, DEBOUNCE_LIMIT)

  const handleOnInputChange = useCallback(
    (term = '') => {
      setUpdating(true)
      setInputValue(term)

      // reset options after typing something
      setOptionList(null)

      if (term.length) {
        getOptionsDebounced(term)
      } else {
        setUpdating(false)
      }
    },
    [getOptionsDebounced]
  )

  const prepareOptionList = (
    optionItems?: AutocompleteItem[] | null
  ): AutocompleteItem[] =>
    (optionItems || []).map((item: AutocompleteItem) => ({
      value: item.label as string,
      text: item.label as string,
      ...item
    }))

  return {
    options: inputValue && !loading ? prepareOptionList(optionList) : null,
    inputValue,
    loading,
    onInputChange: handleOnInputChange
  }
}

export default useTagSelector
