import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { useModal } from '@staff-portal/modals-service'
import { OperationFragment } from '@staff-portal/operations'
import { TestWrapper } from '@staff-portal/test-utils'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'

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

import ScheduleInternalInterviewItem, {
  Props
} from './ScheduleInternalInterviewItem'

jest.mock('@staff-portal/modals-service', () => ({
  useModal: jest.fn()
}))

const mockUseModal = useModal as jest.Mock
const showModalMock = jest.fn()

const renderComponent = ({
  engagementId = '123',
  latestInternalInterview,
  newInternalInterview
}: Partial<Props> = {}) => {
  mockUseModal.mockImplementation(() => ({ showModal: showModalMock }))

  return render(
    <TestWrapper>
      <ScheduleInternalInterviewItem
        componentType='button'
        engagementId={engagementId}
        latestInternalInterview={latestInternalInterview}
        newInternalInterview={newInternalInterview}
      />
    </TestWrapper>
  )
}

describe('ScheduleInternalInterviewItem', () => {
  describe('when interview is missing', () => {
    it('hides the item', () => {
      renderComponent()

      expect(
        screen.queryByTestId('schedule-internal-interview')
      ).not.toBeInTheDocument()
    })
  })

  describe('when last interview is enabled', () => {
    it('shows an enabled item', () => {
      renderComponent({
        latestInternalInterview: {
          id: '123',
          operations: {
            proposeInternalInterviewTimeSlots: ENABLED_OPERATION,
            scheduleInternalSingleCommitInterview: ENABLED_OPERATION
          }
        },
        newInternalInterview: {
          id: '456',
          operations: {
            proposeInternalInterviewTimeSlots: DISABLED_OPERATION,
            scheduleInternalSingleCommitInterview: DISABLED_OPERATION
          }
        }
      })

      fireEvent.click(screen.getByTestId('schedule-internal-interview'))

      expect(showModalMock).toHaveBeenCalled()
    })
  })

  describe('when last interview is hidden', () => {
    it('hides the the item', () => {
      renderComponent({
        latestInternalInterview: {
          id: '123',
          operations: {
            proposeInternalInterviewTimeSlots: HIDDEN_OPERATION,
            scheduleInternalSingleCommitInterview: HIDDEN_OPERATION
          }
        },
        newInternalInterview: {
          id: '456',
          operations: {
            proposeInternalInterviewTimeSlots: ENABLED_OPERATION,
            scheduleInternalSingleCommitInterview: ENABLED_OPERATION
          }
        }
      })

      expect(
        screen.queryByTestId('schedule-internal-interview')
      ).not.toBeInTheDocument()
    })
  })

  describe('when last interview is disabled', () => {
    it('shows an disabled item', () => {
      renderComponent({
        latestInternalInterview: {
          id: '123',
          operations: {
            proposeInternalInterviewTimeSlots: DISABLED_OPERATION,
            scheduleInternalSingleCommitInterview: DISABLED_OPERATION
          }
        },
        newInternalInterview: {
          id: '456',
          operations: {
            proposeInternalInterviewTimeSlots: ENABLED_OPERATION,
            scheduleInternalSingleCommitInterview: ENABLED_OPERATION
          }
        }
      })

      fireEvent.click(screen.getByTestId('schedule-internal-interview'))

      expect(showModalMock).not.toHaveBeenCalled()
    })
  })

  describe('when last interview is missing', () => {
    it('shows an enabled item', () => {
      renderComponent({
        newInternalInterview: {
          id: '456',
          operations: {
            proposeInternalInterviewTimeSlots: ENABLED_OPERATION,
            scheduleInternalSingleCommitInterview: ENABLED_OPERATION
          }
        }
      })

      fireEvent.click(screen.getByTestId('schedule-internal-interview'))

      expect(showModalMock).toHaveBeenCalled()
    })
  })

  describe('when new external interview is missing', () => {
    it('hides the item', () => {
      renderComponent({
        latestInternalInterview: {
          id: '123',
          operations: {
            proposeInternalInterviewTimeSlots: DISABLED_OPERATION,
            scheduleInternalSingleCommitInterview: DISABLED_OPERATION
          }
        }
      })

      expect(
        screen.queryByTestId('schedule-internal-interview')
      ).not.toBeInTheDocument()
    })
  })
})
