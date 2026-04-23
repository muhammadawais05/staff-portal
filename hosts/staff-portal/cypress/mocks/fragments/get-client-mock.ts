import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Client, Link } from '@staff-portal/graphql/staff'

import { WithTypename } from '~integration/types'

type ClientWithPartialOperations = Omit<Client, 'operations'> & {
  operations: Partial<Client['operations']>
}

export const getClientMock = (
  client?: Partial<ClientWithPartialOperations> | null
): Partial<WithTypename<ClientWithPartialOperations>> => ({
  __typename: 'Client',
  id: encodeEntityId('123', 'Client'),
  fullName: 'Client Name',
  enterprise: false,
  emailMessagesUrl: null,
  clientPartner: null,
  jobsUrl: null,
  claimer: null,
  relationshipManager: null,
  accountManager: null,
  contact: null,
  contracts: null,
  fullTimeDiscount: null,
  partTimeDiscount: null,
  commissions: null,
  referrer: null,
  netTerms: 0,
  photo: null,
  email: 'client.email@toptal.com',
  billingPhone: null,
  timeZone: null,
  root: null,
  preferredBillingOption: null,
  jobDepositCanBeIssued: null,
  depositInvoices: null,
  hasUnpaidDepositInvoices: false,
  purchaseOrders: {
    nodes: [],
    totalCount: 0
  },
  representatives: {
    totalCount: 0,
    nodes: []
  },
  webResource: {
    text: 'Client Name',
    url: 'https://staging.toptal.net/platform/staff/companies/123',
    __typename: 'Link'
  } as Link,
  ...client
})
