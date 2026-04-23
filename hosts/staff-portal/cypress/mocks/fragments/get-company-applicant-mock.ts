import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Client } from '@staff-portal/graphql/staff'

import { hiddenOperationMock } from '../hidden-operation-mock'

export const getCompanyApplicantMock = (client?: Partial<Client>) => ({
  id: encodeEntityId('123', 'Client'),
  fullName: 'Company Name',
  approvedAt: null,
  salesAnalyst: null,
  updatedAt: '2022-03-12T06:53:01+03:00',
  email: 'megc-d4707ac50408d404@toptal.io',
  status: 'active',
  cumulativeStatus: 'ACTIVE',
  createdAt: '2021-07-21T06:46:40+03:00',
  claimableSince: '2021-07-21T06:47:43+03:00',
  isNew: false,
  obscureLead: false,
  ofacProhibitedCumulative: false,
  ofacStatus: null,
  ofacStatusComment: null,
  photo: null,
  leadPotential: null,
  scoreExplanation: null,
  country: null,
  contact: null,
  claimer: null,
  pendingCallbackRequest: null,
  timeZone: null,
  webResource: {
    text: 'Company Name',
    url: 'https://staging.toptal.net/platform/staff/companies/123',
    __typename: 'Link'
  },
  roleFlags: {
    nodes: [],
    __typename: 'RoleFlagConnection'
  },
  businessType: null,
  parent: null,
  investigations: null,
  ...client,
  __typename: 'Client',
  operations: {
    approveClient: hiddenOperationMock(),
    pauseClient: hiddenOperationMock(),
    createClientClaimer: hiddenOperationMock(),
    markClientAsBadLead: hiddenOperationMock(),
    restoreClientFromBadLead: hiddenOperationMock(),
    manageUnappliedCash: hiddenOperationMock(),
    rejectClient: hiddenOperationMock(),
    restoreClient: hiddenOperationMock(),
    ...client?.operations,
    __typename: 'ClientOperations'
  }
})
