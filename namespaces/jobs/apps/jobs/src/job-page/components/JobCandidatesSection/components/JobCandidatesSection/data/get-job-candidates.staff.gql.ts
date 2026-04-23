import { useMemo } from 'react'
import { gql, useQuery } from '@staff-portal/data-layer-service'
import { ENGAGEMENT_DETAILED_STATUS_FRAGMENT } from '@staff-portal/engagements'

import { GetJobPageCandidatesDocument } from './get-job-candidates.staff.gql.types'

export const GET_JOB_PAGE_CANDIDATES = gql`
  query GetJobPageCandidates($jobId: ID!) {
    viewer {
      permits {
        canViewEngagements
      }
    }
    node(id: $jobId) {
      ...JobCandidateSectionFragment
    }
  }

  fragment JobCandidateSectionFragment on Job {
    id
    currentEngagement {
      id
    }
    candidateEngagements: engagements(filter: { state: CANDIDATES }) {
      ...CandidatesConnectionFragment
    }

    inactiveCandidateEngagements: engagements(
      filter: { state: INACTIVE_CANDIDATES }
    ) {
      ...CandidatesConnectionFragment
    }
  }

  fragment JobEngagementCandidateFragment on Engagement {
    id
    ...EngagementDetailedStatusFragment
    talentSentAt
    job {
      id
    }
    webResource {
      url
    }
    talent {
      id
      type
      fullName
      resumeUrl
      webResource {
        url
      }
    }
  }
  fragment CandidatesConnectionFragment on JobEngagementConnection {
    edges {
      jobIssues {
        failedMetrics {
          message
          name
          status
        }
        status
      }
      node {
        ...JobEngagementCandidateFragment
      }
    }
  }
  ${ENGAGEMENT_DETAILED_STATUS_FRAGMENT}
`

export const useGetJobCandidates = (jobId: string) => {
  const { data, ...restOptions } = useQuery(GetJobPageCandidatesDocument, {
    variables: { jobId },
    throwOnError: true
  })

  const candidateEngagements = useMemo(() => {
    if (data?.node?.currentEngagement) {
      return data.node.inactiveCandidateEngagements?.edges
    }

    return data?.node?.candidateEngagements?.edges
  }, [data])

  return {
    ...restOptions,
    canViewEngagements: Boolean(data?.viewer.permits.canViewEngagements),
    candidateEngagements
  }
}
