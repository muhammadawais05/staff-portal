import { Item as AutocompleteItem } from '@toptal/picasso/Autocomplete'
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState
} from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { toTitleCase } from '@toptal/picasso/utils'
import { Autocomplete, AutocompleteProps } from '@staff-portal/ui'

import { getCityOptionsFromGoogleMaps } from '../../services'

export interface Props
  extends Pick<
    AutocompleteProps,
    | 'id'
    | 'width'
    | 'placeholder'
    | 'noOptionsText'
    | 'data-testid'
    | 'disabled'
    | 'inputProps'
    | 'error'
  > {
  googleAPIParams?: Omit<google.maps.places.AutocompletionRequest, 'input'>
  defaultValue?: string
  onChange: (displayName?: string, placeId?: string) => void
  onBlur?: () => void
}

const getDisplayValue = (item: AutocompleteItem | null) =>
  toTitleCase(item?.text ?? '') as string

export const GoogleCityAutocomplete = forwardRef(
  (
    {
      id,
      placeholder,
      width = 'full',
      noOptionsText = 'No results found',
      defaultValue,
      googleAPIParams,
      onChange,
      onBlur,
      inputProps,
      'data-testid': dataTestId,
      disabled = false,
      error
    }: Props,
    ref
  ) => {
    const [value, setValue] = useState(defaultValue || '')
    const [options, setOptions] = useState<AutocompleteItem[] | null>(null)

    useImperativeHandle(ref, () => ({
      reset: () => {
        setValue('')
        setOptions(null)
      },
      currentInputValue: value
    }))

    const updateOptions = useDebouncedCallback(
      async ({ input }: { input: string }) => {
        try {
          const cityOptions = await getCityOptionsFromGoogleMaps({
            input,
            ...googleAPIParams
          })

          setOptions(cityOptions)
        } catch {
          setOptions([])
        }
      },
      50
    )

    const handleChange = useCallback(
      (newValue: string, { isSelected }: { isSelected: boolean }) => {
        if (isSelected) {
          return
        }
        if (!newValue) {
          setValue('')
          setOptions(null)
          onChange()

          return
        }

        setValue(newValue)
        updateOptions({ input: newValue })
      },
      [updateOptions, onChange]
    )

    const handleSelect = useCallback(
      async (item: AutocompleteItem) => {
        if (!item) {
          return
        }
        const { text, value: selectedValue } = item

        setValue(text || '')

        setOptions(null)

        onChange(text, selectedValue as string)
      },

      [onChange]
    )

    const handleBlur = useCallback(() => {
      if (options?.length) {
        handleSelect(options[0])
      }

      onBlur?.()
    }, [options, onBlur, handleSelect])

    return (
      <Autocomplete
        id={id}
        testIds={{
          input: dataTestId
        }}
        inputProps={inputProps}
        width={width}
        autoComplete='none'
        placeholder={placeholder}
        noOptionsText={noOptionsText}
        options={options}
        onChange={handleChange}
        onSelect={handleSelect}
        onBlur={handleBlur}
        value={value}
        disabled={disabled}
        getDisplayValue={getDisplayValue}
        error={error}
        poweredByGoogle
      />
    )
  }
)
