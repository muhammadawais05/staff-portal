import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { ModalActionItem } from '@staff-portal/modals-service'
import { OperationFragment } from '@staff-portal/operations'
import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@toptal/picasso/test-utils'
import React from 'react'

import RescheduleInterviewItem, { Props } from './RescheduleInterviewItem'

const BASE_PROPS: Props = { componentType: 'button' }

const ENABLED_OPERATION: OperationFragment = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}

const DISABLED_OPERATION: OperationFragment = {
  callable: OperationCallableTypes.DISABLED,
  messages: []
}

const HIDDEN_OPERATION: OperationFragment = {
  callable: OperationCallableTypes.HIDDEN,
  messages: []
}

jest.mock('@staff-portal/modals-service', () => ({
  ModalActionItem: jest.fn()
}))

const ModalActionItemMock = ModalActionItem as unknown as jest.Mock

const renderComponent = (props: Props = BASE_PROPS) => {
  ModalActionItemMock.mockImplementation(({ children }) => children)

  return render(
    <TestWrapper>
      <RescheduleInterviewItem {...props} />
    </TestWrapper>
  )
}

describe('RescheduleInterviewItem', () => {
  describe('when interview is missing', () => {
    it('hides the `ModalActionItem`', () => {
      renderComponent()

      expect(ModalActionItemMock).toHaveBeenCalledTimes(0)
    })
  })

  describe('when last interview is enabled', () => {
    it('returns the `ModalActionItem` with enabled operation', () => {
      renderComponent({
        ...BASE_PROPS,
        latestExternalInterview: {
          id: '123',
          operations: {
            clearAndChangeInterviewProposedTimeSlots: ENABLED_OPERATION,
            clearAndRescheduleSingleCommitInterview: ENABLED_OPERATION
          }
        },
        newExternalInterview: {
          id: '456',
          operations: {
            clearAndChangeInterviewProposedTimeSlots: DISABLED_OPERATION,
            clearAndRescheduleSingleCommitInterview: DISABLED_OPERATION
          }
        }
      })

      expect(ModalActionItemMock).toHaveBeenCalledWith(
        expect.objectContaining({
          operation: { callable: OperationCallableTypes.ENABLED, messages: [] }
        }),
        {}
      )
    })
  })

  describe('when last interview is hidden', () => {
    it('returns the `ModalActionItem` with missing operation', () => {
      renderComponent({
        ...BASE_PROPS,
        latestExternalInterview: {
          id: '123',
          operations: {
            clearAndChangeInterviewProposedTimeSlots: HIDDEN_OPERATION,
            clearAndRescheduleSingleCommitInterview: HIDDEN_OPERATION
          }
        },
        newExternalInterview: {
          id: '456',
          operations: {
            clearAndChangeInterviewProposedTimeSlots: ENABLED_OPERATION,
            clearAndRescheduleSingleCommitInterview: ENABLED_OPERATION
          }
        }
      })

      expect(ModalActionItemMock).toHaveBeenCalledWith(
        expect.objectContaining({
          operation: undefined
        }),
        {}
      )
    })
  })

  describe('when last interview is disabled', () => {
    it('returns the `ModalActionItem` with disabled operation', () => {
      renderComponent({
        ...BASE_PROPS,
        latestExternalInterview: {
          id: '123',
          operations: {
            clearAndChangeInterviewProposedTimeSlots: DISABLED_OPERATION,
            clearAndRescheduleSingleCommitInterview: DISABLED_OPERATION
          }
        },
        newExternalInterview: {
          id: '456',
          operations: {
            clearAndChangeInterviewProposedTimeSlots: ENABLED_OPERATION,
            clearAndRescheduleSingleCommitInterview: ENABLED_OPERATION
          }
        }
      })

      expect(ModalActionItemMock).toHaveBeenCalledWith(
        expect.objectContaining({
          operation: {
            callable: OperationCallableTypes.DISABLED,
            messages: []
          }
        }),
        {}
      )
    })
  })

  describe('when last interview is missing', () => {
    it('returns the `ModalActionItem` with enabled operation', () => {
      renderComponent({
        ...BASE_PROPS,
        newExternalInterview: {
          id: '456',
          operations: {
            clearAndChangeInterviewProposedTimeSlots: ENABLED_OPERATION,
            clearAndRescheduleSingleCommitInterview: ENABLED_OPERATION
          }
        }
      })

      expect(ModalActionItemMock).toHaveBeenCalledWith(
        expect.objectContaining({
          operation: {
            callable: OperationCallableTypes.ENABLED,
            messages: []
          }
        }),
        {}
      )
    })
  })

  describe('when new external interview is missing', () => {
    it('returns the `ModalActionItem` with missing operation', () => {
      renderComponent({
        ...BASE_PROPS,
        latestExternalInterview: {
          id: '123',
          operations: {
            clearAndChangeInterviewProposedTimeSlots: DISABLED_OPERATION,
            clearAndRescheduleSingleCommitInterview: DISABLED_OPERATION
          }
        }
      })

      expect(ModalActionItemMock).toHaveBeenCalledWith(
        expect.objectContaining({
          operation: undefined
        }),
        {}
      )
    })
  })
})
