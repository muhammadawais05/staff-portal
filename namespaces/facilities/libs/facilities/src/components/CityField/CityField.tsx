import React, { useCallback, useRef, useEffect, useMemo } from 'react'
import { AutocompleteProps } from '@staff-portal/ui'
import { useForm, FieldWrapper, useField } from '@toptal/picasso-forms'
import {
  GoogleCityAutocomplete,
  GoogleCityAutocompleteMethods
} from '@staff-portal/google-maps'
import { usePrevious } from '@staff-portal/utils'

interface Props extends Omit<AutocompleteProps, 'value' | 'options'> {
  countryCode?: string
  countryIdFieldName?: string
  cityNameFieldName?: string
  cityFieldName?: string
  placeIdFieldName?: string
  label?: string
  value?: string
}

export const CityField = ({
  id,
  label,
  value = '',
  countryCode,
  countryIdFieldName = 'location.countryId',
  cityNameFieldName = 'location.cityName',
  cityFieldName = 'location.city',
  placeIdFieldName = 'location.placeId',
  required,
  disabled,
  width,
  'data-testid': testId = 'CityField'
}: Props) => {
  const googleCityInputRef = useRef<GoogleCityAutocompleteMethods>()
  const form = useForm()
  const {
    input: { value: countryId }
  } = useField<string>(countryIdFieldName)
  const {
    input: { value: cityName },
    meta: { invalid }
  } = useField<string>(cityNameFieldName)
  const cityValue = cityName || value || ''
  const previousCountryCode = usePrevious(countryCode)

  const onChange = useCallback(
    (displayName?: string, placeId?: string) => {
      form.change(countryIdFieldName, countryId)
      form.change(cityNameFieldName, displayName)
      form.change(cityFieldName, displayName)
      form.change(placeIdFieldName, placeId)
    },
    [
      form,
      countryId,
      countryIdFieldName,
      cityNameFieldName,
      cityFieldName,
      placeIdFieldName
    ]
  )

  // When the countryCode is changed, we want to reset the city field
  // And we need to prevent it from changing after initial render
  // when previousCountryCode has the first value of countryCode
  useEffect(() => {
    const currentCityRef = googleCityInputRef.current

    if (previousCountryCode && previousCountryCode !== countryCode) {
      form.change(cityNameFieldName, undefined)
      form.change(cityFieldName, undefined)
      form.change(placeIdFieldName, undefined)
      currentCityRef?.reset()
    }
  }, [
    previousCountryCode,
    countryCode,
    form,
    cityNameFieldName,
    cityFieldName,
    placeIdFieldName
  ])

  const googleAPIParams = useMemo(
    () =>
      countryCode ? { componentRestrictions: { country: countryCode } } : {},
    [countryCode]
  )

  const placeholder = !countryCode
    ? 'Please select country first'
    : 'Start typing city name'

  return (
    <FieldWrapper
      id={id}
      name={cityNameFieldName}
      label={label}
      required={required}
    >
      {({ id: inputId, name }: AutocompleteProps) => (
        <GoogleCityAutocomplete
          inputProps={{ id: inputId, name }}
          data-testid={`${testId}-input`}
          ref={googleCityInputRef}
          defaultValue={cityValue}
          onChange={onChange}
          placeholder={placeholder}
          googleAPIParams={googleAPIParams}
          disabled={!countryCode || disabled}
          width={width}
          error={invalid}
        />
      )}
    </FieldWrapper>
  )
}

export default CityField
