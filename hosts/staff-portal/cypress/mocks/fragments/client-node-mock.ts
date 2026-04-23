import {
  inDepthCompanyResearchMock,
  financialInformationMock,
  socialMediaMock,
  webResourceMock
} from '.'
import { enabledOperationMock, hiddenOperationMock } from '~integration/mocks'

export const clientNodeMock = (node?: {}) => ({
  node: () => ({
    id: 'VjEtQ2xpZW50LTUyODg4NQ',
    companyLegacyId: 123,
    fullName: 'Test Name',
    email: 'test@example.com',
    contact: {
      id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTE4NzE5NTE',
      email: 'test@email.com',
      fullName: 'Test Name',
      phoneNumber: '+8801916491724',
      contacts: {
        edges: []
      }
    },
    billingPhone: '8574491392',
    timeZone: {
      name: '(UTC-04:00) America - New York',
      value: 'America/New_York'
    },
    netTerms: 10,
    enterprise: false,
    accountManager: null,
    businessType: null,
    clientPartner: null,
    emailMessagesUrl:
      'https://staging.toptal.net/platform/staff/companies/2887212/email_messages',
    relationshipManager: null,
    ...inDepthCompanyResearchMock(),
    ...financialInformationMock(),
    ...socialMediaMock(),
    clientopedia: null,
    buyingSignalsService: {
      currentEmployeeCount: null,
      foundingYear: null,
      industry: null,
      revenueRange: null,
      stage: null,
      totalFunding: null,
      acquiredBy: [],
      acquiredCompanies: [],
      linkedin: null,
      twitter: null,
      facebook: null,
      crunchbase: null
    },
    emailCarbonCopyOptions: {
      nodes: [
        {
          default: false,
          role: {
            id: 'VjEtQ2xpZW50LTUyODg4Nw',
            email: 'john-Cc6427d908dee2bb@toptal.io>',
            fullName: 'John Snow'
          },
          label: 'Account Manager',
          __typename: 'EmailCarbonCopyOption'
        },
        {
          default: false,
          role: {
            id: 'VjEtQ2xpZW50LTUyODg4NQ',
            email: 'greg-Cc6427d908dee2bb@toptal.io>',
            fullName: 'Greg Conn'
          },
          label: 'Sales Claimer',
          __typename: 'EmailCarbonCopyOption'
        }
      ],
      __typename: 'EmailCarbonCopyOptionConnection'
    },
    fullTimeDiscount: '0',
    partTimeDiscount: '0',
    operations: {
      // page specific operations (including actions dropdown)
      patchClientProfile: enabledOperationMock(),
      createClientDepositInvoice: enabledOperationMock(),
      createClientInvestigation: enabledOperationMock(),
      createClientServiceInvoice: enabledOperationMock(),
      convertClientToTalent: enabledOperationMock(),
      sendMobileAppInvitationsToClient: enabledOperationMock(),
      findPossibleClientDuplicates: enabledOperationMock(),
      markClientPossibleRoleDuplicatesResolved: enabledOperationMock(),
      downloadStatementOfAccount: enabledOperationMock(),
      inviteCompanyRepresentative: enabledOperationMock(),
      leaveFeedbackClient: enabledOperationMock(),
      approveClient: enabledOperationMock(),
      restoreClientFromBadLead: enabledOperationMock(),
      pauseClient: enabledOperationMock(),
      blackFlagClient: enabledOperationMock(),
      enableMobileAppForClient: enabledOperationMock(),
      disableMobileAppForClient: hiddenOperationMock(),
      markClientAsBadLead: enabledOperationMock(),
      repauseClient: enabledOperationMock(),
      resumeClient: enabledOperationMock(),
      restoreClient: enabledOperationMock(),
      restoreClientFromBlackFlag: enabledOperationMock(),
      rejectClient: enabledOperationMock(),
      enableEmbeddedSigning: enabledOperationMock(),
      disableEmbeddedSigning: enabledOperationMock(),
      importSTA: enabledOperationMock(),
      negotiationSuspend: enabledOperationMock(),
      negotiationUpdateStatus: enabledOperationMock(),
      negotiationStartForClient: enabledOperationMock(),
      startNegotiationForClient: enabledOperationMock(),
      claimClientEnterprise: enabledOperationMock(),
      deleteDuplicateClient: enabledOperationMock(),
      manageUnappliedCash: hiddenOperationMock(),
      requestClientEngagementsPause: enabledOperationMock(),
      createClientClaimer: enabledOperationMock(),
      checkClientCompliance: enabledOperationMock(),
      sendClientClaimEmail: enabledOperationMock(),
      enableTopscreenFeature: enabledOperationMock()
    },
    ...webResourceMock({
      text: 'Test Client'
    }),
    hasUnpaidDepositInvoices: false,
    __typename: 'Client',
    ...node
  })
})
