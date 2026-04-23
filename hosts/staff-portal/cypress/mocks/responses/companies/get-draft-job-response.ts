import { Client } from '@staff-portal/graphql/staff'

import { getClientOperations } from '~integration/mocks/fragments'

export const getDraftJobResponse = (client?: Partial<Client>) => ({
  data: {
    viewer: {
      settings: {
        __typename: 'ViewerSettings'
      },
      __typename: 'Viewer'
    },
    staffNode: {
      id: 'VjEtQ2xpZW50LTMzNzkzOQ',
      claimer: {
        id: 'VjEtU3RhZmYtMTE0OTkyOQ',
        __typename: 'Staff'
      },
      draftJobs: {
        nodes: [],
        __typename: 'DraftJobConnection'
      },
      defaultDraftJob: {
        title: '',
        description: '',
        commitment: null,
        commitmentSurvey: {
          question: 'What is their expected Engagement Type (FT, PT, Hourly)?',
          options: [
            {
              description: 'Not discussed, not applicable or unsure',
              label: 'N/A',
              value: null,
              __typename: 'DraftJobCommitmentSurveyOption'
            }
          ],
          __typename: 'DraftJobCommitmentSurvey'
        },
        estimatedLength: null,
        estimatedLengthSurvey: {
          question: 'Expected engagement duration?',
          options: [
            {
              description: 'Not discussed, not applicable or unsure',
              label: 'N/A',
              value: null,
              __typename: 'DraftJobEstimatedLengthSurveyOption'
            }
          ],
          __typename: 'DraftJobEstimatedLengthSurvey'
        },
        startDate: null,
        startDateSurvey: {
          question: 'How soon do they want to start (urgency)?',
          options: [
            {
              description: 'ASAP',
              label: '5',
              value: '2021-12-09',
              __typename: 'DraftJobStartDateSurveyOption'
            }
          ],
          __typename: 'DraftJobStartDateSurvey'
        },
        vertical: {
          id: 'VjEtVmVydGljYWwtMQ',
          talentType: 'developer',
          defaultSkillCategory: {
            id: 'VjEtU2tpbGxDYXRlZ29yeS0yOQ',
            __typename: 'SkillCategory'
          },
          __typename: 'Vertical'
        },
        verticals: {
          edges: [
            {
              node: {
                id: 'VjEtVmVydGljYWwtMQ',
                talentType: 'developer',
                defaultSkillCategory: {
                  id: 'VjEtU2tpbGxDYXRlZ29yeS0yOQ',
                  __typename: 'SkillCategory'
                },
                __typename: 'Vertical'
              },
              skillSets: {
                nodes: [],
                __typename: 'DraftJobSkillSetConnection'
              },
              __typename: 'DraftJobVerticalEdge'
            }
          ],
          __typename: 'DraftJobVerticalEdgedConnection'
        },
        __typename: 'ClientDefaultDraftJobValues'
      },
      operations: getClientOperations(),
      ...client,
      __typename: 'Client'
    }
  }
})
