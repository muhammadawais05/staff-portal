import { render } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { ConfirmationModal } from '@staff-portal/modals-service'

import DisableMobileAppModal from './DisableMobileAppModal'

jest.mock('@staff-portal/modals-service', () => ({
  ConfirmationModal: jest.fn()
}))
jest.mock('./data', () => ({
  useDisableMobileApp: () => [() => {}, { loading: false }]
}))

const mockedConfirmationModal = ConfirmationModal as jest.Mock

const renderComponent = () => {
  render(
    <TestWrapper>
      <DisableMobileAppModal companyId='123' hideModal={() => null} />
    </TestWrapper>
  )
}

describe('DisableMobileAppModal', () => {
  beforeEach(() => {
    mockedConfirmationModal.mockReturnValue(null)
  })

  it('renders modal', () => {
    renderComponent()

    expect(mockedConfirmationModal).toHaveBeenCalledTimes(1)
    expect(mockedConfirmationModal).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        title: 'Disable Mobile App Access',
        placeholder: 'Please specify a reason.',
        submitText: 'Disable',
        textFieldName: 'comment',
        label: 'Comment'
      }),
      {}
    )
  })
})
