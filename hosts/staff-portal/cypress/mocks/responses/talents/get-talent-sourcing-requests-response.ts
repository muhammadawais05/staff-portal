import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Talent } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'

export const getTalentSourcingRequestsResponse = (
  talent?: Partial<Talent>
) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      sourcingRequests: {
        nodes: [],
        __typename: 'SourcingRequestConnection'
      },
      ...talent,
      operations: {
        linkSourcingRequest: enabledOperationMock(),
        ...talent?.operations
      },
      __typename: 'Talent'
    }
  }
})
