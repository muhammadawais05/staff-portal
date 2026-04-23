import { encodeEntityId } from '@staff-portal/data-layer-service'

import { createGetLensTokenMock } from '~integration/utils'

export const getLensTokenResponse = () => ({
  data: {
    viewer: {
      me: {
        id: encodeEntityId('123', 'Staff')
      },
      tokens: {
        globalCommunicationTracking: createGetLensTokenMock()
      }
    }
  }
})
