import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'

import { JOB_SKILL_SET_FRAGMENT } from '../job-skill-set-fragment'

export const JOB_SOURCING_REQUEST_FRAGMENT = gql`
  fragment JobSourcingRequestFragment on SourcingRequest {
    id
    status

    enterpriseJobStatus
    canShareCompanyName
    positions
    positionsComment
    extraInformation
    extraInformationComment
    sellingPoints
    mustHaveSkillsComment
    niceToHaveSkillsComment
    jobStartDeadline
    jobStartDeadlineComment
    furtherQualificationInterviews
    furtherQualificationInterviewsComment
    maximumTalentHourlyRate
    canShareRate
    canShareRateComment
    canIncreaseRate
    canIncreaseRateComment
    onSiteLocation
    onSiteDuration
    whoCoversTravelCosts
    whoCoversTravelCostsComment
    additionalNotes
    hoursOverlap
    timeZonePreference {
      ...TimeZoneFragment
    }
    timeZonePreferenceComment
    citizenshipRequirements
    citizenshipRequirementsComment
    additionalNotes
    skillSets {
      totalCount
      nodes {
        ...JobSkillSetFragment
      }
    }
    clientPartner {
      id
      fullName
      ...WebResourceFragment
    }
    salesClaimer {
      id
      fullName
      ...WebResourceFragment
    }
    talentSpecialist {
      id
      fullName
      ...WebResourceFragment
    }
    noTalentHourlyRateLimit
    operations {
      updateSourcingRequestStatus {
        ...OperationFragment
      }
      updateSourcingRequestTalentSpecialist {
        ...OperationFragment
      }
    }
  }

  ${TIME_ZONE_FRAGMENT}
  ${JOB_SKILL_SET_FRAGMENT}
  ${WEB_RESOURCE_FRAGMENT}
  ${OPERATION_FRAGMENT}
`
