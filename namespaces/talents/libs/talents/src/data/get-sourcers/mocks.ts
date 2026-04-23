import { MockedResponse } from '@staff-portal/data-layer-service'
import { mapToTypename } from '@staff-portal/test-utils'

import { GET_SOURCERS } from './get-sourcers.staff.gql'
import {
  SourcerFragment,
  GetSourcersQueryVariables
} from './get-sourcers.staff.gql.types'

export const createGetSourcersMock = (
  sourcers: SourcerFragment[],
  variables?: GetSourcersQueryVariables
): MockedResponse => ({
  request: { query: GET_SOURCERS, variables },
  result: {
    data: {
      roles: {
        nodes: mapToTypename(sourcers, 'Staff'),
        __typename: 'StaffConnection'
      }
    }
  }
})

export const createGetSourcersFailedMock = (
  variables?: GetSourcersQueryVariables
) => ({
  request: { query: GET_SOURCERS, variables },
  error: new Error('Error occurred')
})
