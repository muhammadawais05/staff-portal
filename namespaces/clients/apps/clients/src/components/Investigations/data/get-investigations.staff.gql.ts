import { gql, useGetNode } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import { GetInvestigationsDocument } from './get-investigations.staff.gql.types'
import { INVESTIGATION_JOB_FRAGMENT } from './investigation-job-fragment.staff.gql'

export default gql`
  query GetInvestigations($clientId: ID!, $current: Boolean) {
    node(id: $clientId) {
      ... on Client {
        id
        fullName
        roleFlags {
          nodes {
            id
            flag {
              id
              token
            }
          }
        }
        investigations(filter: { current: $current }) {
          totalCount
          nodes {
            ...InvestigationNodeFragment
          }
        }
        operations {
          createClientInvestigation {
            ...OperationFragment
          }
          updateClientInvestigation {
            ...OperationFragment
          }
          resolveClientLegalInvestigation {
            ...OperationFragment
          }
          resolveClientOtherInvestigation {
            ...OperationFragment
          }
          resolveClientPaymentProblemInvestigation {
            ...OperationFragment
          }
          resolveClientClientFeedbackInvestigation {
            ...OperationFragment
          }
          resolveClientChallengesWithEngagementInvestigation {
            ...OperationFragment
          }
          resolveClientReportedIssuesInvestigation {
            ...OperationFragment
          }
          resolveClientAccountingErrorInvestigation {
            ...OperationFragment
          }
          resolveClientCcAchDisputeInvestigation {
            ...OperationFragment
          }
          resolveClientMatchingInvestigation {
            ...OperationFragment
          }
        }
      }
    }
  }

  fragment InvestigationNodeFragment on Investigation {
    id
    clientSpecialistTeamAssignee {
      id
      webResource {
        text
        url
      }
    }
    comment
    reason
    resolvedAt
    startedAt
    jobs {
      totalCount
      nodes {
        ...InvestigationJobFragment
      }
    }
    resolution {
      comment
      netLoss
      resolution
      issueSource
      talentNotes
      initialRefund
      refundProvided
      talentAtFault
      invoicesAdjusted
      slackChannelLink
      supportTicketLink
      talentPaymentsImpacted
      settlementAgreementSent
      paymentResolutionType
      lowValue
    }
  }

  ${INVESTIGATION_JOB_FRAGMENT}
  ${OPERATION_FRAGMENT}
`
export const useGetInvestigations = (
  companyId: string,
  { current } = { current: false }
) => {
  const { data, loading, initialLoading, refetch } = useGetNode(
    GetInvestigationsDocument
  )({ clientId: companyId, current })

  return { loading, initialLoading, refetch, data }
}
