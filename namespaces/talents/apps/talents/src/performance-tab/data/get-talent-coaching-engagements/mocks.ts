import { encodeEntityId } from '@staff-portal/data-layer-service'
import { createTalentCoachingEngagementFragmentMock } from '@staff-portal/talents-coaching/src/mocks'

import { GET_TALENT_COACHING_ENGAGEMENTS } from './get-talent-coaching-engagements.staff.gql'

export const createGetTalentCoachingEngagementsMock = (talentId: string) => ({
  request: {
    query: GET_TALENT_COACHING_ENGAGEMENTS,
    variables: {
      talentId: talentId
    }
  },
  result: {
    data: {
      node: {
        id: encodeEntityId('1000', 'Test'),

        coachingEngagements: {
          nodes: [createTalentCoachingEngagementFragmentMock()]
        }
      }
    }
  }
})
