import { encodeEntityId } from '@staff-portal/data-layer-service'

import { parentLinkMock } from '~integration/mocks'

export const getCompanyParentResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      parent: parentLinkMock(),
      __typename: 'Client'
    }
  }
})
