import {
  gql,
  useQuery,
  filterUnauthorizedErrors,
  isNetworkLoading
} from '@staff-portal/data-layer-service'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'

import { GetCandidateJobsDocument } from './get-candidate-jobs.staff.gql.types'

export default gql`
  query GetCandidateJobs($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        engagements(filter: { scopes: [TERMINAL, WORKING] }) {
          nodes {
            ...CandidateJobsEngagementFragment
          }
        }
      }
    }
  }

  fragment CandidateJobEngagementFeedbackFragment on Feedback {
    clientAnswers {
      nodes {
        option {
          question {
            label
          }
          value
        }
        tooltip
      }
    }
  }

  fragment CandidateJobsEngagementFragment on Engagement {
    id
    status
    cumulativeStatus
    createdAt
    startDate
    endDate
    statusFeedback {
      comment
      createdAt
      reason {
        name
      }
    }
    interview {
      id
      cumulativeStatus
      scheduledAtTimes
      interviewTime
      verifierName
      meeting {
        id
        attendeeName
        topSchedulerMeeting
      }
    }
    client {
      id
      fullName
      enterprise
    }
    feedbacks {
      nodes {
        ...CandidateJobEngagementFeedbackFragment
      }
    }
    job {
      id
      client {
        fullName
      }
      skillSets {
        nodes {
          rating
          skill {
            id
            name
            category {
              title
              description
            }
          }
        }
      }
      webResource {
        text
        url
      }
    }
    currentCommitment {
      availability
    }
    commitment
    timeZone {
      ...TimeZoneFragment
    }
  }

  ${TIME_ZONE_FRAGMENT}
`

export const useGetCandidateJobs = ({
  talentId,
  skip
}: {
  talentId: string
  skip?: boolean
}) => {
  const { data, loading, networkStatus, ...restOptions } = useQuery(
    GetCandidateJobsDocument,
    {
      fetchPolicy: 'cache-first',
      variables: {
        talentId
      },
      throwOnError: true,
      errorFilters: [filterUnauthorizedErrors],
      skip
    }
  )

  return {
    data: data?.node,
    loading,
    networkLoading: isNetworkLoading({ data, loading, networkStatus }),
    ...restOptions
  }
}
