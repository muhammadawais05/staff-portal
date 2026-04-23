import { gql, useGetNode, BATCH_KEY } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { PROBABILITY_TO_CONVERT_FRAGMENT } from '@staff-portal/jobs'

import { GetJobPageDataDocument } from './get-job-page-data.staff.gql.types'
import { JOB_PAGE_BATCH_KEY } from '../../../../config'

export const GET_JOB_PAGE_DATA = gql`
  query GetJobPageData($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        ...JobPageFragment
      }
    }
  }

  fragment JobPageFragment on Job {
    id
    title
    casesUrl
    probabilityToConvert {
      ...ProbabilityToConvertFragment
    }
    estimatedRevenue
    estimatedValue
    rehire
    notActive
    emailMessaging {
      id
      operations {
        sendEmailTo {
          ...OperationFragment
        }
      }
    }
    client {
      id
      enterprise
      fullName
      contracts(
        filter: {
          kinds: [STA]
          statuses: [SIGNED, RECIPIENT_SIGNED]
          showDescendants: false
        }
      ) {
        totalCount
      }
    }
    sourcingRequest {
      id
      operations {
        updateSourcingRequest {
          ...OperationFragment
        }
      }
    }
    assignTalentLink {
      url
      text
    }
    sendCandidateUrl
    searchCandidatesUrl
    searchApplicantsUrl
    searchRejectedTalentsUrl
    historyLink {
      url
    }
    status
    searchCandidatesUrl
    webResource {
      url
      text
    }
    vertical {
      id
    }
    commitment
    jobType
    talentCount
    ...JobCurrentEngagementFragment
    operations {
      approveJob {
        ...OperationFragment
      }
      removeJob {
        ...OperationFragment
      }
      updateJob {
        ...OperationFragment
      }
      resumePostponedJob {
        ...OperationFragment
      }
      linkJobOpportunity {
        ...OperationFragment
      }
      unlinkJobOpportunity {
        ...OperationFragment
      }
      cloneJob {
        ...OperationFragment
      }
      createSourcingRequest {
        ...OperationFragment
      }
      removeJobAvailabilityRequestsRestriction {
        ...OperationFragment
      }
      resumeSendingJobAway {
        ...OperationFragment
      }
      postponeJob {
        ...OperationFragment
      }
      repostponeJob {
        ...OperationFragment
      }
      refundJobDeposit {
        ...OperationFragment
      }
      cloneJobForRehire {
        ...OperationFragment
      }
      sendJobAway {
        ...OperationFragment
      }
      createAvailabilityRequestForJob {
        ...OperationFragment
      }
    }
    automatedAvailabilityRequests
    searchAllowed
  }

  fragment JobCurrentEngagementFragment on Job {
    jobCurrentEngagement: currentEngagement {
      id
      client {
        id
      }
      clientEmailMessaging {
        id
        operations {
          sendEmailTo {
            ...OperationFragment
          }
        }
      }
      talentEmailMessaging {
        id
        operations {
          sendEmailTo {
            ...OperationFragment
          }
        }
      }
      job {
        id
        talentCount
      }
      operations {
        approveEngagementTrial {
          ...OperationFragment
        }
        cancelEngagementTrial {
          ...OperationFragment
        }
        terminateEngagement {
          ...OperationFragment
        }
        reactivateEngagement {
          ...OperationFragment
        }
        rejectEngagementTrial {
          ...OperationFragment
        }
        rejectApprovedEngagementTrial {
          ...OperationFragment
        }
        reopenExpiredEngagement {
          ...OperationFragment
        }
        changeEngagementCommitment {
          ...OperationFragment
        }
        changeEngagementStartDate {
          ...OperationFragment
        }
        changeEngagementEndDate {
          ...OperationFragment
        }
        changeProductBillingFrequency {
          ...OperationFragment
        }
        scheduleEngagementBreak {
          ...OperationFragment
        }
        scheduleEngagementActivationStartDate {
          ...OperationFragment
        }
      }
      status
      talent {
        id
        talentType
      }
    }
  }

  ${PROBABILITY_TO_CONVERT_FRAGMENT}
  ${OPERATION_FRAGMENT}
`

export const useGetJobPageData = (jobId: string) =>
  useGetNode(GetJobPageDataDocument)(
    { jobId },
    { throwOnError: true, context: { [BATCH_KEY]: JOB_PAGE_BATCH_KEY } }
  )
