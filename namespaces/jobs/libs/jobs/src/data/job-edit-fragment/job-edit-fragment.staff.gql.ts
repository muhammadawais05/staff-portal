import { gql } from '@staff-portal/data-layer-service'

import { JOB_STATUS_FIELDS_FRAGMENT } from '../job-status-fields-fragment/job-status-fields-fragment.staff.gql'

export const JOB_EDIT_FRAGMENT = gql`
  fragment JobEditFragment on Job {
    id
    title
    description
    postedAt
    startDate
    workType
    commitment
    skillLongShot
    nicheLongShot
    maxHourlyRate
    noRateLimit
    uncertainOfBudgetReason
    uncertainOfBudgetReasonComment
    budgetDetails
    hasPreferredHours
    workingTimeFrom
    workingTimeTo
    hiddenForTalents
    hoursOverlapEnum
    estimatedLength
    timeLengthOnsite
    longshotReasons
    expectedWeeklyHours

    ...JobStatusFieldsFragment

    location {
      cityName
      placeId
      country {
        id
      }
    }
    vertical {
      id
      commitmentSettingsApplicable
      skillCategories {
        nodes {
          id
          title
          position
        }
      }
    }
    coreSkills(order: { direction: ASC, field: NAME }) {
      nodes {
        id
        name
        competentProfilesCount
        expertProfilesCount
        strongProfilesCount
        totalProfilesCount
        category {
          id
          title
          position
        }
      }
    }
    commitmentSettings {
      id
      minimumHours
      lastComment
    }
    specialization {
      id
    }
    claimer {
      id
    }
    engagements {
      totalCount
    }
    webResource {
      url
    }
    countryRequirements {
      nodes {
        id
        name
      }
    }
    languages {
      nodes {
        id
        name
      }
    }
    timeZonePreference {
      value
      name
    }
    operations {
      removeJob {
        ...OperationFragment
      }
    }
    industries(order: { direction: ASC, field: NAME }) {
      nodes {
        id
        name
      }
    }
    skillSets {
      nodes {
        id
        main
        rating
        niceToHave
        skill {
          id
          name
          competentProfilesCount
          expertProfilesCount
          strongProfilesCount
          totalProfilesCount
          category {
            id
            title
            position
            description
          }
        }
      }
    }
    defaultSkillCategory {
      id
      title
    }
  }

  ${JOB_STATUS_FIELDS_FRAGMENT}
`
