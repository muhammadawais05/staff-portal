import {
  JobCommitment,
  JobEstimatedLengths,
  SkillRating
} from '@staff-portal/graphql/staff'
import { DefaultDraftJobFragment } from '@staff-portal/clients-app'

import { timeZoneMock } from './fragments/time-zone-mock'
import { WithTypename } from '~integration/types'

export const defaultDraftJobMock = (
  job?: Partial<DefaultDraftJobFragment>
): WithTypename<DefaultDraftJobFragment> => ({
  title: 'Draft Job Mock',
  description: null,
  commitment: JobCommitment.FULL_TIME,
  commitmentSurvey: {
    question: 'What is their expected Engagement Type (FT, PT, Hourly)?',
    options: [
      {
        description: 'Not discussed, not applicable or unsure',
        label: 'N/A',
        value: null
      },
      {
        description: 'Hourly',
        label: 'Hourly',
        value: JobCommitment.HOURLY
      }
    ]
  },
  estimatedLength: JobEstimatedLengths.LENGTH_1_2_WEEKS,
  estimatedLengthSurvey: {
    question: 'Expected engagement duration?',
    options: [
      {
        description: 'Not discussed, not applicable or unsure',
        label: 'N/A',
        value: null
      },
      {
        description: '< 40 hours',
        label: '1',
        value: JobEstimatedLengths.LENGTH_1_2_WEEKS
      }
    ]
  },
  hasPreferredHours: false,
  projectSpecCompletenessSurvey: {
    question: 'Spec completeness?',
    options: []
  },
  projectTeamInvolvedSurvey: {
    question: 'Team Involved in the Project',
    options: []
  },
  startDate: '2021-10-26',
  startDateSurvey: {
    question: 'How soon do they want to start (urgency)?',
    options: [
      {
        description: 'Not discussed, not applicable or unsure',
        label: 'N/A',
        value: null
      },
      {
        description: '6-12 months',
        label: '1',
        value: '2022-04-12'
      }
    ]
  },
  talentCountSurvey: {
    question: 'Number of Talent',
    options: []
  },
  timeZone: timeZoneMock(),
  vertical: {
    id: 'VjEtVmVydGljYWwtMQ',
    talentType: 'developer',
    defaultSkillCategory: {
      id: 'VjEtU2tpbGxDYXRlZ29yeS0yOQ'
    }
  },
  verticals: {
    edges: [
      {
        node: {
          id: 'VjEtVmVydGljYWwtMQ',
          talentType: 'developer',
          defaultSkillCategory: {
            id: 'VjEtU2tpbGxDYXRlZ29yeS0yOQ'
          }
        },
        skillSets: {
          nodes: [
            {
              skillSetId: null,
              skillName: 'Redis',
              main: false,
              skillCategory: {
                id: 'VjEtU2tpbGxDYXRlZ29yeS0zMQ'
              },
              niceToHave: false,
              rating: SkillRating.COMPETENT
            }
          ]
        }
      }
    ]
  },
  __typename: 'ClientDefaultDraftJobValues',
  ...job
})
