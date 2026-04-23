import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Opportunity } from '@staff-portal/graphql/staff'

import { getClientMock } from './get-client-mock'
import { opportunityOperationsMock } from '~integration/mocks/fragments/opportunity-operations-mock'
import { enabledOperationMock } from '~integration/mocks'

export const getOpportunityTeamMock = (
  opportunity?: Partial<Opportunity> | null
) => ({
  id: encodeEntityId('123', 'Opportunity'),
  __typename: 'Opportunity',
  client: getClientMock({
    id: encodeEntityId('534637', 'Client'),
    claimerCategory: null,
    clientPartnerCategory: null,
    financeTeamMember: null,
    operations: {
      updateClientFinanceTeamMember: enabledOperationMock(),
      updateClientClaimerCategory: enabledOperationMock(),
      updateClientPartnerCategory: enabledOperationMock()
    }
  }),
  accountManager: null,
  enterprise: true,
  clientPartner: null,
  salesClaimer: null,
  projectDeliveryManager: null,
  projectSalesSpecialist: null,
  sdr: null,
  owner: null,
  projectRelationshipManager: null,
  relationshipManager: null,
  matcherDesigner: null,
  matcherDeveloper: null,
  matcherProductManager: null,
  operations: {
    ...opportunityOperationsMock()
  },
  ...opportunity
})
