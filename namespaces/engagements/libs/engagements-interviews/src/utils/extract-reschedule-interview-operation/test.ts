import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import { extractRescheduleInterviewOperation } from './extract-reschedule-interview-operation'

describe('extractRescheduleInterviewOperation', () => {
  describe('when the `node` field is missing', () => {
    it('returns undefined', () => {
      expect(extractRescheduleInterviewOperation({})).toBeUndefined()
    })
  })

  describe('when `newExternalInterview` field is missing', () => {
    it('returns undefined', () => {
      expect(
        extractRescheduleInterviewOperation({
          latestExternalInterview: null,
          newExternalInterview: null
        })
      ).toBeUndefined()
    })
  })

  it('return the new external interview operation', () => {
    const operation = extractRescheduleInterviewOperation({
      latestExternalInterview: null,
      newExternalInterview: {
        id: '1',
        operations: {
          clearAndRescheduleSingleCommitInterview: {
            callable: OperationCallableTypes.ENABLED,
            messages: ['New External Interview']
          },
          clearAndChangeInterviewProposedTimeSlots: {
            callable: OperationCallableTypes.ENABLED,
            messages: ['New External Interview']
          }
        }
      }
    })

    expect(operation?.messages[0]).toBe('New External Interview')
  })

  it('return the last external interview operation', () => {
    const operation = extractRescheduleInterviewOperation({
      latestExternalInterview: {
        id: '2',
        operations: {
          clearAndRescheduleSingleCommitInterview: {
            callable: OperationCallableTypes.ENABLED,
            messages: ['Last External Interview']
          },
          clearAndChangeInterviewProposedTimeSlots: {
            callable: OperationCallableTypes.ENABLED,
            messages: ['Last External Interview']
          }
        }
      },
      newExternalInterview: {
        id: '1',
        operations: {
          clearAndRescheduleSingleCommitInterview: {
            callable: OperationCallableTypes.ENABLED,
            messages: ['New External Interview']
          },
          clearAndChangeInterviewProposedTimeSlots: {
            callable: OperationCallableTypes.ENABLED,
            messages: ['New External Interview']
          }
        }
      }
    })

    expect(operation?.messages[0]).toBe('Last External Interview')
  })
})
