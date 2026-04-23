import { Client } from '@staff-portal/graphql/staff'

import { getClientOperations } from '~integration/mocks/fragments'

export const getClientReviewAttemptsResponse = (client?: Partial<Client>) => ({
  data: {
    node: {
      id: 'VjEtQ2xpZW50LTMzNzkzOQ',
      operations: getClientOperations(),
      reviewAttempts: {
        nodes: [],
        totalCount: 0,
        __typename: 'ReviewAttemptConnection'
      },
      ...client,
      __typename: 'Client'
    }
  }
})
