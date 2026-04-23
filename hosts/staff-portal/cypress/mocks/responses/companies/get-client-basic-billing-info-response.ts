import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Client } from '@staff-portal/graphql/staff'

import { getClientOperations } from '~integration/mocks/fragments'

export const getClientBasicBillingInfoResponse = (
  client?: Partial<Client>
) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      availablePrepaymentBalance: '22.61',
      operations: getClientOperations(),
      paymentOptionsNullable: {
        viewLink: {
          text: '',
          url: 'https://staging.toptal.net/platform/staff/companies/1544845/payment_methods',
          __typename: 'Link'
        },
        __typename: 'PaymentOptionsConnection'
      },
      unallocatedMemorandums: {
        totalAmount: '0.0',
        webResource: {
          text: '0.0',
          url: 'https://staging.toptal.net/platform/staff/memos?badges%5Bcompany_ids%5D=1544845&status=unallocated',
          __typename: 'Link'
        },
        __typename: 'UnallocatedMemorandumConnection'
      },
      ...client,
      __typename: 'Client'
    }
  }
})
