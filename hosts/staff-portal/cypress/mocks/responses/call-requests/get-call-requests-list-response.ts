import { CallbackRequest } from '@staff-portal/graphql/staff'

import { getCallRequestMock } from '~integration/mocks/fragments'

export const getCallRequestsListResponse = (
  callRequest?: Partial<CallbackRequest>
) => ({
  data: {
    callbackRequests: {
      nodes: [getCallRequestMock(callRequest)],
      totalCount: 1,
      __typename: 'CallbackRequestConnection'
    },
    __typename: 'Query'
  }
})
