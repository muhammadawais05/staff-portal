import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'

export default gql`
  query GetAvailabilityStepData($attributes: NewEngagementWizardAttributes!) {
    newEngagementWizard(step: AVAILABILITY, attributes: $attributes) {
      ...AvailabilityStepData
    }
  }

  fragment AvailabilityStepData on NewEngagementWizard {
    acquireHighPriorityLockOperation {
      ...OperationFragment
    }
    availabilityConfirmed
    commitment
    commitmentTooLow
    lockOverrideRequired
    newEngagement {
      trialLength
    }
    previousTalentEngagementForClient {
      ...PreviousTalentEngagementForClientFragment
    }
    job {
      id
      estimatedLength
    }
    parallelEngagements {
      nodes {
        ...ParallelEngagementsFragment
      }
    }
  }

  fragment ParallelEngagementsFragment on Engagement {
    id
    commitment
    status
    cumulativeStatus

    client {
      id
      enterprise
      ...WebResourceFragment
    }

    job {
      id
      expectedWeeklyHours
      ...WebResourceFragment
    }

    currentInterviewLock {
      id
      type
    }
  }

  fragment PreviousTalentEngagementForClientFragment on Engagement {
    id
    currentCommitment {
      availability
      adjustedCompanyRate {
        value
      }
      adjustedTalentRate {
        value
      }
    }
    job {
      id
      ...WebResourceFragment
    }
    latestExternalInterview: interviews(
      filter: { scope: EXTERNAL }
      order: { field: CREATED_AT, direction: DESC }
      pagination: { limit: 1, offset: 0 }
    ) {
      nodes {
        id
        status
      }
    }
    newExternalInterview {
      id
      status
    }
    status
  }

  ${OPERATION_FRAGMENT}
  ${WEB_RESOURCE_FRAGMENT}
`
