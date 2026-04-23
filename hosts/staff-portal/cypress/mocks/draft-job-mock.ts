import {
  JobCommitment,
  JobEstimatedLengths,
  SkillRating
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { DraftJobFragment } from '@staff-portal/clients-app'

import { WithTypename } from '~integration/types'
import { enabledOperationMock } from './enabled-operation-mock'

export const draftJobMock = (
  job?: Partial<DraftJobFragment>
): WithTypename<DraftJobFragment> => ({
  id: encodeEntityId('123', 'DraftJob'),
  title: 'Senior Marketing Developer (212049)',
  description: 'Lorem ipsum dolor sit amet',
  createdAt: '2020-06-25T00:30:00+03:00',
  hasPreferredHours: false,
  timeZoneName: 'America/New_York',
  workingTimeFrom: '00:00:00',
  workingTimeTo: '24:00:00',
  hoursOverlap: null,
  operations: {
    updateSalesDraftJob: enabledOperationMock(),
    removeSalesDraftJob: enabledOperationMock()
  },
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
  estimatedLength: JobEstimatedLengths.LENGTH_3_6_MONTHS,
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
  projectSpecCompletenessSurvey: {
    question: 'Spec completeness?',
    options: []
  },
  projectTeamInvolvedSurvey: {
    question: 'Team Involved in the Project',
    options: []
  },
  startDate: '2020-07-08',
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
              skillSetId: 'VjEtU2tpbGxTZXQtNjY3NDY',
              skillName: 'Python',
              main: false,
              skillCategory: {
                id: 'VjEtU2tpbGxDYXRlZ29yeS0zMA'
              },
              niceToHave: false,
              rating: SkillRating.COMPETENT
            }
          ]
        }
      }
    ]
  },
  __typename: 'DraftJob',
  ...job
})
