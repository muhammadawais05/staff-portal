import {
  TalentInfractionReasonValue,
  TalentInfractionStatusValue
} from '@staff-portal/graphql/staff'

import { GET_TALENT_INFRACTIONS_LIST } from './get-infractions-list.staff.gql'

const DEFAULT_VARIABLES = {
  filter: {
    badges: {
      keywords: ['Javascript', 'PHP'],
      logic: 'AND'
    }
  },
  order: {
    field: 'OCCURRED_AT',
    direction: 'DESC'
  },
  pagination: {
    offset: 0,
    limit: 10
  }
}

export const createGetInfractionsListMock = (
  variables = DEFAULT_VARIABLES
) => ({
  request: {
    query: GET_TALENT_INFRACTIONS_LIST,
    variables
  },
  result: {
    data: {
      talentInfractions: {
        nodes: [
          {
            id: 'infraction-id',
            createdAt: '2021-04-23T21:29:10+07:00',
            occurredAt: '2021-04-23',
            summary: 'Bad Interview',
            reasonSlug:
              TalentInfractionReasonValue.RELIABILITY_UNRELIABLE_BEHAVIOUR,
            status: TalentInfractionStatusValue.PENDING_REVIEW,
            attachments: {
              nodes: [],
              totalCount: 0,
              __typename: 'TalentInfractionAttachmentConnection'
            },
            creator: {
              id: 'creator_id',
              webResource: {
                text: 'creator name',
                url: 'http://url',
                __typename: 'Link'
              },
              __typename: 'Staff'
            },
            description: 'test',
            engagement: null,
            review: null,
            taskAssignee: null,
            talent: {
              id: 'talent_id',
              webResource: {
                text: 'Talent name',
                url: null,
                __typename: 'Link'
              },
              __typename: 'Talent'
            },
            operations: {
              changeInfraction: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              removeInfraction: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              __typename: 'TalentInfractionOperations'
            },
            __typename: 'TalentInfraction'
          }
        ],
        totalCount: 1,
        __typename: 'TalentInfractionConnection'
      },
      viewer: {
        permits: {
          createTalentInfractions: true,
          __typename: 'Permits'
        },
        __typename: 'Viewer'
      }
    }
  }
})
