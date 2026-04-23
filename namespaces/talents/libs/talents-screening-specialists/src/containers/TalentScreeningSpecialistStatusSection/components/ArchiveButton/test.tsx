import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useModal } from '@staff-portal/modals-service'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

import ArchiveModal from '../../../ArchiveModal'
import ArchiveButton, { Props } from './ArchiveButton'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

const useModalMock = useModal as jest.Mock
const showModal = jest.fn()

const assignmentId = '123'

const buttonProps = {
  assignmentId,
  operation: createOperationMock()
} as Props

const modalProps = {
  assignmentIds: [assignmentId]
}

const arrangeTest = (props: Props) => {
  useModalMock.mockReturnValue({ showModal })

  render(
    <TestWrapper>
      <ArchiveButton {...props} />
    </TestWrapper>
  )
}

describe('ArchiveButton', () => {
  it('opens the archive specialist assignment modal', () => {
    arrangeTest(buttonProps)

    expect(useModalMock).toHaveBeenCalledTimes(1)
    expect(useModalMock).toHaveBeenCalledWith(ArchiveModal, modalProps)
  })
})
