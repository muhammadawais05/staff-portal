import { CallbackRequest } from '@staff-portal/graphql/staff'

import { getCallRequestMock } from '~integration/mocks/fragments'

export const getCallRequestResponse = (
  callRequest?: Partial<CallbackRequest>
) => ({
  data: {
    node: getCallRequestMock(callRequest)
  }
})
