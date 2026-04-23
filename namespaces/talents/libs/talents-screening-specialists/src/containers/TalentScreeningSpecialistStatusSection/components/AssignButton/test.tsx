import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@testing-library/react'
import { useModal } from '@staff-portal/modals-service'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

import { createSpecialistAssignmentMock } from '../../data/mocks'
import AssignModal from '../AssignModal'
import AssignButton, { Props } from './AssignButton'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

const useModalMock = useModal as jest.Mock
const showModal = jest.fn()
const TALENT_ID = '123'
const ASSIGNMENT = createSpecialistAssignmentMock()

const buttonProps = {
  talentId: TALENT_ID,
  assignment: ASSIGNMENT,
  operation: createOperationMock()
} as Props

const modalProps = {
  talentId: TALENT_ID,
  initialAssignment: ASSIGNMENT
}

const arrangeTest = (props: Props) => {
  useModalMock.mockReturnValue({ showModal })

  render(
    <TestWrapper>
      <AssignButton {...props} />
    </TestWrapper>
  )
}

describe('AssignButton', () => {
  it('opens the assign screening specialist modal', () => {
    arrangeTest(buttonProps)

    expect(useModalMock).toHaveBeenCalledTimes(1)
    expect(useModalMock).toHaveBeenCalledWith(AssignModal, modalProps)
  })
})
