import React from 'react'
import { useGetCountries, CountryCityFields } from '@staff-portal/facilities'

const CloneJobLocationField = () => {
  const { countries, loading } = useGetCountries()

  return (
    <CountryCityFields
      countryFieldLabel='Onsite Country'
      cityFieldLabel='Onsite City'
      countries={countries}
      loading={loading}
    />
  )
}

export default CloneJobLocationField
