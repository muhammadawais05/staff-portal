import { FieldWrapper, useField, useForm } from '@toptal/picasso-forms'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import {
  GoogleCityAutocomplete,
  GoogleCityAutocompleteMethods
} from '@staff-portal/google-maps'
import { AutocompleteProps } from '@staff-portal/ui'
import { CountryFragment } from '@staff-portal/facilities'

import { FormValues } from '../../types'

const cityPlaceIdFieldName = 'city[placeId]'

interface Props {
  defaultValue?: string | null
  countries: CountryFragment[]
  currentCountryId: string
}

const ConvertToSourcingFlowCity = ({
  defaultValue,
  countries,
  currentCountryId
}: Props) => {
  const googleCityInputRef = useRef<GoogleCityAutocompleteMethods>()
  const {
    input: { value: cityPlaceId },
    meta: { invalid: invalidCityPlaceId }
  } = useField<string>(cityPlaceIdFieldName)
  const form = useForm<FormValues>()
  const { change } = form
  const {
    values: { city }
  } = form.getState()

  const onChange = useCallback(
    (displayName = '', placeId = '') => {
      change('city', { name: displayName, placeId })
    },
    [change]
  )
  const handleOnBlur = useCallback(() => {
    if (googleCityInputRef.current?.currentInputValue !== city.name) {
      change('city', { name: city.name, placeId: '' })
    }
  }, [change, city])

  const firstUpdate = useRef(true)

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
    } else {
      change('city', { name: '', placeId: '' })
      googleCityInputRef.current?.reset()
    }
  }, [change, currentCountryId])

  const countryCode = useMemo(
    () => countries.find(country => country.id === currentCountryId)?.code,
    [countries, currentCountryId]
  )

  const googleAPIParams = countryCode
    ? {
        componentRestrictions: { country: countryCode }
      }
    : {}

  const placeholder = !currentCountryId
    ? 'Please select country first'
    : 'Start typing city name'

  return (
    <FieldWrapper name={cityPlaceIdFieldName} label='City' required>
      {({ id: inputId, name: inputName }: AutocompleteProps) => (
        <GoogleCityAutocomplete
          inputProps={{ id: inputId, name: inputName }}
          ref={googleCityInputRef}
          data-testid='convert-to-sourcing-flow-city'
          defaultValue={defaultValue ?? ''}
          disabled={!currentCountryId}
          onChange={onChange}
          onBlur={handleOnBlur}
          placeholder={placeholder}
          googleAPIParams={googleAPIParams}
          error={invalidCityPlaceId && !cityPlaceId}
        />
      )}
    </FieldWrapper>
  )
}

export default ConvertToSourcingFlowCity
