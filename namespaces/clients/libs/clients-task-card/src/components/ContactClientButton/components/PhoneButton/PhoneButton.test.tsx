import React from 'react'
import { render } from '@testing-library/react'
import { Button } from '@toptal/picasso'
import { useCallContactWithOperationCheck } from '@staff-portal/communication'

import PhoneButton, { Props } from './PhoneButton'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Button: jest.fn()
}))

jest.mock('@staff-portal/communication', () => ({
  useCallContactWithOperationCheck: jest.fn()
}))

const useCallContactWithOperationCheckMock =
  useCallContactWithOperationCheck as jest.Mock
const ButtonMock = Button as unknown as jest.Mock

describe('PhoneButton', () => {
  it('renders button with expected props passed', () => {
    const loading = {}
    const callContact = {}

    useCallContactWithOperationCheckMock.mockReturnValue({
      loading,
      callContact
    })
    ButtonMock.mockReturnValue(null)

    const props: Props = {
      contactUserId: {},
      contactMethod: { id: {}, value: {} }
    } as Props

    render(<PhoneButton {...props} />)

    expect(useCallContactWithOperationCheckMock).toHaveBeenCalledTimes(1)
    expect(useCallContactWithOperationCheckMock).toHaveBeenCalledWith({
      roleId: props.contactUserId,
      phoneContactId: props.contactMethod.id
    })

    expect(ButtonMock).toHaveBeenCalledTimes(1)
    expect(ButtonMock).toHaveBeenCalledWith(
      {
        loading,
        onClick: callContact,
        children: props.contactMethod.value
      },
      {}
    )
  })
})
