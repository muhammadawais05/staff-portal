import { TopscreenClient } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'

export const getTopscreenPositionsResponse = (
  topscreenClient?: Partial<TopscreenClient>
) => ({
  data: {
    node: {
      ...topscreenClient,
      operations: {
        ...topscreenClient?.operations,
        createTopscreenPosition: enabledOperationMock()
      }
    },
    operations: {
      createTopscreenTalent: enabledOperationMock()
    }
  }
})
