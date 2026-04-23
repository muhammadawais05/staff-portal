import { gql, useQuery } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import {
  WEB_RESOURCE_FRAGMENT,
  URL_WITH_MESSAGES_FRAGMENT
} from '@staff-portal/facilities'
import {
  ENGAGEMENT_RESCHEDULE_INTERNAL_FRAGMENT,
  ENGAGEMENT_SCHEDULE_INTERNAL_FRAGMENT
} from '@staff-portal/engagements-interviews'
import { JOB_CANDIDATE_INTRO_DRAFTS_FEEDBACK_FRAGMENT } from '@staff-portal/jobs'
import { ENGAGEMENT_DETAILED_STATUS_FRAGMENT } from '@staff-portal/engagements'

import { CandidateIntroDraftItem } from '../../types'
import { GetCandidateIntroDraftsDocument } from './get-candidate-intro-drafts.staff.gql.types'
import { JOB_ENGAGEMENT_EDGE_FRAGMENT } from '../job-engagement-edge-fragment'

export const GET_CANDIDATE_INTRO_DRAFTS = gql`
  query GetCandidateIntroDrafts($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        candidateIntroDrafts: engagements(
          filter: {
            status: [
              DRAFT
              PENDING_APPROVAL
              READY_TO_SEND
              REJECTED_DRAFT
              CANCELLED_DRAFT
            ]
          }
        ) {
          nodes {
            ... on Engagement {
              ...JobCandidateIntroDraftsEngagementFragment
            }
          }

          edges {
            node {
              id
            }

            ...JobEngagementEdgeFragment
          }
        }
      }
    }
  }

  fragment JobCandidateIntroDraftsEngagementFragment on Engagement {
    id

    ...EngagementScheduleInternalFragment
    ...EngagementRescheduleInternalFragment
    ...EngagementDetailedStatusFragment
    resumeUrl
    talent {
      id
      fullName
      resumeUrl
      ...WebResourceFragment
    }
    companyHourlyRate
    talentHourlyRate

    viewIntroDraftV2 {
      ...UrlWithMessagesFragment
    }

    statusFeedback {
      ...JobCandidateIntroDraftsFeedbackFragment
    }

    internalInterview {
      id
      interviewTime
    }

    operations {
      sendEngagementTalentIntroductionTestEmail {
        ...OperationFragment
      }
      rejectDraftEngagement {
        ...OperationFragment
      }
      approveDraftEngagement {
        ...OperationFragment
      }
      cancelEngagementDraftInInterview {
        ...OperationFragment
      }
      restoreCancelledEngagement {
        ...OperationFragment
      }
    }
  }

  ${ENGAGEMENT_SCHEDULE_INTERNAL_FRAGMENT}
  ${ENGAGEMENT_RESCHEDULE_INTERNAL_FRAGMENT}
  ${ENGAGEMENT_DETAILED_STATUS_FRAGMENT}
  ${JOB_ENGAGEMENT_EDGE_FRAGMENT}
  ${OPERATION_FRAGMENT}
  ${WEB_RESOURCE_FRAGMENT}
  ${URL_WITH_MESSAGES_FRAGMENT}
  ${JOB_CANDIDATE_INTRO_DRAFTS_FEEDBACK_FRAGMENT}
`

export const useGetCandidateIntroDrafts = (jobId: string) => {
  const { data, error, loading, ...restOptions } = useQuery(
    GetCandidateIntroDraftsDocument,
    {
      throwOnError: true,
      variables: { jobId }
    }
  )

  const candidateIntroDraftsData: CandidateIntroDraftItem[] =
    data?.node?.candidateIntroDrafts?.nodes.map(node => ({
      ...node,
      jobIssues: data?.node?.candidateIntroDrafts?.edges.find(
        edge => edge.node.id === node.id
      )?.jobIssues
    })) ?? []

  return {
    data: candidateIntroDraftsData,
    error,
    loading,
    ...restOptions
  }
}
