import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { useModal } from '@staff-portal/modals-service'

import ConvertSpecializationApplicationButton, {
  Props
} from './ConvertSpecializationApplicationButton'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

const mockUseModal = useModal as jest.Mock

const defaultProps: Props = {
  talentId: 'VjEtVGFsZW50LTY4MTA0Nw',
  specializationTitle: 'Specialization Title',
  specializationApplicationId: 'VjEtVGFsZW50LTY4MTA0Nw',
  specializationId: 'VjEtVGFsZW50LTY4MTA0gT',
  operation: {
    callable: OperationCallableTypes.ENABLED,
    messages: []
  }
}

const arrangeTest = (props = defaultProps) =>
  render(
    <TestWrapper>
      <ConvertSpecializationApplicationButton {...props} />
    </TestWrapper>
  )

describe('ConvertSpecializationApplicationButton', () => {
  it('opens the convert specialization application modal', () => {
    const showModal = jest.fn()

    mockUseModal.mockReturnValue({
      showModal
    })

    arrangeTest()

    fireEvent.click(screen.getByRole('button'))

    expect(showModal).toHaveBeenCalledTimes(1)
  })
})
