import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { useModal } from '@staff-portal/modals-service'
import { OperationFragment } from '@staff-portal/operations'
import { TestWrapper } from '@staff-portal/test-utils'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'

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

import RescheduleInternalInterviewItem, {
  Props
} from './RescheduleInternalInterviewItem'

jest.mock('@staff-portal/modals-service', () => ({
  useModal: jest.fn()
}))

const mockUseModal = useModal as jest.Mock
const showModalMock = jest.fn()

const renderComponent = (props: Props = BASE_PROPS) => {
  mockUseModal.mockImplementation(() => ({ showModal: showModalMock }))

  return render(
    <TestWrapper>
      <RescheduleInternalInterviewItem {...props} />
    </TestWrapper>
  )
}

describe('RescheduleInternalInterviewItem', () => {
  describe('when interview is missing', () => {
    it('hides the item', () => {
      renderComponent()

      expect(
        screen.queryByTestId('reschedule-internal-interview')
      ).not.toBeInTheDocument()
    })
  })

  describe('when last interview is enabled', () => {
    it('shows an enabled item', () => {
      renderComponent({
        ...BASE_PROPS,
        latestInternalInterview: {
          id: '123',
          operations: {
            clearAndChangeInternalInterviewProposedTimeSlots: ENABLED_OPERATION,
            clearAndRescheduleInternalSingleCommitInterview: ENABLED_OPERATION
          }
        },
        newInternalInterview: {
          id: '456',
          operations: {
            clearAndChangeInternalInterviewProposedTimeSlots:
              DISABLED_OPERATION,
            clearAndRescheduleInternalSingleCommitInterview: DISABLED_OPERATION
          }
        }
      })

      fireEvent.click(screen.getByTestId('reschedule-internal-interview'))

      expect(showModalMock).toHaveBeenCalled()
    })
  })

  describe('when last interview is hidden', () => {
    it('hides the the item', () => {
      renderComponent({
        ...BASE_PROPS,
        latestInternalInterview: {
          id: '123',
          operations: {
            clearAndChangeInternalInterviewProposedTimeSlots: HIDDEN_OPERATION,
            clearAndRescheduleInternalSingleCommitInterview: HIDDEN_OPERATION
          }
        },
        newInternalInterview: {
          id: '456',
          operations: {
            clearAndChangeInternalInterviewProposedTimeSlots: ENABLED_OPERATION,
            clearAndRescheduleInternalSingleCommitInterview: ENABLED_OPERATION
          }
        }
      })

      expect(
        screen.queryByTestId('reschedule-internal-interview')
      ).not.toBeInTheDocument()
    })
  })

  describe('when last interview is disabled', () => {
    it('shows an disabled item', () => {
      renderComponent({
        ...BASE_PROPS,
        latestInternalInterview: {
          id: '123',
          operations: {
            clearAndChangeInternalInterviewProposedTimeSlots:
              DISABLED_OPERATION,
            clearAndRescheduleInternalSingleCommitInterview: DISABLED_OPERATION
          }
        },
        newInternalInterview: {
          id: '456',
          operations: {
            clearAndChangeInternalInterviewProposedTimeSlots: ENABLED_OPERATION,
            clearAndRescheduleInternalSingleCommitInterview: ENABLED_OPERATION
          }
        }
      })

      fireEvent.click(screen.getByTestId('reschedule-internal-interview'))

      expect(showModalMock).not.toHaveBeenCalled()
    })
  })

  describe('when last interview is missing', () => {
    it('shows an enabled item', () => {
      renderComponent({
        ...BASE_PROPS,
        newInternalInterview: {
          id: '456',
          operations: {
            clearAndChangeInternalInterviewProposedTimeSlots: ENABLED_OPERATION,
            clearAndRescheduleInternalSingleCommitInterview: ENABLED_OPERATION
          }
        }
      })

      fireEvent.click(screen.getByTestId('reschedule-internal-interview'))

      expect(showModalMock).toHaveBeenCalled()
    })
  })

  describe('when new external interview is missing', () => {
    it('hides the item', () => {
      renderComponent({
        ...BASE_PROPS,
        latestInternalInterview: {
          id: '123',
          operations: {
            clearAndChangeInternalInterviewProposedTimeSlots:
              DISABLED_OPERATION,
            clearAndRescheduleInternalSingleCommitInterview: DISABLED_OPERATION
          }
        }
      })

      expect(
        screen.queryByTestId('reschedule-internal-interview')
      ).not.toBeInTheDocument()
    })
  })
})
