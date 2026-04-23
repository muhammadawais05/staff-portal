import React, { useMemo, useCallback } from 'react'
import { Form, useField, useForm } from '@toptal/picasso-forms'
import { useNotifications } from '@staff-portal/error-handling'
import { useGetCountries, CityField } from '@staff-portal/facilities'
import { GridItemField } from '@staff-portal/ui'
import { FormTimeZoneSelect } from '@staff-portal/forms'
import { NOT_SELECTED_PLACEHOLDER } from '@staff-portal/config'

import {
  LOCATION_COUNTRY_ID_FIELD,
  TIMEZONE_FIELD,
  LOCATION_CITY_NAME_FIELD,
  CITIZENSHIP_FIELD
} from './constants'

export interface Props {
  talentTimezone?: string
  required?: boolean
}

const TalentLocationFields = ({ talentTimezone, required }: Props) => {
  const { showError } = useNotifications()
  const { change } = useForm()
  const {
    input: { value: countryId }
  } = useField(LOCATION_COUNTRY_ID_FIELD)

  const { countries } = useGetCountries({
    onError: () => {
      showError('Unable to load countries.')
    }
  })

  const handleOnChange = useCallback(
    ({ target: { value: selectedCountryId } }) => {
      const defaultTimeZone = countries?.find(
        country => country.id === selectedCountryId
      )?.defaultTimeZone?.value

      if (defaultTimeZone) {
        change(TIMEZONE_FIELD, defaultTimeZone)
      }
    },
    [change, countries]
  )

  const countriesOptions = useMemo(
    () =>
      countries?.map(country => ({
        text: country.name,
        value: country.id
      })) ?? [],
    [countries]
  )

  const countryCode = useMemo(
    () => countries?.find(country => country.id === countryId)?.code,
    [countries, countryId]
  )

  return (
    <>
      <GridItemField
        label='Current Country'
        labelFor={LOCATION_COUNTRY_ID_FIELD}
        required={required}
      >
        <Form.Select
          name={LOCATION_COUNTRY_ID_FIELD}
          options={countriesOptions}
          onChange={handleOnChange}
          enableReset
          width='full'
          required={required}
        />
      </GridItemField>
      <GridItemField
        label='Current City'
        labelFor={LOCATION_CITY_NAME_FIELD}
        required={required}
      >
        <CityField
          id={LOCATION_CITY_NAME_FIELD}
          countryCode={countryCode}
          width='full'
          required={required}
        />
      </GridItemField>
      <GridItemField
        label='Time Zone'
        labelFor={TIMEZONE_FIELD}
        required={!!talentTimezone}
      >
        <FormTimeZoneSelect
          id={TIMEZONE_FIELD}
          name={TIMEZONE_FIELD}
          width='full'
          placeholder={NOT_SELECTED_PLACEHOLDER}
          enableReset={!talentTimezone}
          required={!!talentTimezone}
        />
      </GridItemField>
      <GridItemField
        label='Citizenship'
        labelFor={CITIZENSHIP_FIELD}
        required={required}
      >
        <Form.Select
          name={CITIZENSHIP_FIELD}
          options={countriesOptions}
          width='full'
          enableReset
          required={required}
        />
      </GridItemField>
    </>
  )
}

export default TalentLocationFields
