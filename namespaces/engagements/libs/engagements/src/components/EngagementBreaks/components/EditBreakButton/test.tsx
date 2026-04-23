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

import EditBreakButton from './EditBreakButton'

jest.mock('@staff-portal/modals-service', () => ({
  useModal: jest.fn()
}))

jest.mock('../../../ScheduleBreakModal', () => null)

const mockUseModal = useModal as jest.Mock
const showModalMock = jest.fn()

const enabledOperationMock = createOperationMock()
const hiddenOperationMock = createOperationMock({
  callable: OperationCallableTypes.HIDDEN
})

const arrangeTest = (operation: OperationFragment) => {
  render(
    <TestWrapper>
      <EditBreakButton
        engagementId='abc'
        engagementBreakId='1'
        operation={operation}
        initialValues={{
          startDate: '2020-10-10T00:00:00+00:00'
        }}
        engagementStatus={EngagementStatus.ACTIVE}
      />
    </TestWrapper>
  )
}

describe('EditBreakButton', () => {
  beforeEach(() => {
    mockUseModal.mockImplementation(() => ({ showModal: showModalMock }))
  })

  it('hides the button', () => {
    arrangeTest(hiddenOperationMock)
    expect(screen.queryByText('Edit')).not.toBeInTheDocument()
  })

  it('shows the button', () => {
    arrangeTest(enabledOperationMock)
    expect(screen.queryByText('Edit')).toBeInTheDocument()
  })

  it('calls useModal with correct params', () => {
    arrangeTest(enabledOperationMock)

    expect(mockUseModal).toHaveBeenCalledTimes(1)
    expect(mockUseModal).toHaveBeenCalledWith(null, {
      breakType: 0,
      engagementBreakId: '1',
      engagementId: 'abc',
      initialValues: { startDate: '2020-10-10T00:00:00+00:00' },
      scheduleType: 1,
      status: 'ACTIVE'
    })
  })

  it('does not call for the modal', async () => {
    arrangeTest(enabledOperationMock)
    expect(showModalMock).toHaveBeenCalledTimes(0)
  })

  it('calls for the modal', () => {
    arrangeTest(enabledOperationMock)
    fireEvent.click(screen.getByText('Edit'))
    expect(showModalMock).toHaveBeenCalledTimes(1)
  })
})
