import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@toptal/picasso/test-utils'
import { Button } from '@toptal/picasso'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import EnableTopscreenButton from './EnableTopscreenButton'
import useEnableTopscreenModal from '../../../topscreen-tab/components/EnableTopscreenModal/hooks/use-enable-topscreen-modal/use-enable-topscreen-modal'

jest.mock('@staff-portal/operations', () => ({
  Operation: jest.fn()
}))
jest.mock(
  '../../../topscreen-tab/components/EnableTopscreenModal/hooks/use-enable-topscreen-modal/use-enable-topscreen-modal',
  () => ({
    __esModule: true,
    default: jest.fn()
  })
)
jest.mock('@toptal/picasso/Button', () => jest.fn())

const mockCompanyId = 'mockCompanyId'
const mockOperationType = 'mockOperationType'

const mockOperation = Operation as jest.Mock
const mockUseEnableTopscreenModal = useEnableTopscreenModal as jest.Mock
const mockButton = Button as unknown as jest.Mock
const mockShowModal = jest.fn()

const arrangeTest = () => {
  mockOperation.mockImplementation(children => <div>{children.render()}</div>)
  mockUseEnableTopscreenModal.mockImplementation(() => ({
    showModal: mockShowModal
  }))
  mockButton.mockImplementation(() => <span>Mock Button</span>)

  render(
    <TestWrapper>
      <EnableTopscreenButton
        operation={mockOperationType as unknown as OperationType}
        companyId={mockCompanyId}
      />
    </TestWrapper>
  )
}

describe('EnableTopscreenButton', () => {
  it('Renders component', () => {
    const context = {}

    arrangeTest()

    expect(mockOperation).toHaveBeenCalledWith(
      { operation: mockOperationType, render: expect.any(Function) },
      context
    )
    expect(mockButton).toHaveBeenCalledWith(
      {
        children: 'Enable TopScreen',
        onClick: mockShowModal,
        size: 'small',
        disabled: undefined,
        'data-testid': 'open-enable-topcreen-modal-button'
      },
      context
    )
  })
})
