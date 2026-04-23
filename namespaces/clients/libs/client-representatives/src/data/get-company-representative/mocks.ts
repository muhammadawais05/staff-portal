import {
  encodeEntityId,
  MockedResponse
} from '@staff-portal/data-layer-service'

import { createRepresentativeFragmentMock } from '../representative-fragment/mocks'
import { RepresentativeFragment } from '../representative-fragment/representative-fragment.staff.gql.types'
import { GET_COMPANY_REPRESENTATIVE } from './get-company-representative.staff.gql'
import {
  GetCompanyRepresentativeQuery as QueryType,
  GetCompanyRepresentativeQueryVariables as QueryVariables
} from './get-company-representative.staff.gql.types'

const createGetCompanyRepresentativeQueryMock = (
  representativeId = 'mock-rep-id',
  partialRep?: Partial<RepresentativeFragment>
): QueryType => {
  const mockedFullRep = createRepresentativeFragmentMock(representativeId, {
    ...partialRep
  })

  return {
    staffNode: {
      ...mockedFullRep
    }
  }
}

export const createGetCompanyRepresentativeMock = (
  representativeId = 'mock-rep-id',
  partialRep?: Partial<RepresentativeFragment>
): MockedResponse => {
  const encodedRepId = encodeEntityId(representativeId, 'CompanyRepresentative')

  return {
    request: {
      query: GET_COMPANY_REPRESENTATIVE,
      variables: {
        representativeId: encodedRepId
      } as QueryVariables
    },
    result: {
      data: createGetCompanyRepresentativeQueryMock(
        representativeId,
        partialRep
      )
    }
  }
}

export const createGetCompanyRepresentativeFailedMock = (
  representativeId = 'mock-rep-id',
  errorMessage?: string
): MockedResponse => {
  const encodedRepId = encodeEntityId(representativeId, 'CompanyRepresentative')

  return {
    request: {
      query: GET_COMPANY_REPRESENTATIVE,
      variables: { representativeId: encodedRepId } as QueryVariables
    },
    error: new Error(errorMessage)
  }
}
