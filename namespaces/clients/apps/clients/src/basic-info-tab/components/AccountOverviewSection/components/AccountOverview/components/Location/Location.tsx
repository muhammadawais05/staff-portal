import React, { useMemo } from 'react'
import {
  LocationInput,
  PatchClientProfileInput
} from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import {
  CountryFragment,
  EditableCountry,
  getCountriesHook
} from '@staff-portal/facilities'
import { NO_VALUE } from '@staff-portal/config'

import { getClientLocationHook } from '../../utils'
import { adjustLocation } from '../../utils/adjust-values'
import { SetPatchClientAccountOverviewDocument } from '../../../../data'
import { CompanyOverviewFragment } from '../../../../data/company-overview-fragment.staff.gql.types'

interface Props {
  editingDisabled: boolean
  country: CompanyOverviewFragment['country']
  city: CompanyOverviewFragment['city']
  clientId: string
}

const Location = ({ editingDisabled, country, city, clientId }: Props) => {
  const { id: countryId, name: countryName } = country || {}
  const useClientLocation = getClientLocationHook(clientId)
  const useGetCountriesLazy = getCountriesHook()

  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: SetPatchClientAccountOverviewDocument,
    initialValues: {
      location: {
        city,
        countryId: country?.id ?? ''
      }
    },
    requiredValues: { clientId }
  })

  const initialValues = useMemo(
    () => ({
      location: { countryId, cityName: city }
    }),
    [countryId, city]
  )

  const viewer = useMemo(() => {
    if (countryName) {
      return city ? `${city}, ${countryName}` : `${countryName}`
    }

    return NO_VALUE
  }, [city, countryName])

  return (
    <EditableField<PatchClientProfileInput, LocationInput, CountryFragment[]>
      disabled={editingDisabled}
      flex
      name='location'
      onChange={handleChange}
      queryValue={useClientLocation}
      queryOptions={useGetCountriesLazy}
      initialValues={initialValues}
      viewer={viewer}
      adjustValues={adjustLocation}
      editor={props => <EditableCountry {...props} />}
    />
  )
}

export default Location
