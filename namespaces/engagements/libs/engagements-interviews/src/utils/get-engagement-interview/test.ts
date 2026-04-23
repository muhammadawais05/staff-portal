import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import { getEngagementInterview } from './get-engagement-interview'

describe('getEngagementInterview', () => {
  describe('when only new interview operation is provided', () => {
    it('returns the new internal interview operation', () => {
      const interview = getEngagementInterview({
        newInterview: {
          id: '1',
          operations: {
            clearAndChangeInternalInterviewProposedTimeSlots: {
              callable: OperationCallableTypes.ENABLED,
              messages: ['New Internal Interview']
            }
          }
        },
        latestInterview: undefined
      })

      expect(
        interview?.operations.clearAndChangeInternalInterviewProposedTimeSlots
          .messages[0]
      ).toBe('New Internal Interview')
    })
  })

  describe('when there is last & new internal interview operation', () => {
    it('returns the last internal interview operation', () => {
      const interview = getEngagementInterview({
        newInterview: {
          id: '1',
          operations: {
            clearAndChangeInternalInterviewProposedTimeSlots: {
              callable: OperationCallableTypes.ENABLED,
              messages: ['New Internal Interview']
            }
          }
        },
        latestInterview: {
          id: '1',
          operations: {
            clearAndChangeInternalInterviewProposedTimeSlots: {
              callable: OperationCallableTypes.ENABLED,
              messages: ['Last Internal Interview']
            }
          }
        }
      })

      expect(
        interview?.operations.clearAndChangeInternalInterviewProposedTimeSlots
          .messages[0]
      ).toBe('Last Internal Interview')
    })
  })
})
