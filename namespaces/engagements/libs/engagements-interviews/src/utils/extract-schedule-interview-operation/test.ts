import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

import { extractScheduleInterviewOperation } from './extract-schedule-interview-operation'

describe('extractScheduleInterviewOperation', () => {
  describe('when the data is missing', () => {
    it('returns undefined', () => {
      expect(extractScheduleInterviewOperation({})).toBeUndefined()
    })
  })

  describe('when the `newExternalInterview` field is missing', () => {
    it('return undefined', () => {
      const operation = extractScheduleInterviewOperation({
        latestExternalInterview: null,
        newExternalInterview: null
      })

      expect(operation).toBeUndefined()
    })
  })

  it('return the new external interview operation', () => {
    const operation = extractScheduleInterviewOperation({
      latestExternalInterview: null,
      newExternalInterview: {
        id: '1',
        operations: {
          proposeInterviewTimeSlots: createOperationMock({
            messages: ['New External Interview']
          }),
          scheduleSingleCommitInterview: {
            callable: OperationCallableTypes.HIDDEN,
            messages: ['New External Interview']
          }
        }
      }
    })

    expect(operation?.messages[0]).toBe('New External Interview')
  })

  it('return the last external interview operation', () => {
    const operation = extractScheduleInterviewOperation({
      latestExternalInterview: {
        id: '2',
        operations: {
          proposeInterviewTimeSlots: createOperationMock({
            messages: ['Last External Interview']
          }),
          scheduleSingleCommitInterview: {
            callable: OperationCallableTypes.HIDDEN,
            messages: ['Last External Interview']
          }
        }
      },
      newExternalInterview: {
        id: '1',
        operations: {
          proposeInterviewTimeSlots: createOperationMock({
            messages: ['New External Interview']
          }),
          scheduleSingleCommitInterview: {
            callable: OperationCallableTypes.HIDDEN,
            messages: ['New External Interview']
          }
        }
      }
    })

    expect(operation?.messages[0]).toBe('Last External Interview')
  })
})
