import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { useGetNode } from '@staff-portal/data-layer-service/src'
import { CONTACT_FOR_TOP_CALL_FRAGMENT } from '@staff-portal/contacts'
import { URL_WITH_MESSAGES_FRAGMENT } from '@staff-portal/facilities'

import { EMBEDDED_SIGNING_FRAGMENT } from '../embedded-signing-fragment'
import { ClAIM_CLIENT_ENTERPRISE_FRAGMENT } from '../claim-client-enterprise-fragment'
import { COMPANY_NEGOTIATION_FRAGMENT } from '../../../basic-info-tab/components/LinkedCompaniesSection/data'
import { GetClientDocument } from './get-client.staff.gql.types'
import { MOBILE_APP_FRAGMENT } from '../mobile-app-fragment'
import { PAUSE_CLIENT_FRAGMENT } from '../pause-client-fragment'
import { DELETE_DUPLICATE_FRAGMENT } from '../delete-duplicate-fragment'
import { MARK_CLIENT_AS_BAD_LEAD_FRAGMENT } from '../mark-client-as-bad-lead-fragment'
import { SURVEY_ENGAGEMENT_FRAGMENT } from '../survey-engagement-fragment'

export default gql`
  query GetClient($clientId: ID!) {
    node(id: $clientId) {
      ...ClientMetadataFragment
      ...ClientHierarchyFragment
    }
  }

  fragment ClientHierarchyFragment on Client {
    parent {
      id
      fullName
    }
    children {
      nodes {
        id
        fullName
      }
      totalCount
    }
  }

  fragment ClientMetadataFragment on Client {
    id
    companyLegacyId
    fullName
    gdprReportUrl
    emailMessagesUrl
    casesUrl
    referralsUrl
    updateProfileUrl
    emailMessaging {
      id
      operations {
        sendEmailTo {
          ...OperationFragment
        }
      }
    }
    addJobLink {
      ...UrlWithMessagesFragment
    }
    historyLink {
      url
    }
    webResource {
      text
      url
    }
    invoicesUrl {
      ...UrlWithMessagesFragment
    }
    paymentsUrl {
      ...UrlWithMessagesFragment
    }
    contact {
      id
      fullName
      contacts(filter: { type: [PHONE] }) {
        nodes {
          ...ContactForTopCallFragment
        }
      }
      operations {
        loginAs {
          ...OperationFragment
        }
        createConversationForStaff {
          ...OperationFragment
        }
      }
    }

    operations {
      ...CompanyProfileOperationsFragment
    }
    topcallPurposeHeuristicData {
      pendingPlaybookTemplates {
        nodes {
          id
        }
      }
      probablyInitialSalesCall
    }
    topscreenClient {
      id
    }
    ...EmbeddedSigningFragment
    ...ClaimClientEnterpriseFragment
    ...MobileAppFragment
    ...PauseClientFragment
    ...DeleteDuplicateFragment
    ...MarkClientAsBadLeadFragment
    ...CompanyNegotiationFragment
    ...SurveyEngagementFragment
  }

  fragment CompanyProfileOperationsFragment on ClientOperations {
    patchClientProfile {
      ...OperationFragment
    }
    createClientDepositInvoice {
      ...OperationFragment
    }
    createClientServiceInvoice {
      ...OperationFragment
    }
    convertClientToTalent {
      ...OperationFragment
    }
    sendMobileAppInvitationsToClient {
      ...OperationFragment
    }
    findPossibleClientDuplicates {
      ...OperationFragment
    }
    markClientPossibleRoleDuplicatesResolved {
      ...OperationFragment
    }
    blackFlagClient {
      ...OperationFragment
    }
    rejectClient {
      ...OperationFragment
    }
    importSTA {
      ...OperationFragment
    }
    startNegotiationForClient {
      ...OperationFragment
    }
    downloadStatementOfAccount {
      ...OperationFragment
    }
    repauseClient {
      ...OperationFragment
    }
    requestClientEngagementsPause {
      ...OperationFragment
    }
    resumeClient {
      ...OperationFragment
    }
    restoreClientFromBlackFlag {
      ...OperationFragment
    }
    inviteCompanyRepresentative {
      ...OperationFragment
    }
    leaveFeedbackClient {
      ...OperationFragment
    }
    approveClient {
      ...OperationFragment
    }
    checkClientCompliance {
      ...OperationFragment
    }
    createClientClaimer {
      ...OperationFragment
    }
    restoreClientFromBadLead {
      ...OperationFragment
    }
    manageUnappliedCash {
      ...OperationFragment
    }
    restoreClient {
      ...OperationFragment
    }
    sendClientClaimEmail {
      ...OperationFragment
    }
    enableTopscreenFeature {
      ...OperationFragment
    }
  }

  ${URL_WITH_MESSAGES_FRAGMENT}
  ${EMBEDDED_SIGNING_FRAGMENT}
  ${ClAIM_CLIENT_ENTERPRISE_FRAGMENT}
  ${MOBILE_APP_FRAGMENT}
  ${PAUSE_CLIENT_FRAGMENT}
  ${CONTACT_FOR_TOP_CALL_FRAGMENT}
  ${DELETE_DUPLICATE_FRAGMENT}
  ${SURVEY_ENGAGEMENT_FRAGMENT}
  ${OPERATION_FRAGMENT}
  ${MARK_CLIENT_AS_BAD_LEAD_FRAGMENT}
  ${COMPANY_NEGOTIATION_FRAGMENT}
`

export const useGetClient = (clientId: string) => {
  const { data, loading, refetch } = useGetNode(GetClientDocument)({ clientId })

  return { client: data, loading, refetch }
}
