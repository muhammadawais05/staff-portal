import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'

import {
  POLL_CLAIMABLE_CLIENTS,
  POLL_CLAIMABLE_CLIENTS_QUERY_VARIABLES
} from './poll-claimable-clients.staff.gql'
import { NewLeadFragment } from './poll-claimable-clients.staff.gql.types'

const createNewLeadFragment = (
  partialNewLeadFragment: Partial<NewLeadFragment>
) => {
  return {
    id: 'VjEtQ2xpZW50LTQxMDgxMA',
    claimableSince: new Date().toISOString(),
    ...partialNewLeadFragment,
    operations: {
      createClientClaimer: {
        callable: OperationCallableTypes.ENABLED,
        ...partialNewLeadFragment.operations?.createClientClaimer,
        __typename: 'Operation'
      },
      __typename: 'ClientOperations'
    },
    __typename: 'Client'
  } as NewLeadFragment
}

export const createPollClaimableClientsMock = (
  partialNewLeadFragments: Partial<NewLeadFragment>[]
): MockedResponse => {
  const newLeadFragments = partialNewLeadFragments.map(createNewLeadFragment)

  return {
    request: {
      query: POLL_CLAIMABLE_CLIENTS,
      variables: POLL_CLAIMABLE_CLIENTS_QUERY_VARIABLES
    },
    result: {
      data: {
        clientApplicants: {
          totalCount: newLeadFragments.length,
          nodes: newLeadFragments,
          __typename: 'ClientConnection'
        }
      }
    }
  }
}
