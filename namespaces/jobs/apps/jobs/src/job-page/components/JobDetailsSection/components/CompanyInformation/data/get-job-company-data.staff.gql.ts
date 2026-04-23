import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'

export default gql`
  query GetJobCompanyData($jobId: ID!) {
    node(id: $jobId) {
      ...GetJobCompanyDataFragment
    }
  }

  fragment GetJobCompanyDataFragment on Job {
    id
    postedAt
    talentCount
    status
    hiredCount
    matcherCallScheduled
    cumulativeStatus
    client {
      id
      jobsUrl
      enterprise
      emailMessagesUrl
      clientPartner {
        ...JobDetailsStaffFragment
      }
      claimer {
        ...JobDetailsStaffFragment
      }
      relationshipManager {
        ...JobDetailsStaffFragment
      }
      accountManager {
        ...JobDetailsStaffFragment
      }
      webResource {
        text
        url
      }
    }
    claimerHandoff {
      replacement {
        ...JobDetailsStaffFragment
      }
    }
    currentSalesOwner {
      owner {
        ...JobDetailsStaffFragment
      }
      relationship
    }
    claimer {
      ...JobDetailsStaffFragment
    }
    ...JobCompanyOperationsFragment
  }

  fragment JobDetailsStaffFragment on Staff {
    id
    fullName
    webResource {
      text
      url
    }
  }

  fragment JobCompanyOperationsFragment on Job {
    operations {
      updateJobClaimer {
        ...OperationFragment
      }
    }
  }

  ${OPERATION_FRAGMENT}
  ${TIME_ZONE_FRAGMENT}
`
