import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import { extractRescheduleInternalInterviewOperation } from './extract-reschedule-internal-interview-operation'

describe('extractRescheduleInterviewOperation', () => {
  describe('when the `node` field is missing', () => {
    it('returns undefined', () => {
      expect(extractRescheduleInternalInterviewOperation({})).toBeUndefined()
    })
  })

  describe('when the `newInternalInterview` field is missing', () => {
    it('returns undefined', () => {
      expect(
        extractRescheduleInternalInterviewOperation({
          latestInternalInterview: null,
          newInternalInterview: null
        })
      ).toBeUndefined()
    })
  })

  describe('when only new interview is provided', () => {
    it('returns new interview', () => {
      const operation = extractRescheduleInternalInterviewOperation({
        latestInternalInterview: null,
        newInternalInterview: {
          id: '1',
          operations: {
            clearAndRescheduleInternalSingleCommitInterview: {
              callable: OperationCallableTypes.ENABLED,
              messages: ['New Internal Interview']
            },
            clearAndChangeInternalInterviewProposedTimeSlots: {
              callable: OperationCallableTypes.ENABLED,
              messages: ['New Internal Interview']
            }
          }
        }
      })

      expect(operation?.messages[0]).toBe('New Internal Interview')
    })
  })

  describe('when there is last & new interview', () => {
    it('returns the last internal interview operation', () => {
      const operation = extractRescheduleInternalInterviewOperation({
        latestInternalInterview: {
          id: '2',
          operations: {
            clearAndRescheduleInternalSingleCommitInterview: {
              callable: OperationCallableTypes.ENABLED,
              messages: ['Last Internal Interview']
            },
            clearAndChangeInternalInterviewProposedTimeSlots: {
              callable: OperationCallableTypes.ENABLED,
              messages: ['Last Internal Interview']
            }
          }
        },
        newInternalInterview: {
          id: '1',
          operations: {
            clearAndRescheduleInternalSingleCommitInterview: {
              callable: OperationCallableTypes.ENABLED,
              messages: ['New Internal Interview']
            },
            clearAndChangeInternalInterviewProposedTimeSlots: {
              callable: OperationCallableTypes.ENABLED,
              messages: ['New Internal Interview']
            }
          }
        }
      })

      expect(operation?.messages[0]).toBe('Last Internal Interview')
    })
  })
})
