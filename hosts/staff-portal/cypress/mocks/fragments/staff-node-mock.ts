import { ContactType, NegotiationStatus } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '../enabled-operation-mock'
import { hiddenOperationMock } from '../hidden-operation-mock'
import { webResourceMock } from './web-resource-mock'

/**
 * @deprecated
 * get rid of `staffNode` queries in favour of `node` queries
 */
export const staffNodeMock = (node?: {}) => ({
  id: encodeEntityId('123', 'Client'),
  companyLegacyId: 12300,
  fullName: 'Ritchie-Jewess BU',
  status: 'sourced',
  cumulativeStatus: 'SOURCED',
  casesUrl: 'https://staging.toptal.net/platform/staff/roles/2596580/cases',
  gdprReportUrl:
    'https://staging.toptal.net/platform/gdpr_report?user_id=1142613',
  emailMessagesUrl:
    'http://staging.toptal.net/companies/2596580/email_messages',
  referralsUrl: 'https://staging.toptal.net/referrals',
  updateProfileUrl:
    'https://staging.toptal.net/platform/companies/update_profile?role_id=123',
  historyLink: {
    url: '/platform/staff/companies/2385680/performed_actions/recent'
  },
  availableNetTerms: [],
  netTerms: 10,
  contact: {
    id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTIzODU2ODE',
    fullName: 'Marline Leffler',
    emailTemplates: { nodes: [] },
    contacts: {
      totalCount: 2,
      nodes: [
        {
          id: 'VjEtQ29udGFjdC0yODY0MDgx',
          value: '+85296277488',
          type: ContactType.PHONE
        },
        {
          id: 'VjEtQ29udGFjdC1waG9uZSMrODUyOTYyNzc0ODg',
          value: '+85296277488',
          type: ContactType.PHONE
        }
      ]
    },
    operations: {
      loginAs: enabledOperationMock(),
      createConversationForStaff: enabledOperationMock()
    }
  },
  currentNegotiation: {
    id: 'VjEtTmVnb3RpYXRpb24tMjg4MA',
    status: NegotiationStatus.WAITING_ON_CLIENT,
    operations: {
      suspendNegotiation: enabledOperationMock(),
      updateNegotiationStatus: enabledOperationMock()
    }
  },
  embeddedSigningEnabled: true,
  ...webResourceMock({
    text: '123',
    url: 'test-url'
  }),
  ...staffNodeOperationsMock(),
  ...node
})

export const staffNodeOperationsMock = (operations?: {}) => ({
  operations: {
    patchClientProfile: enabledOperationMock(),
    rejectClient: enabledOperationMock(),
    enableEmbeddedSigning: enabledOperationMock(),
    disableEmbeddedSigning: enabledOperationMock(),
    claimClientEnterprise: enabledOperationMock(),
    pauseClient: enabledOperationMock(),
    blackFlagClient: enabledOperationMock(),
    enableMobileAppForClient: enabledOperationMock(),
    disableMobileAppForClient: hiddenOperationMock(),
    deleteDuplicateClient: enabledOperationMock(),
    createClientServiceInvoice: enabledOperationMock(),
    createClientDepositInvoice: enabledOperationMock(),
    convertClientToTalent: enabledOperationMock(),
    sendMobileAppInvitationsToClient: enabledOperationMock(),
    markClientAsBadLead: enabledOperationMock(),
    findPossibleClientDuplicates: enabledOperationMock(),
    markClientPossibleRoleDuplicatesResolved: enabledOperationMock(),
    importSTA: enabledOperationMock(),
    negotiationStartForClient: hiddenOperationMock(),
    startNegotiationForClient: hiddenOperationMock(),
    negotiationSuspend: enabledOperationMock(),
    negotiationUpdateStatus: enabledOperationMock(),
    downloadStatementOfAccount: enabledOperationMock(),
    repauseClient: enabledOperationMock(),
    resumeClient: enabledOperationMock(),
    restoreClientFromBlackFlag: enabledOperationMock(),
    requestClientEngagementsPause: enabledOperationMock(),
    inviteCompanyRepresentative: enabledOperationMock(),
    leaveFeedbackClient: enabledOperationMock(),
    approveClient: enabledOperationMock(),
    restoreClientFromBadLead: enabledOperationMock(),
    manageUnappliedCash: enabledOperationMock(),
    restoreClient: enabledOperationMock(),
    createClientClaimer: enabledOperationMock(),
    checkClientCompliance: enabledOperationMock(),
    ...operations
  }
})
