import {
  getClientIndustriesResponse,
  getClientStaffOptionsResponse,
  getCountriesResponse,
  getGetParentCompaniesResponse,
  getUserVerticalsResponse,
  getVerticalsWithMatchersResponse
} from '~integration/mocks/responses'
import { getFlagsResponse } from '~integration/mocks/responses/talents/talent-list'
import { OperationValue } from '~integration/types'

export const clientFiltersStubs = (
  filtersData: Record<string, OperationValue> = {}
): {
  [key: string]: OperationValue
} => ({
  GetUserVerticals: getUserVerticalsResponse(),
  GetCountries: getCountriesResponse(),
  GetClientIndustries: getClientIndustriesResponse(),
  GetParentCompanies: getGetParentCompaniesResponse(),
  GetFlags: getFlagsResponse(),
  GetClientStaffOptions: getClientStaffOptionsResponse(),
  GetVerticalsWithMatchers: getVerticalsWithMatchersResponse(),
  ...filtersData
})
