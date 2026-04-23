import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { useModal } from '@staff-portal/modals-service'

import SendTalentToSpecializationButton, {
  Props
} from './SendTalentToSpecializationButton'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

const mockUseModal = useModal as jest.Mock

const defaultProps: Props = {
  talentName: 'Talent name',
  talentId: 'VjEtVGFsZW50LTY4MTA0Nw',
  operation: {
    callable: OperationCallableTypes.ENABLED,
    messages: []
  }
}

const arrangeTest = (props = defaultProps) =>
  render(
    <TestWrapper>
      <SendTalentToSpecializationButton {...props} />
    </TestWrapper>
  )

describe('SendTalentToSpecializationButton', () => {
  it('opens the send talent to a specialization modal', async () => {
    const showModal = jest.fn()

    mockUseModal.mockReturnValue({
      showModal
    })

    arrangeTest()

    fireEvent.click(screen.getByRole('button'))

    expect(showModal).toHaveBeenCalledTimes(1)
  })
})
