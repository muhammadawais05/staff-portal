import {
  Staff,
  TalentCoachingEngagement,
  TalentCoachingEngagementStatus
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { talentPerformanceStubs } from '~integration/mocks/request-stubs/talents/tabs/performance'
import {
  getCoachingEngagementsResponse,
  getTalentCoachingEngagementResponse
} from '~integration/mocks/responses/talents'
import {
  getTalentCoachingEngagementMock,
  webResourceMock
} from '~integration/mocks/fragments'
import { enabledOperationMock } from '~integration/mocks'
import { successMutationMock } from '~integration/mocks/mutations'
import { getCreateTaskOperationResponse } from '~integration/mocks/responses'

const updateCoachingSectionItemStubs = () => {
  const coachingEngagement = getTalentCoachingEngagementMock({
    operations: {
      assignCoach: enabledOperationMock(),
      changeStatus: enabledOperationMock()
    } as TalentCoachingEngagement['operations']
  })

  return cy.stubGraphQLRequests({
    ...talentPerformanceStubs(),
    GetCoachingEngagementsForTalent: getCoachingEngagementsResponse([
      coachingEngagement
    ]),
    GetTalentCoachingEngagement:
      getTalentCoachingEngagementResponse(coachingEngagement),
    GetCreateTaskOperation: getCreateTaskOperationResponse(),
    GetCoachingAssignees: {
      data: {
        roles: {
          nodes: [
            {
              __typename: 'Staff',
              id: encodeEntityId('123', 'Staff'),
              fullName: 'Timofei Kachalov'
            },
            {
              __typename: 'Staff',
              id: encodeEntityId('456', 'Staff'),
              fullName: 'John Wick'
            }
          ]
        }
      }
    },
    ChangeTalentCoachingEngagementStatus: {
      data: {
        changeTalentCoachingEngagementStatus: successMutationMock({
          talentCoachingEngagement: getTalentCoachingEngagementMock({
            ...coachingEngagement,
            status: TalentCoachingEngagementStatus.CONTACTED
          })
        })
      }
    },
    AssignCoachToTalentCoachingEngagement: {
      data: {
        assignCoachToTalentCoachingEngagement: successMutationMock({
          talentCoachingEngagement: getTalentCoachingEngagementMock({
            ...coachingEngagement,
            coach: {
              __typename: 'Staff',
              id: encodeEntityId('456', 'Staff'),
              fullName: 'John Wick',
              ...webResourceMock({
                text: 'John Wick'
              })
            } as unknown as Staff
          })
        })
      }
    }
  })
}

export default updateCoachingSectionItemStubs
