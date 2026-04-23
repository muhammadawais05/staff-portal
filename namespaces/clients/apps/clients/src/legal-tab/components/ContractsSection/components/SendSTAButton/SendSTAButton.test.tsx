import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation } from '@staff-portal/operations'

import SendSTAModal from '../SendSTAModal/SendSTAModal'
import SendSTAButton, { Props } from './SendSTAButton'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Button: jest.fn()
}))

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

jest.mock('@staff-portal/operations', () => ({
  ...jest.requireActual('@staff-portal/operations'),
  Operation: jest.fn()
}))

const OperationMock = Operation as jest.Mock
const ButtonMock = Button as unknown as jest.Mock
const useModalMock = useModal as jest.Mock

describe('SendSTAButton', () => {
  it('calls inner hooks and renders button with correct props passed', () => {
    const props = {
      clientId: {},
      operation: {},
      defaultContact: {},
      isSubsidiarySelected: {}
    } as Props

    const isDisabled = {}
    const showModal = () => {}

    useModalMock.mockReturnValue({ showModal })
    ButtonMock.mockReturnValue(null)
    OperationMock.mockImplementation(({ render: renderChildren }) =>
      renderChildren(isDisabled)
    )

    // Act

    render(<SendSTAButton {...props} />)

    // Assert

    expect(useModalMock).toHaveBeenCalledTimes(1)
    expect(useModalMock).toHaveBeenCalledWith(SendSTAModal, {
      clientId: props.clientId,
      defaultContact: props.defaultContact,
      isSubsidiarySelected: props.isSubsidiarySelected
    })

    expect(ButtonMock).toHaveBeenCalledTimes(1)
    expect(ButtonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: isDisabled,
        onClick: showModal,
        children: 'Send STA'
      }),
      {}
    )
  })
})
