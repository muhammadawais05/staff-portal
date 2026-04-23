import React, { useMemo, useCallback } from 'react'
import { JobWorkType } from '@staff-portal/graphql/staff'
import { Form, useField, useForm } from '@toptal/picasso-forms'
import { useNotifications } from '@staff-portal/error-handling'
import { useGetCountries, CityField } from '@staff-portal/facilities'
import { GridItemField } from '@staff-portal/ui'

import { JobEditFormValues } from '../../../../types'
import {
  LOCATION_CITY_NAME_FIELD,
  LOCATION_COUNTRY_ID_FIELD,
  WORK_TYPE_FIELD,
  TIMEZONE_FIELD
} from '../../../../config'

const OnSiteCountryAndCitySelect = () => {
  const { showError } = useNotifications()
  const { change } = useForm<JobEditFormValues>()
  const {
    input: { value: workType }
  } = useField<JobEditFormValues[typeof WORK_TYPE_FIELD]>(WORK_TYPE_FIELD)
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

  const isOnsiteOrMixed =
    workType && [JobWorkType.ONSITE, JobWorkType.MIXED].includes(workType)

  if (!isOnsiteOrMixed) {
    return null
  }

  return (
    <>
      <GridItemField
        label='Onsite Country'
        labelFor={LOCATION_COUNTRY_ID_FIELD}
        size='medium'
      >
        <Form.Select
          enableReset
          name={LOCATION_COUNTRY_ID_FIELD}
          options={countriesOptions}
          onChange={handleOnChange}
          width='full'
        />
      </GridItemField>
      <GridItemField
        label='Onsite City'
        labelFor={LOCATION_CITY_NAME_FIELD}
        size='medium'
        required={!!countryCode}
      >
        <CityField
          id={LOCATION_CITY_NAME_FIELD}
          countryCode={countryCode}
          width='full'
          required={!!countryCode}
        />
      </GridItemField>
    </>
  )
}

export default OnSiteCountryAndCitySelect
