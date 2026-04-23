import { gql } from '@staff-portal/data-layer-service'

import { VERTICAL_FRAGMENT } from '../vertical-fragment'
import { DRAFT_JOB_SKILL_SET_FRAGMENT } from '../draft-job-skill-set-fragment'
import { COMMITMENT_SURVEY_FRAGMENT } from '../commitment-survey-fragment'
import { ESTIMATED_LENGTH_SURVEY_FRAGMENT } from '../estimated-length-survey-fragment'
import { START_DATE_SURVEY_FRAGMENT } from '../start-date-survey-fragment'
import { TALENT_COUNT_SURVEY_FRAGMENT } from '../talent-count-survey-fragment'
import { PROJECT_SPEC_COMPLETENESS_SURVEY_FRAGMENT } from '../project-spec-completeness-survey-fragment'
import { PROJECT_TEAM_INVOLVED_SURVEY_FRAGMENT } from '../project-team-involved-survey-fragment'

export const DRAFT_JOB_FRAGMENT = gql`
  fragment DraftJobFragment on DraftJob {
    id
    title
    description
    createdAt
    hasPreferredHours
    timeZoneName
    workingTimeFrom
    workingTimeTo
    hoursOverlap: hoursOverlapV2
    operations {
      updateSalesDraftJob {
        callable
        messages
      }
      removeSalesDraftJob {
        callable
        messages
      }
    }

    budgetDetails

    commitment
    commitmentSurvey {
      ...CommitmentSurveyFragment
    }

    estimatedLength
    estimatedLengthSurvey {
      ...EstimatedLengthSurveyFragment
    }

    industries(order: { direction: ASC, field: NAME }) {
      nodes {
        id
        name
      }
    }

    maxHourlyRate

    projectSpecCompleteness
    projectSpecCompletenessSurvey {
      ...ProjectSpecCompletenessSurveyFragment
    }

    projectTeamInvolved
    projectTeamInvolvedSurvey {
      ...ProjectTeamInvolvedSurveyFragment
    }

    projectType

    startDate
    startDateSurvey {
      ...StartDateSurveyFragment
    }

    talentCount
    talentCountSurvey {
      ...TalentCountSurveyFragment
    }

    vertical {
      ...VerticalFragment
    }

    verticals {
      edges {
        node {
          ...VerticalFragment
        }
        skillSets {
          nodes {
            ...DraftJobSkillSetFragment
          }
        }
      }
    }
  }
  ${VERTICAL_FRAGMENT}
  ${DRAFT_JOB_SKILL_SET_FRAGMENT}
  ${COMMITMENT_SURVEY_FRAGMENT}
  ${ESTIMATED_LENGTH_SURVEY_FRAGMENT}
  ${START_DATE_SURVEY_FRAGMENT}
  ${TALENT_COUNT_SURVEY_FRAGMENT}
  ${PROJECT_SPEC_COMPLETENESS_SURVEY_FRAGMENT}
  ${PROJECT_TEAM_INVOLVED_SURVEY_FRAGMENT}
`
