import { Client } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '../enabled-operation-mock'
import { accountOverviewMock } from './client-account-overview-mock'
import { clientContactMock } from './client-contact-mock'
import { internalTeamMock } from './client-internal-team-mock'
import { clientRepresentativesMock } from './client-representatives-mock'
import { roleFlagsMock } from './client-role-flags-mock'
import { scheduledMeetingMock } from './client-scheduled-meetings-mock'
import { callbackRequestsMock } from './client-callback-requests-mock'
import { legalStaTermsMock } from './legal-sta-terms-mock'
import { clientNodeMock } from '~integration/mocks/fragments/client-node-mock'

export const clientBasicInfoMock = (node?: Partial<Client>) => ({
  id: 'VjEtQ2xpZW50LTUyODg4NQ',
  fullName: 'Ritchie-Jewess BU',
  ...legalStaTermsMock(),
  ...clientRepresentativesMock(),
  ...accountOverviewMock(),
  ...clientContactMock(),
  ...internalTeamMock(),
  ...operationsMock(),
  ...roleFlagsMock(),
  ...scheduledMeetingMock(),
  ...callbackRequestsMock(),
  statusMessages: {
    nodes: []
  },
  ...node
})

const operationsMock = () => ({
  operations: {
    ...clientNodeMock().node().operations,
    updateClientBusinessType: enabledOperationMock(),
    updateClientLeadSource: enabledOperationMock(),
    updateClientLegalName: enabledOperationMock(),
    removeClientParent: enabledOperationMock(),
    updateClientParent: enabledOperationMock(),
    cascadeClientParentUpdates: enabledOperationMock(),
    updateClientLegalContactDetails: enabledOperationMock(),
    updateClientPrimaryRegion: enabledOperationMock(),
    updateClientSecondaryRegion: enabledOperationMock(),
    updateClientLikelihoodToClose: enabledOperationMock(),
    addClientRoleFlag: enabledOperationMock(),
    updateClientEnterpriseLeadStatus: enabledOperationMock(),
    pushClientToSalesforce: enabledOperationMock(),
    updateClientSalesAnalyst: enabledOperationMock(),
    updateClientClaimerCategory: enabledOperationMock(),
    updateMatchingOperationsCoordinator: enabledOperationMock(),
    updateClientRelationshipManager: enabledOperationMock(),
    updateProjectRelationshipManager: enabledOperationMock(),
    updateProjectDeliveryManager: enabledOperationMock(),
    updateAccountManager: enabledOperationMock(),
    updateProjectSalesSpecialist: enabledOperationMock(),
    updateActualSignDate: enabledOperationMock(),
    updateClientCountAsLead: enabledOperationMock(),
    updateClientDiscountEligible: enabledOperationMock(),
    selectClientClaimer: enabledOperationMock(),
    requestClientClaimerTransfer: enabledOperationMock(),
    updateClientPartnerCategory: enabledOperationMock(),
    updateClientSalesDevelopmentRepresentative: enabledOperationMock(),
    updateClientAccountOwner: enabledOperationMock(),
    updateClientEnterpriseSalesExecutive: enabledOperationMock(),
    restoreClientEnterpriseAccountStatus: enabledOperationMock(),
    updateClientEnterpriseAccountStatus: enabledOperationMock(),
    updateClientMatcher: enabledOperationMock(),
    requestClientAccountManagerTransfer: enabledOperationMock(),
    requestClientEngagementsPause: enabledOperationMock(),
    requestClientRelationshipManagerTransfer: enabledOperationMock(),
    selectClientClientPartner: enabledOperationMock(),
    updateClientClientPartner: enabledOperationMock(),
    updateClientFinanceTeamMember: enabledOperationMock(),
    callClient: {
      externalCallUrl: 'skype:+593985132058',
      ...enabledOperationMock()
    }
  }
})
