import {
  Client,
  ClientCumulativeStatus,
  ClientOperations,
  NegotiationStatus
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '../enabled-operation-mock'

const operations = {
  importSTA: enabledOperationMock(),
  startNegotiationForClient: enabledOperationMock(),
  __typename: 'ClientOperations'
}

export const companyWithBadLeadStatus = {
  id: encodeEntityId('121', 'Client'),
  investigations: {
    totalCount: 0,
    nodes: [],
    __typename: 'ClientInvestigationConnection'
  },
  webResource: {
    text: 'Okuneva, Skiles and Mann',
    url: 'https://staging.toptal.net/platform/staff/companies/1385021',
    __typename: 'Link'
  },
  badLead: true,
  fullName: 'Okuneva, Skiles and Mann',
  cumulativeStatus: ClientCumulativeStatus.BAD_LEAD,
  currentNegotiation: null,
  operations: operations as unknown as ClientOperations,
  __typename: 'Client'
} as Partial<Client>

export const companyOutOfNegotiations = {
  id: encodeEntityId('111', 'Client'),
  investigations: {
    totalCount: 0,
    nodes: [],
    __typename: 'ClientInvestigationConnection'
  },
  webResource: {
    text: 'Robel, Brown and Durgan',
    url: 'https://staging.toptal.net/platform/staff/companies/1587427',
    __typename: 'Link'
  },
  badLead: false,
  fullName: 'Robel, Brown and Durgan',
  cumulativeStatus: ClientCumulativeStatus.PENDING_BILLING_INFO,
  currentNegotiation: null,
  operations: operations as unknown as ClientOperations,
  __typename: 'Client'
} as Partial<Client>

export const companyInNegotiations = {
  id: encodeEntityId('111', 'Client'),
  investigations: {
    totalCount: 0,
    nodes: [],
    __typename: 'ClientInvestigationConnection'
  },

  webResource: {
    text: 'Farrell, Erdman and Gottlieb',
    url: 'https://staging.toptal.net/platform/staff/companies/2604687',
    __typename: 'Link'
  },
  badLead: false,
  fullName: 'Farrell, Erdman and Gottlieb',
  cumulativeStatus: ClientCumulativeStatus.PENDING_TOS,
  currentNegotiation: {
    id: encodeEntityId('123', 'Negotiation'),
    status: NegotiationStatus.WAITING_ON_CLIENT,
    operations: {
      startNegotiation: enabledOperationMock(),
      suspendNegotiation: enabledOperationMock(),
      updateNegotiationStatus: enabledOperationMock(),
      __typename: 'NegotiationOperations'
    },
    __typename: 'Negotiation'
  },
  operations: operations as unknown as ClientOperations,
  __typename: 'Client'
} as Partial<Client>
