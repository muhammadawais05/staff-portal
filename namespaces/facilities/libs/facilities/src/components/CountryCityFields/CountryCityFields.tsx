import React, { useMemo } from 'react'
import { Form, useField } from '@toptal/picasso-forms'
import { GridItemField } from '@staff-portal/ui'

import { CountryFragment } from '../../data'
import CityField from '../CityField'

type Props = {
  countries: CountryFragment[] | undefined
  name?: string
  required?: boolean
  cityRequired?: boolean
  loading?: boolean
  error?: boolean
  disabled?: boolean
  limit?: number
  placeholder?: string
  'data-testid'?: string
  countryFieldLabel?: string
  cityFieldLabel?: string
  cityNameFieldName?: string
  cityFieldName?: string
  placeIdFieldName?: string
  variant?: 'default' | 'grid'
}

const CountryCityFields = ({
  countries = [],
  name = 'location.countryId',
  error,
  placeholder,
  required = true,
  cityRequired,
  loading,
  disabled,
  limit,
  'data-testid': testId = 'CountryCityFields',
  countryFieldLabel = 'Country',
  cityFieldLabel = 'City',
  cityNameFieldName,
  cityFieldName,
  placeIdFieldName,
  variant = 'default'
}: Props) => {
  const {
    input: { value: currentCountryId }
  } = useField<string | undefined>(name)

  const countryCode = useMemo(
    () => countries?.find(country => country.id === currentCountryId)?.code,
    [countries, currentCountryId]
  )

  const countryOptions = useMemo(
    () =>
      countries?.map(({ name: countryName, id }) => ({
        value: id,
        text: countryName
      })),
    [countries]
  )

  if (variant === 'grid') {
    return (
      <>
        <GridItemField
          label={countryFieldLabel}
          labelFor={name}
          required={required}
          disabled={loading || disabled}
        >
          <Form.Select
            enableReset
            error={error}
            placeholder={placeholder}
            required={required}
            id={name}
            name={name}
            disabled={loading || disabled}
            width='full'
            options={countryOptions}
            limit={limit}
            data-testid={`${testId}-input-country`}
          />
        </GridItemField>

        <GridItemField
          label={cityFieldLabel}
          required={cityRequired}
          labelFor={cityNameFieldName}
          disabled={disabled}
        >
          <CityField
            countryCode={countryCode}
            countryIdFieldName={name}
            id={cityNameFieldName}
            cityNameFieldName={cityNameFieldName}
            cityFieldName={cityFieldName}
            placeIdFieldName={placeIdFieldName}
            required={cityRequired}
            disabled={disabled}
            data-testid={`${testId}-input-city`}
          />
        </GridItemField>
      </>
    )
  }

  return (
    <>
      <Form.Select
        enableReset
        error={error}
        placeholder={placeholder}
        required={required}
        name={name}
        disabled={loading || disabled}
        label={countryFieldLabel}
        width='full'
        options={countryOptions}
        limit={limit}
        data-testid={`${testId}-input-country`}
      />
      <CityField
        label={cityFieldLabel}
        countryCode={countryCode}
        countryIdFieldName={name}
        cityNameFieldName={cityNameFieldName}
        cityFieldName={cityFieldName}
        placeIdFieldName={placeIdFieldName}
        required={cityRequired}
        disabled={disabled}
        data-testid={`${testId}-input-city`}
      />
    </>
  )
}

export default CountryCityFields
