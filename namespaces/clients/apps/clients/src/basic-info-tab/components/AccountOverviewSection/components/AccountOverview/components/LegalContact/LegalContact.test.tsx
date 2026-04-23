import React from 'react'
import { render, screen } from '@testing-library/react'
import { Button } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'
import { isOperationEnabled } from '@staff-portal/operations'
import { CompanyOperationFragment } from '@staff-portal/clients'
import { useModal } from '@staff-portal/modals-service'

import LegalContact from '.'
import { CompanyOverviewFragment } from '../../../../data'

jest.mock('@staff-portal/operations/src/utils')
jest.mock('./components/UpdateLegalStatusModal', () => ({
  __esModule: true,
  default: 'UpdateLegalContactModal'
}))

jest.mock('@toptal/picasso/Button', () => jest.fn())
jest.mock('@staff-portal/modals-service', () => ({
  useModal: jest.fn()
}))

const isOperationEnabledMock = isOperationEnabled as jest.Mock
const ButtonMock = Button as unknown as jest.Mock
const useModalMock = useModal as unknown as jest.Mock

const contact = {} as CompanyOverviewFragment['contact']
const modalProps = {
  clientId: '1',
  contact,
  signerFullName: 'SignerFullName',
  signerEmail: 'SignerEmail'
}
const showModal = jest.fn()

const renderComponent = (operationEnabled = true) => {
  isOperationEnabledMock.mockImplementation(() => operationEnabled)
  useModalMock.mockReturnValue({ showModal })

  return render(
    <TestWrapper>
      <LegalContact
        {...modalProps}
        operation={{} as CompanyOperationFragment}
      />
    </TestWrapper>
  )
}

describe('LegalContact', () => {
  beforeEach(() => {
    ButtonMock.mockReturnValue(null)
  })

  it('checks if operation is enabled', () => {
    renderComponent()

    expect(isOperationEnabledMock).toHaveBeenCalledTimes(1)
  })

  it('calls use modal hook', () => {
    renderComponent()

    expect(useModalMock).toHaveBeenCalledTimes(1)
    expect(useModalMock).toHaveBeenCalledWith(
      'UpdateLegalContactModal',
      modalProps
    )
  })

  it('renders email and name', () => {
    renderComponent()

    expect(screen.getByText('SignerFullName (SignerEmail)')).toBeInTheDocument()
  })

  describe('when operation is enabled', () => {
    it('renders button', () => {
      renderComponent(true)

      expect(ButtonMock).toHaveBeenCalledTimes(1)
      expect(ButtonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          variant: 'secondary',
          size: 'small',
          children: 'Edit',
          onClick: showModal
        }),
        {}
      )
    })
  })

  describe('when operation is not enabled', () => {
    it("doesn't render button", () => {
      renderComponent(false)

      expect(ButtonMock).not.toHaveBeenCalled()
    })
  })
})
