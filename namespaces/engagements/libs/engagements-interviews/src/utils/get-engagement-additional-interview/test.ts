import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

import { getEngagementAdditionalInterview } from './get-engagement-additional-interview'

describe('getEngagementAdditionalInterview', () => {
  describe('when only new interview operation is provided', () => {
    it('returns the new interview operation', () => {
      const interview = getEngagementAdditionalInterview({
        newInterview: {
          id: '1',
          operations: {
            proposeInterviewTimeSlots: createOperationMock({
              messages: ['New Interview']
            }),
            scheduleSingleCommitInterview: {
              callable: OperationCallableTypes.HIDDEN,
              messages: ['New Interview']
            }
          }
        },
        latestInterview: undefined
      })

      expect(interview?.operations.proposeInterviewTimeSlots.messages[0]).toBe(
        'New Interview'
      )
    })
  })

  describe(`when there is latest & new interview operation
      and latest operation has one of the operations callable different than "hidden"`, () => {
    it('returns the latest interview operation', () => {
      const interview = getEngagementAdditionalInterview({
        newInterview: {
          id: '1',
          operations: {
            proposeInterviewTimeSlots: createOperationMock({
              messages: ['New Interview']
            }),
            scheduleSingleCommitInterview: {
              callable: OperationCallableTypes.HIDDEN,
              messages: ['New Interview']
            }
          }
        },
        latestInterview: {
          id: '1',
          operations: {
            proposeInterviewTimeSlots: createOperationMock({
              messages: ['Latest Interview']
            }),
            scheduleSingleCommitInterview: {
              callable: OperationCallableTypes.HIDDEN,
              messages: ['Latest Interview']
            }
          }
        }
      })

      expect(interview?.operations.proposeInterviewTimeSlots.messages[0]).toBe(
        'Latest Interview'
      )
    })
  })

  describe(`when there is latest & new interview operation
      and latest operarion has all operations callable as "hidden"`, () => {
    it('returns the new interview operation', () => {
      const interview = getEngagementAdditionalInterview({
        newInterview: {
          id: '1',
          operations: {
            proposeInterviewTimeSlots: createOperationMock({
              messages: ['New Interview']
            }),
            scheduleSingleCommitInterview: {
              callable: OperationCallableTypes.HIDDEN,
              messages: ['New Interview']
            }
          }
        },
        latestInterview: {
          id: '1',
          operations: {
            proposeInterviewTimeSlots: {
              callable: OperationCallableTypes.HIDDEN,
              messages: ['Latest Interview']
            },
            scheduleSingleCommitInterview: {
              callable: OperationCallableTypes.HIDDEN,
              messages: ['Latest Interview']
            }
          }
        }
      })

      expect(interview?.operations.proposeInterviewTimeSlots.messages[0]).toBe(
        'New Interview'
      )
    })
  })
})
