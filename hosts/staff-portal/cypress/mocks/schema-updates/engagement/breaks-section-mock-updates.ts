import { Engagement, EngagementBreak } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { successMutationMock } from '~integration/mocks/mutations'
import { engagementPageStubs } from '~integration/mocks/request-stubs'

const updateBreaksSectionMocks = ({
  engagement,
  engagementBreak
}: {
  engagement?: Partial<Engagement>
  engagementBreak?: EngagementBreak
} = {}) => {
  const engagementBreaks = engagementBreak ? [engagementBreak] : []

  return cy.stubGraphQLRequests({
    ...engagementPageStubs({
      engagementBreaks: {
        nodes: engagementBreaks,
        totalCount: engagementBreaks.length
      },
      ...engagement
    }),
    GetLazyOperation: ({ variables }) => {
      const engagementId = engagement?.id ?? encodeEntityId('123', 'Engagement')

      if (variables.nodeId === engagementId) {
        return {
          data: {
            node: {
              id: engagement?.id ?? encodeEntityId('123', 'Engagement'),
              operations: {
                ...engagement?.operations,
                __typename: 'EngagementOperations'
              },
              __typename: 'Engagement'
            }
          }
        }
      }

      return {
        data: {
          node: {
            id: engagementBreak?.id ?? encodeEntityId('1', 'EngagementBreak'),
            operations: {
              ...engagementBreak?.operations,
              __typename: 'EngagementBreakOperations'
            },
            __typename: 'EngagementBreak'
          }
        }
      }
    },
    RemoveEngagementBreak: {
      data: { removeEngagementBreak: successMutationMock() }
    },
    RescheduleEngagementBreak: {
      data: { rescheduleEngagementBreak: successMutationMock() }
    },
    ScheduleEngagementBreak: {
      data: { scheduleEngagementBreak: successMutationMock() }
    }
  })
}

export default updateBreaksSectionMocks
