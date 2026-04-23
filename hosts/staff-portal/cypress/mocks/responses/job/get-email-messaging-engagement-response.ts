import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'

export const getEmailMessagingEngagementResponse = (addressee: string) => ({
  data: {
    node: {
      id: encodeEntityId('123', `EmailMessagingEngagement${addressee}`),
      operations: {
        sendEmailTo: enabledOperationMock(),
        __typename: 'EmailMessagingOperation'
      },
      __typename: `EmailMessagingEngagement${addressee}`
    }
  }
})
