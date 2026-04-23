import { MockedResponse } from '@staff-portal/data-layer-service'
import { mapToTypename } from '@staff-portal/test-utils'

import { GET_CLAIMERS } from './get-claimers.staff.gql'
import { GetClaimersQueryVariables } from './get-claimers.staff.gql.types'
import { ClaimerFragment } from '../claimer-fragment'

export const createGetClaimersMock = (
  claimers: ClaimerFragment[],
  variables?: GetClaimersQueryVariables
): MockedResponse => ({
  request: { query: GET_CLAIMERS, variables },
  result: {
    data: {
      roles: {
        nodes: mapToTypename(claimers, 'Staff'),
        __typename: 'StaffConnection'
      }
    }
  }
})
