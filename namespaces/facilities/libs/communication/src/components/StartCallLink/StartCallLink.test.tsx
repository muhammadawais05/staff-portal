import React from 'react'
import { render } from '@testing-library/react'
import { Button } from '@toptal/picasso'

import StartCallLink from './StartCallLink'
import useStartPhoneCall from './hooks/use-start-phone-call'

jest.mock('./hooks/use-start-phone-call', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('@toptal/picasso', () => ({
  Button: {
    Action: jest.fn()
  }
}))

const useStartPhoneCallMock = useStartPhoneCall as jest.Mock
const startPhoneCallMock = jest.fn()
const loading = {}

const ActionMock = Button.Action as jest.Mock

describe('StartCallLink', () => {
  beforeEach(() => {
    jest.resetModules()

    useStartPhoneCallMock.mockReturnValue({
      startPhoneCall: startPhoneCallMock,
      loading
    })
    ActionMock.mockReturnValue(null)
  })

  it('renders Button.Action with expected props passed', () => {
    const phoneNumber = {} as string
    const buttonText = 'button-text'

    render(
      <StartCallLink phoneNumber={phoneNumber}>{buttonText}</StartCallLink>
    )

    expect(useStartPhoneCallMock).toHaveBeenCalledTimes(1)

    expect(ActionMock).toHaveBeenCalledTimes(1)
    expect(ActionMock).toHaveBeenCalledWith(
      {
        loading,
        onClick: expect.any(Function),
        children: buttonText
      },
      {}
    )
  })

  it('starts call on click', () => {
    const phoneNumber = {} as string
    const buttonText = 'button-text'

    render(
      <StartCallLink phoneNumber={phoneNumber}>{buttonText}</StartCallLink>
    )

    const onClickHandler = ActionMock.mock.calls[0][0].onClick

    onClickHandler()

    expect(startPhoneCallMock).toHaveBeenCalledTimes(1)
    expect(startPhoneCallMock).toHaveBeenCalledWith(phoneNumber)
  })
})
