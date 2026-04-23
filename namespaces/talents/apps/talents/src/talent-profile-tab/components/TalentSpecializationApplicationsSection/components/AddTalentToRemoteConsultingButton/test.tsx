import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { useModal } from '@staff-portal/modals-service'
import { TestWrapper } from '@staff-portal/test-utils'

import AddTalentToRemoteConsultingButton, {
  Props
} from './AddTalentToRemoteConsultingButton'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

const mockUseModal = useModal as jest.Mock

const defaultProps: Props = {
  talentId: 'VjEtVGFsZW50LTY4MTA0Nw',
  operation: {
    callable: OperationCallableTypes.ENABLED,
    messages: []
  }
}

const arrangeTest = (props = defaultProps) =>
  render(
    <TestWrapper>
      <AddTalentToRemoteConsultingButton {...props} />
    </TestWrapper>
  )

describe('AddTalentToRemoteConsultingButton', () => {
  it('shows the add talent to remote consulting modal', async () => {
    const showModal = jest.fn()

    mockUseModal.mockReturnValue({
      showModal
    })

    arrangeTest()

    fireEvent.click(screen.getByRole('button'))

    expect(showModal).toHaveBeenCalledTimes(1)
  })
})
