import { Operation, OperationCallableTypes } from '@staff-portal/graphql/staff'
import { useModal } from '@staff-portal/modals-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'

import MinCommitment from './MinCommitment'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

const mockUseModal = useModal as jest.Mock
const showModalMock = jest.fn()

const OPERATION: Operation = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}

const arrangeTest = () => {
  mockUseModal.mockImplementation(() => ({ showModal: showModalMock }))

  return render(
    <TestWrapper>
      <MinCommitment engagementId='' operation={OPERATION} minimumHours={5} />
    </TestWrapper>
  )
}

describe('MinCommitment', () => {
  it('shows the minimum commitment for engagement', () => {
    arrangeTest()

    expect(screen.getByText('5 hours per week')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Edit'))

    expect(showModalMock).toHaveBeenCalled()
  })
})
