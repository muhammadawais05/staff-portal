import {
  OrderDirection,
  TalentCoachingEngagementOrderField
} from '@staff-portal/graphql/staff'
import { createTalentCoachingEngagementWithActivitiesFragmentMock } from '@staff-portal/talents-coaching/src/mocks'

import { GetTalentCoachingEngagementsListDocument } from './get-talent-coaching-engagements-list.staff.gql.types'

const DEFAULT_VARIABLES = {
  filter: {},
  order: {
    field: TalentCoachingEngagementOrderField.TALENT_ACTIVATED_AT,
    direction: OrderDirection.DESC
  },
  pagination: {
    offset: 0,
    limit: 10
  },
  loadDisputeOperations: true
}

export const createGetTalentCoachingEngagementsList = (
  variables = DEFAULT_VARIABLES
) => ({
  request: {
    query: GetTalentCoachingEngagementsListDocument,
    variables
  },
  result: {
    data: {
      talentCoachingEngagements: {
        nodes: [createTalentCoachingEngagementWithActivitiesFragmentMock()],
        totalCount: 1,
        __typename: 'TalentCoachingEngagementConnection'
      },
      __typename: 'Query'
    }
  }
})

export const createEmptyGetTalentCoachingEngagementsList = (
  variables = DEFAULT_VARIABLES
) => ({
  request: {
    query: GetTalentCoachingEngagementsListDocument,
    variables
  },
  result: {
    data: {
      talentCoachingEngagements: {
        nodes: [],
        totalCount: 0,
        __typename: 'TalentCoachingEngagementConnection'
      },
      __typename: 'Query'
    }
  }
})
