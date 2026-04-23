import { gql, useGetNode, BATCH_KEY } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { CONTACT_FOR_TOP_CALL_FRAGMENT } from '@staff-portal/contacts'

import { TALENT_PAGE_BATCH_KEY } from '../../config'
import { TALENT_VERTICAL_FRAGMENT } from '../talent-vertical-fragment'
import { GetTalentDocument } from './get-talent.staff.gql.types'

export const GET_TALENT = gql`
  query GetTalent($talentId: ID!) {
    node(id: $talentId) {
      ...TalentFragment
    }
  }

  fragment TalentFragment on Talent {
    id
    fullName
    type
    suspended
    resumeUrl
    casesUrl
    sendToJobUrl
    profileEditorUrl
    emailMessagesUrl
    referralsUrl
    eligibleForAutomaticRestore
    applicationManualRestorationAvailable
    paymentsHoldDescription
    contacts(filter: { type: [PHONE] }) {
      nodes {
        ...ContactForTopCallFragment
      }
    }
    gdprReportUrl
    historyLink {
      url
    }
    payments {
      totalCount
    }
    otherVerticals {
      nodes {
        ...TalentVerticalFragment
      }
    }
    operations {
      updateTalentProfile {
        ...OperationFragment
      }
      convertTalent {
        ...OperationFragment
      }
      convertOnboardingTalent {
        ...OperationFragment
      }
      convertToSourcingFlow {
        ...OperationFragment
      }
      removeTalent {
        ...OperationFragment
      }
      reactivateTalent {
        ...OperationFragment
      }
      processGdprRemovalTalent {
        ...OperationFragment
      }
      setHealthStatusTalent {
        ...OperationFragment
      }
      importTalentContract {
        ...OperationFragment
      }
      createPaymentHold {
        ...OperationFragment
      }
      resumeTalentApplication {
        ...OperationFragment
      }
      restoreTalentActivation {
        ...OperationFragment
      }
      removePaymentHold {
        ...OperationFragment
      }
      downloadRolePaymentHistory {
        ...OperationFragment
      }
      applyTalentToAnotherVertical {
        ...OperationFragment
      }
      createTalentAvailabilityRequest {
        ...OperationFragment
      }
      createTalentInfraction {
        ...OperationFragment
      }
      applyTalentToAnotherVertical {
        ...OperationFragment
      }
      pauseTalent {
        ...OperationFragment
      }
      resetRejectedTalentApplication {
        ...OperationFragment
      }
      restoreOnboardingTalent {
        ...OperationFragment
      }
      loginAs {
        ...OperationFragment
      }
      passOnboardingTalentPrescreening {
        ...OperationFragment
      }
      downloadTalentIpHistory {
        ...OperationFragment
      }
      resumeTalent {
        ...OperationFragment
      }
    }
    specializationApplications(filter: { statuses: [PENDING] }) {
      nodes {
        id
        operations {
          id
          rejectSpecializationApplication {
            ...OperationFragment
          }
        }
      }
    }
    emailMessaging {
      id
      operations {
        sendEmailTo {
          ...OperationFragment
        }
      }
    }
    screeningRoleSteps {
      nodes {
        id
        status
        step {
          id
          title
        }
      }
    }
  }

  ${OPERATION_FRAGMENT}
  ${TALENT_VERTICAL_FRAGMENT}
  ${CONTACT_FOR_TOP_CALL_FRAGMENT}
`

export const useGetTalent = (talentId: string) =>
  useGetNode(GetTalentDocument)(
    { talentId },
    {
      throwOnError: true,
      context: { [BATCH_KEY]: TALENT_PAGE_BATCH_KEY }
    }
  )
