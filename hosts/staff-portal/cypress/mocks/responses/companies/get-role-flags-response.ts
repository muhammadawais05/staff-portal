import { Client } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { roleFlagsMock } from '~integration/mocks/fragments/client-role-flags-mock'

export const getRoleFlagsResponse = (client?: Partial<Client>) => ({
  data: {
    staffNode: {
      ...client,
      id: encodeEntityId('123', 'Client'),
      __typename: 'Client',
      roleFlags: roleFlagsMock().roleFlags
    }
  }
})
