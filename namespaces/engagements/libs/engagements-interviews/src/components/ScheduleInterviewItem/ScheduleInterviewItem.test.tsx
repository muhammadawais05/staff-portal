import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { useModal } from '@staff-portal/modals-service'
import { OperationFragment } from '@staff-portal/operations'
import { TestWrapper } from '@staff-portal/test-utils'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'

import ScheduleInterviewItem, { Props } from './ScheduleInterviewItem'

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
  useModal: jest.fn()
}))

const mockUseModal = useModal as jest.Mock
const showModalMock = jest.fn()

const renderComponent = ({
  engagementId = '123',
  latestExternalInterview,
  newExternalInterview
}: Partial<Props> = {}) => {
  mockUseModal.mockImplementation(() => ({ showModal: showModalMock }))

  return render(
    <TestWrapper>
      <ScheduleInterviewItem
        componentType='button'
        engagementId={engagementId}
        latestExternalInterview={latestExternalInterview}
        newExternalInterview={newExternalInterview}
      />
    </TestWrapper>
  )
}

describe('ScheduleInterviewItem', () => {
  describe('when interview is missing', () => {
    it('hides the item', () => {
      renderComponent()

      expect(
        screen.queryByTestId('schedule-interview-item')
      ).not.toBeInTheDocument()
    })
  })

  describe('when last interview is enabled', () => {
    it('shows an enabled item', () => {
      renderComponent({
        latestExternalInterview: {
          id: '123',
          operations: {
            proposeInterviewTimeSlots: ENABLED_OPERATION,
            scheduleSingleCommitInterview: ENABLED_OPERATION
          }
        },
        newExternalInterview: {
          id: '456',
          operations: {
            proposeInterviewTimeSlots: DISABLED_OPERATION,
            scheduleSingleCommitInterview: DISABLED_OPERATION
          }
        }
      })

      fireEvent.click(screen.getByTestId('schedule-interview-item'))

      expect(showModalMock).toHaveBeenCalled()
    })
  })

  describe('when last interview is hidden', () => {
    it('hides the the item', () => {
      renderComponent({
        latestExternalInterview: {
          id: '123',
          operations: {
            proposeInterviewTimeSlots: HIDDEN_OPERATION,
            scheduleSingleCommitInterview: HIDDEN_OPERATION
          }
        },
        newExternalInterview: {
          id: '456',
          operations: {
            proposeInterviewTimeSlots: ENABLED_OPERATION,
            scheduleSingleCommitInterview: ENABLED_OPERATION
          }
        }
      })

      expect(
        screen.queryByTestId('schedule-interview-item')
      ).not.toBeInTheDocument()
    })
  })

  describe('when last interview is disabled', () => {
    it('shows an disabled item', () => {
      renderComponent({
        latestExternalInterview: {
          id: '123',
          operations: {
            proposeInterviewTimeSlots: DISABLED_OPERATION,
            scheduleSingleCommitInterview: DISABLED_OPERATION
          }
        },
        newExternalInterview: {
          id: '456',
          operations: {
            proposeInterviewTimeSlots: ENABLED_OPERATION,
            scheduleSingleCommitInterview: ENABLED_OPERATION
          }
        }
      })

      fireEvent.click(screen.getByTestId('schedule-interview-item'))

      expect(showModalMock).not.toHaveBeenCalled()
    })
  })

  describe('when last interview is missing', () => {
    it('shows an enabled item', () => {
      renderComponent({
        newExternalInterview: {
          id: '456',
          operations: {
            proposeInterviewTimeSlots: ENABLED_OPERATION,
            scheduleSingleCommitInterview: ENABLED_OPERATION
          }
        }
      })

      fireEvent.click(screen.getByTestId('schedule-interview-item'))

      expect(showModalMock).toHaveBeenCalled()
    })
  })

  describe('when new external interview is missing', () => {
    it('hides the item', () => {
      renderComponent({
        latestExternalInterview: {
          id: '123',
          operations: {
            proposeInterviewTimeSlots: DISABLED_OPERATION,
            scheduleSingleCommitInterview: DISABLED_OPERATION
          }
        }
      })

      expect(
        screen.queryByTestId('schedule-interview-item')
      ).not.toBeInTheDocument()
    })
  })
})
