import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import { extractScheduleInternalInterviewOperation } from './extract-schedule-internal-interview-operation'

describe('extractScheduleInterviewOperation', () => {
  describe('when the `node` field is missing', () => {
    it('returns undefined', () => {
      expect(extractScheduleInternalInterviewOperation({})).toBeUndefined()
    })
  })

  describe('when the `newInternalInterview` field is missing', () => {
    it('returns undefined', () => {
      expect(
        extractScheduleInternalInterviewOperation({
          latestInternalInterview: null,
          newInternalInterview: null
        })
      ).toBeUndefined()
    })
  })

  describe('when only new interview is provided', () => {
    it('returns new interview', () => {
      const operation = extractScheduleInternalInterviewOperation({
        latestInternalInterview: null,
        newInternalInterview: {
          id: '1',
          operations: {
            scheduleInternalSingleCommitInterview: {
              callable: OperationCallableTypes.ENABLED,
              messages: ['New Internal Interview']
            },
            proposeInternalInterviewTimeSlots: {
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
      const operation = extractScheduleInternalInterviewOperation({
        latestInternalInterview: {
          id: '2',
          operations: {
            scheduleInternalSingleCommitInterview: {
              callable: OperationCallableTypes.ENABLED,
              messages: ['Last Internal Interview']
            },
            proposeInternalInterviewTimeSlots: {
              callable: OperationCallableTypes.ENABLED,
              messages: ['Last Internal Interview']
            }
          }
        },
        newInternalInterview: {
          id: '1',
          operations: {
            scheduleInternalSingleCommitInterview: {
              callable: OperationCallableTypes.ENABLED,
              messages: ['New Internal Interview']
            },
            proposeInternalInterviewTimeSlots: {
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
