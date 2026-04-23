import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientJobs($clientId: ID!, $filter: ClientJobFilter!) {
    node(id: $clientId) {
      ... on Client {
        jobs(filter: $filter, order: { field: ID, direction: DESC }) {
          nodes {
            ...ClientJobFragment
          }
        }
      }
    }
  }

  fragment ClientJobFragment on Job {
    id
    title
    postedAt
    status
    cumulativeStatus
    talentCount
    hiredCount
    matcherCallScheduled
    currentInvestigation {
      id
      startedAt
    }
    webResource {
      url
    }
    engagements {
      nodes {
        ...ClientJobEngagementFragment
      }
    }
    operations {
      removeJob {
        ...OperationFragment
      }
      postponeJob {
        ...OperationFragment
      }
      resumePostponedJob {
        ...OperationFragment
      }
      sendJobAway {
        ...OperationFragment
      }
      resumeSendingJobAway {
        ...OperationFragment
      }
    }
  }

  fragment ClientJobEngagementFragment on Engagement {
    id
    status
    detailedStatus
    cumulativeStatus
    restoredAt
    talentSentAt
    startDate
    createdAt
    rejectDate
    endDate
    trialLength
    trialEndDate
    onHoldStartDate
    interview {
      id
      cumulativeStatus
      scheduledAtTimes
      interviewTime
      verifierName
    }
    timeZone {
      ...TimeZoneFragment
    }
    talent {
      id
      type
      fullName
      webResource {
        url
      }
    }
    operations {
      expireEngagement {
        ...OperationFragment
      }
      cancelEngagementInInterview {
        ...OperationFragment
      }
    }
  }
`
