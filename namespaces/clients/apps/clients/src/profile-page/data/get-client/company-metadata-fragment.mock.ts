import {
  ClientCumulativeStatus,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

import { ClientMetadataFragment } from './get-client.staff.gql.types'

const hiddenOperationMock = createOperationMock({
  callable: OperationCallableTypes.HIDDEN
})

export const companyMetadataFragmentMock: ClientMetadataFragment = {
  id: '123',
  companyLegacyId: 123,
  fullName: 'Cool company',
  gdprReportUrl:
    'https://staging.toptal.net/platform/gdpr_report?user_id=1142613',
  emailMessagesUrl:
    'http://staging.toptal.net/companies/2596580/email_messages',
  emailMessaging: {
    id: 'emailMessagingId',
    operations: {
      sendEmailTo: hiddenOperationMock
    }
  },
  addJobLink: {
    enabled: true,
    messages: [],
    url: 'https://foo.bar'
  },
  embeddedSigningEnabled: false,
  casesUrl: 'https://staging.toptal.net/companies/123/cases',
  referralsUrl: 'https://staging.toptal.net/referrals',
  invoicesUrl: {
    enabled: true,
    messages: [],
    url: 'https://staff-portal.toptal.net/invoices?badges%5Bcompany_ids%5D%5B%5D=123'
  },
  paymentsUrl: {
    enabled: true,
    messages: [],
    url: 'https://staff-portal.toptal.net/payments?badges%5Bpayee_ids%5D%5B%5D=123'
  },
  status: 'sourced',
  cumulativeStatus: ClientCumulativeStatus.SOURCED,
  updateProfileUrl:
    'https://staging.toptal.net/platform/companies/update_profile?role_id=123',
  contact: {
    id: '2345',
    fullName: 'Full Company name',
    contacts: {
      nodes: []
    },
    operations: {
      loginAs: hiddenOperationMock,
      createConversationForStaff: hiddenOperationMock
    }
  },
  webResource: {
    url: 'https://staging.toptal.net/companies/123/hierarchy',
    text: 'fullName'
  },
  badLead: false,
  investigations: {
    nodes: []
  },
  currentNegotiation: undefined,
  operations: {
    patchClientProfile: hiddenOperationMock,
    enableEmbeddedSigning: hiddenOperationMock,
    disableEmbeddedSigning: hiddenOperationMock,
    pauseClient: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    claimClientEnterprise: hiddenOperationMock,
    rejectClient: hiddenOperationMock,
    enableMobileAppForClient: hiddenOperationMock,
    disableMobileAppForClient: hiddenOperationMock,
    blackFlagClient: hiddenOperationMock,
    deleteDuplicateClient: hiddenOperationMock,
    createClientDepositInvoice: hiddenOperationMock,
    createClientServiceInvoice: hiddenOperationMock,
    convertClientToTalent: hiddenOperationMock,
    sendMobileAppInvitationsToClient: hiddenOperationMock,
    markClientAsBadLead: hiddenOperationMock,
    findPossibleClientDuplicates: hiddenOperationMock,
    markClientPossibleRoleDuplicatesResolved: hiddenOperationMock,
    importSTA: hiddenOperationMock,
    startNegotiationForClient: hiddenOperationMock,
    downloadStatementOfAccount: hiddenOperationMock,
    resumeClient: hiddenOperationMock,
    repauseClient: hiddenOperationMock,
    restoreClientFromBlackFlag: hiddenOperationMock,
    inviteCompanyRepresentative: hiddenOperationMock,
    leaveFeedbackClient: hiddenOperationMock,
    approveClient: hiddenOperationMock,
    restoreClientFromBadLead: hiddenOperationMock,
    manageUnappliedCash: hiddenOperationMock,
    restoreClient: hiddenOperationMock,
    requestClientEngagementsPause: hiddenOperationMock,
    checkClientCompliance: hiddenOperationMock,
    createClientClaimer: hiddenOperationMock,
    sendClientClaimEmail: hiddenOperationMock,
    enableTopscreenFeature: hiddenOperationMock
  },
  historyLink: {
    url: 'https://staging.toptal.net/companies/123/history'
  }
}
