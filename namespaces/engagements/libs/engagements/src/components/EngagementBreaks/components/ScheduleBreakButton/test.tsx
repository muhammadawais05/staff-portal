import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import {
  EngagementStatus,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { useModal } from '@staff-portal/modals-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { OperationFragment } from '@staff-portal/operations'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

import ScheduleBreakButton from './ScheduleBreakButton'

jest.mock('../../../ScheduleBreakModal', () => null)

jest.mock('@staff-portal/modals-service', () => ({
  useModal: jest.fn()
}))

const mockUseModal = useModal as jest.Mock
const showModalMock = jest.fn()

const enabledOperationMock = createOperationMock()
const hiddenOperationMock = createOperationMock({
  callable: OperationCallableTypes.HIDDEN
})

const arrangeTest = (operation: OperationFragment) => {
  render(
    <TestWrapper>
      <ScheduleBreakButton
        engagementId='1'
        operation={operation}
        status={EngagementStatus.ACTIVE}
      />
    </TestWrapper>
  )
}

describe('ScheduleBreakButton', () => {
  beforeEach(() => {
    mockUseModal.mockImplementation(() => ({ showModal: showModalMock }))
  })

  it('hides the button', () => {
    arrangeTest(hiddenOperationMock)
    expect(screen.queryByText('Schedule a Break')).not.toBeInTheDocument()
  })

  it('shows the button', () => {
    arrangeTest(enabledOperationMock)
    expect(screen.queryByText('Schedule a Break')).toBeInTheDocument()
  })

  it('calls useModal with correct params', () => {
    arrangeTest(enabledOperationMock)

    expect(mockUseModal).toHaveBeenCalledTimes(1)
    expect(mockUseModal).toHaveBeenCalledWith(null, {
      engagementId: '1',
      scheduleType: 0,
      engagementBreakId: undefined,
      status: 'ACTIVE'
    })
  })

  it('does not call for the modal', async () => {
    arrangeTest(enabledOperationMock)
    expect(showModalMock).toHaveBeenCalledTimes(0)
  })

  it('calls for the modal', () => {
    arrangeTest(enabledOperationMock)
    fireEvent.click(screen.getByText('Schedule a Break'))
    expect(showModalMock).toHaveBeenCalledTimes(1)
  })
})
