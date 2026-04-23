import { useMemo } from 'react'
import { gql, useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'

import { JOB_LIST_GQL_BATCH_KEY } from '../../constants'
import {
  GetJobsListDocument,
  GetJobsListQueryVariables
} from './get-jobs-list.staff.gql.types'

export default gql`
  query GetJobsList(
    $pagination: OffsetPagination!
    $filter: JobFilter!
    $order: JobOrder!
  ) {
    jobs(filter: $filter, pagination: $pagination, order: $order) {
      totalCount
      nodes {
        id
        title
        postedAt
        startDate
        cumulativeStatus
        commitment
        jobType
        hiredCount
        talentCount
        status
        matcherCallScheduled
        currentEngagement {
          id
          commitment
        }
        claimer {
          id
          fullName
          ...WebResourceFragment
          contacts(filter: { type: INTERNAL_SLACK }) {
            nodes {
              id
              ...WebResourceFragment
            }
          }
        }
        client {
          id
          ...WebResourceFragment
          contact {
            id
            fullName
            email
            timeZone {
              name
              value
            }
            contacts(filter: { type: PHONE }) {
              nodes {
                id
                value
                primary
              }
            }
            ...WebResourceFragment
            communicationTrackingLink {
              text
              url
            }
          }
        }
        contacts {
          nodes {
            id
            fullName
            email
            timeZone {
              name
              value
            }
            contacts(filter: { type: PHONE }) {
              nodes {
                id
                value
                primary
              }
            }
            ...WebResourceFragment
            communicationTrackingLink {
              text
              url
            }
          }
        }
        ...WebResourceFragment
        claimerHandoff {
          replacement {
            id
            ...WebResourceFragment
          }
          subject {
            id
            ...WebResourceFragment
          }
        }
      }
      aggregatedStatuses {
        ...JobAggregatedStatusesFragment
      }
      aggregatedPendingTalentStatuses {
        ...JobAggregatedPendingTalentStatusesFragment
      }
    }
  }

  fragment JobAggregatedStatusesFragment on JobAggregatedStatuses {
    active
    closed
    endScheduled
    onBreak
    onHold
    onTrial
    pendingClaim
    pendingEngineer
    pendingLegal
    pendingStart
    postponed
    rejected
    removed
    sendingAway
  }

  fragment JobAggregatedPendingTalentStatusesFragment on JobAggregatedPendingTalentStatuses {
    talentNotSent
    pendingReview
    noTalentInReview
    interviewNotScheduled
    interviewConfirmed
    interviewRejected
    interviewOccurred
    interviewNotOccurred
    rejectPriorInterview
    accepted
    pendingExpiration
    expirationPostponed
    expired
    cancelled
    rejectedTrial
    missed
  }

  ${WEB_RESOURCE_FRAGMENT}
`

export const useGetJobsList = (
  variables: GetJobsListQueryVariables,
  skip?: boolean
) => {
  const { data, error, loading, ...restOptions } = useQuery(
    GetJobsListDocument,
    {
      variables,
      skip,
      context: { [BATCH_KEY]: JOB_LIST_GQL_BATCH_KEY },
      throwOnError: true
    }
  )

  const jobsData = useMemo(() => {
    if (!data?.jobs) {
      return
    }

    const {
      nodes: jobs,
      aggregatedStatuses: statusCounters,
      aggregatedPendingTalentStatuses: pendingTalentStatusCounters,
      totalCount
    } = data.jobs

    return { jobs, totalCount, statusCounters, pendingTalentStatusCounters }
  }, [data])

  return {
    data: jobsData,
    loading,
    error,
    ...restOptions
  }
}
