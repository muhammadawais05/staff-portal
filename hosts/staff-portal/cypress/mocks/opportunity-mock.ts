/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { Opportunity } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from './enabled-operation-mock'

const opportunityMock = (overrides: Partial<Opportunity> = {}) => ({
  id: 'VjEtT3Bwb3J0dW5pdHktMTE3MjU',
  type: 'Enterprise',
  name: 'Dental CRM Platform',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacus arcu, blandit non semper elementum, fringilla\nsodales est. Ut porttitor blandit sapien pellentesque pretium. Donec ut diam sed urna venenatis hendrerit.',
  complete: false,
  open: true,
  enterprise: false,
  probability: 60,
  value: 1000,
  createdAt: '2021-06-10T20:17:58+03:00',
  casesUrl: 'https://staging.toptal.net/platform/staff/opportunities/123/cases',
  webResource: {
    text: 'Dental CRM Platform',
    url: 'https://staging.toptal.net/platform/staff/opportunities/123'
  },
  operations: {
    deleteOpportunity: enabledOperationMock(),
    updateOpportunity: enabledOperationMock(),
    updateContractFromOpportunity: enabledOperationMock(),
    removeContractFromOpportunity: enabledOperationMock(),
    updateOpportunitySalesClaimer: enabledOperationMock(),
    updateOpportunityClientPartner: enabledOperationMock(),
    updateOpportunityAccountManager: enabledOperationMock(),
    updateOpportunityRelationshipManager: enabledOperationMock(),
    updateOpportunityProjectRelationshipManager: enabledOperationMock(),
    updateOpportunityProjectDeliveryManager: enabledOperationMock(),
    updateOpportunitySdr: enabledOperationMock(),
    updateOpportunityProjectSalesSpecialist: enabledOperationMock()
  },
  __typename: 'Opportunity',
  ...overrides
})

export default opportunityMock
