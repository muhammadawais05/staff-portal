import { render } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { ConfirmationModal } from '@staff-portal/modals-service'

import EnableMobileAppModal from './EnableMobileAppModal'

jest.mock('@staff-portal/modals-service', () => ({
  ConfirmationModal: jest.fn()
}))
jest.mock('./data', () => ({
  useEnableMobileApp: () => [() => {}, { loading: false }]
}))

const mockedConfirmationModal = ConfirmationModal as jest.Mock

const renderComponent = () => {
  render(
    <TestWrapper>
      <EnableMobileAppModal companyId='123' hideModal={() => null} />
    </TestWrapper>
  )
}

describe('EnableMobileAppModal', () => {
  beforeEach(() => {
    mockedConfirmationModal.mockReturnValue(null)
  })

  it('renders modal', () => {
    renderComponent()

    expect(mockedConfirmationModal).toHaveBeenCalledTimes(1)
    expect(mockedConfirmationModal).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        title: 'Enable Mobile App Access',
        placeholder: 'Please specify a reason.',
        submitText: 'Enable',
        textFieldName: 'comment',
        label: 'Comment'
      }),
      {}
    )
  })
})
