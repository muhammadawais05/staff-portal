import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { useModal } from '@staff-portal/modals-service'

import ResumeTalentSpecializationApplicationButton, {
  Props
} from './ResumeTalentSpecializationApplicationButton'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

const mockUseModal = useModal as jest.Mock

const defaultProps: Props = {
  talentName: 'Talent name',
  talentId: '123',
  specializationId: '456',
  specializationTitle: 'Default Title',
  operation: {
    callable: OperationCallableTypes.ENABLED,
    messages: []
  }
}

const arrangeTest = (props = defaultProps) =>
  render(
    <TestWrapper>
      <ResumeTalentSpecializationApplicationButton {...props} />
    </TestWrapper>
  )

describe('ResumeTalentSpecializationApplicationButton', () => {
  it('opents the resume talent specialization application modal', async () => {
    const showModal = jest.fn()

    mockUseModal.mockReturnValue({
      showModal
    })

    arrangeTest()

    fireEvent.click(screen.getByRole('button'))

    expect(showModal).toHaveBeenCalledTimes(1)
  })
})
