import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Client } from '@staff-portal/graphql/staff'

import { getClientOperations } from '~integration/mocks/fragments'

export const getClientCommissionResponse = (client?: Partial<Client>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      commissions: {
        commissionsPot: 5,
        referralCommission: {
          ratePercent: '1.5',
          __typename: 'RelativeSourcingCommission'
        },
        __typename: 'ClientCommissions'
      },
      canIssueSourcingCommission: true,
      referrer: {
        id: 'VjEtU3RhZmYtMTE0OTkyOQ',
        fullName: 'Drew Ritter',
        webResource: {
          text: 'Drew Ritter',
          url: 'https://staging.toptal.net/platform/staff/staff/1149929',
          __typename: 'Link'
        },
        __typename: 'Staff'
      },
      claimer: {
        id: 'VjEtU3RhZmYtMTE0OTkyOQ',
        fullName: 'Drew Ritter',
        webResource: {
          text: 'Drew Ritter',
          url: 'https://staging.toptal.net/platform/staff/staff/1149929',
          __typename: 'Link'
        },
        __typename: 'Staff'
      },
      commissionReceiver: null,
      operations: getClientOperations(),
      ...client,
      __typename: 'Client'
    }
  }
})
