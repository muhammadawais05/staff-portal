import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'
import { JOB_SKILL_SET_FRAGMENT } from '@staff-portal/jobs'

import { SOURCING_REQUEST_JOB_FRAGMENT } from '../../../../data/sourcing-request-job-fragment/sourcing-request-job-fragment.staff.gql'

export const SOURCING_REQUEST_FOR_EDIT_FRAGMENT = gql`
  fragment SourcingRequestForEditFragment on SourcingRequest {
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
    job {
      ...SourcingRequestJobFragment
    }
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
    operations {
      updateSourcingRequest {
        ...OperationFragment
      }
    }
  }

  ${TIME_ZONE_FRAGMENT}
  ${JOB_SKILL_SET_FRAGMENT}
  ${OPERATION_FRAGMENT}
  ${SOURCING_REQUEST_JOB_FRAGMENT}
`
