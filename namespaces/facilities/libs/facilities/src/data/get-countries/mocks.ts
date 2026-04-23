import { MockedResponse } from '@staff-portal/data-layer-service'

import { GetCountriesDocument } from './get-countries.staff.gql.types'
import { CountryFragment } from '../country-fragment'
import { createCountryFragment } from '../country-fragment/mocks'

export const createFailedGetCountriesMock = (): MockedResponse => ({
  request: { query: GetCountriesDocument },
  error: new Error('Failed request')
})

export const createSuccessfulGetCountriesMock = (
  countries?: Partial<CountryFragment>[]
): MockedResponse => {
  const nodes = countries?.map(country => createCountryFragment(country)) || [
    createCountryFragment()
  ]

  return {
    request: { query: GetCountriesDocument },
    result: {
      data: {
        countries: {
          nodes,
          __typename: 'CountryConnection'
        }
      }
    }
  }
}
