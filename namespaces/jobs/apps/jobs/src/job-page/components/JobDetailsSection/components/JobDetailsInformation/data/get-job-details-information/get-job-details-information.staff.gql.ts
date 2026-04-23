import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'

export default gql`
  query GetJobDetailsInformation($jobId: ID!) {
    viewer {
      ...JobDetailsInformationViewerPermitsFragment
    }

    node(id: $jobId) {
      ...JobDetailsInformationFragment
    }
  }

  fragment JobDetailsInformationViewerPermitsFragment on Viewer {
    permits {
      canViewOpportunities
    }
  }

  fragment JobDetailsInformationFragment on Job {
    vertical {
      id
    }
    id
    createdAt
    isSpecializable
    specialization {
      id
      title
    }
    status
    timeZonePreference {
      ...TimeZoneFragment
    }
    workingTimeTo
    workingTimeFrom
    hasPreferredHours
    hoursOverlapEnum
    salesforceLink {
      text
      url
    }
    workType
    timeLengthOnsite
    jobType
    highPriority
    highPriorityReason
    commitment
    talentCount
    client {
      id
      enterprise
      fullTimeDiscount
      partTimeDiscount
    }
    startDate
    originalJob {
      id
      ...WebResourceFragment
    }
    opportunity {
      id
      name
      webResource {
        url
      }
    }
    countryRequirements {
      nodes {
        code
        id
        name
      }
    }
    toptalProjects
    languages {
      nodes {
        id
        name
      }
    }
    nicheLongShot
    skillLongShot
    categories {
      nodes {
        id
        name
      }
    }
    currentEngagement {
      id
      commitment
      currentCommitment {
        availability
      }
    }
    expectedWeeklyHours
    hiddenForTalents
    commitmentMinimumHours
    maxHourlyRate
    budgetDetails
    uncertainOfBudgetReason
    uncertainOfBudgetReasonComment
    location {
      cityName
      country {
        code
        id
        name
      }
      stateName
    }
    estimatedLength
    estimatedEndDate
    description
    positionQuestions {
      nodes {
        id
      }
    }
    skillSets {
      nodes {
        ...JobDetailsSkillSetFragment
      }
      totalCount
    }
    industries {
      nodes {
        id
        name
      }
    }
    presalesEngagement
    presalesEngagementComment
    pendingTalentReason
    pendingTalentReasonNotes
    estimatedWeeklyRevenueTalent
    requiredApplicationPitch
    ...JobOperationsFragment
  }

  fragment JobDetailsSkillSetFragment on SkillSet {
    id
    rating
    connections {
      totalCount
    }
    skill {
      id
      name
      category {
        id
        title
        position
      }
    }
    main
    niceToHave
  }

  fragment JobOperationsFragment on Job {
    operations {
      updateJobEstimatedEndDate {
        ...OperationFragment
      }
      updateJobMatcherQuestions {
        ...OperationFragment
      }
      updateJobPresalesEngagement {
        ...OperationFragment
      }
      setJobPriority {
        callable
        messages
      }
      updateJobTalentCount {
        callable
        messages
      }
      updateJobPendingTalentReason {
        callable
        messages
      }
      updateJobEstimatedWeeklyRevenueTalent {
        callable
        messages
      }
    }
  }

  ${OPERATION_FRAGMENT}
  ${WEB_RESOURCE_FRAGMENT}
  ${TIME_ZONE_FRAGMENT}
`
