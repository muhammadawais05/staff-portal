import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@toptal/picasso/test-utils'
import { Button } from '@toptal/picasso'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'
import { useModal } from '@staff-portal/modals-service'

import DeleteStaffButton from './DeleteStaffButton'

jest.mock('@staff-portal/operations', () => ({
  Operation: jest.fn()
}))
jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))
jest.mock('@toptal/picasso/Button', () => jest.fn())

const mockStaffId = '123'
const mockFullName = 'Andrei'
const mockOperationType = 'deactivateStaff'

const mockOperation = Operation as jest.Mock
const mockUseModal = useModal as jest.Mock
const mockButton = Button as unknown as jest.Mock
const mockShowModal = jest.fn()

const renderComponent = () => {
  mockOperation.mockImplementation(children => <div>{children.render()}</div>)
  mockUseModal.mockImplementation(() => ({
    showModal: mockShowModal
  }))
  mockButton.mockImplementation(() => <span>Mocked Button</span>)

  render(
    <TestWrapper>
      <DeleteStaffButton
        staffId={mockStaffId}
        fullName={mockFullName}
        operation={mockOperationType as unknown as OperationType}
      />
    </TestWrapper>
  )
}

describe('DeleteStaffButton', () => {
  it('calls component', () => {
    renderComponent()

    expect(mockOperation).toHaveBeenCalledWith(
      {
        inline: false,
        operation: mockOperationType,
        render: expect.any(Function)
      },
      {}
    )
    expect(mockButton).toHaveBeenCalledWith(
      {
        children: 'Delete',
        variant: 'negative',
        onClick: mockShowModal,
        size: 'small',
        disabled: undefined,
        'data-testid': 'delete-staff-button'
      },
      {}
    )
  })
})
