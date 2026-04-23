import {
  MockedResponse,
  encodeEntityId
} from '@staff-portal/data-layer-service'

import { GET_TALENT_LINK_SOURCING_REQUEST } from './get-talent-link-sourcing-request.staff.gql'

export const createLinkSourcingRequestMock = (
  talentId: string,
  fullName: string,
  callable?: string
): MockedResponse => ({
  request: {
    query: GET_TALENT_LINK_SOURCING_REQUEST,
    variables: {
      talentId: talentId
    }
  },
  result: {
    data: {
      node: {
        id: encodeEntityId(talentId, 'Talent'),
        fullName: fullName,
        operations: {
          linkSourcingRequest: {
            messages: [],
            callable: callable || 'ENABLED',
            __typename: 'Operation'
          },
          __typename: `TalentOperations`
        },
        __typename: 'Talent'
      },
      __typename: 'Query'
    }
  }
})
