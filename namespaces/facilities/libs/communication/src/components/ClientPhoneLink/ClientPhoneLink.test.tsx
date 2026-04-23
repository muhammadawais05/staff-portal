import { render } from '@testing-library/react'
import React from 'react'
import { useNotifications } from '@toptal/picasso/utils'

import { PhoneLinkContent } from '../PhoneLinkContent'
import { useProceedTopcall } from '../../hooks/use-proceed-topcall'
import { useCallClient } from '../../hooks/use-call-client'
import ClientPhoneLink, { Props } from './ClientPhoneLink'

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn()
}))

jest.mock('../../hooks/use-call-client', () => ({
  ...jest.requireActual('../../hooks/use-call-client'),
  useCallClient: jest.fn()
}))

jest.mock('../../hooks/use-proceed-topcall', () => ({
  ...jest.requireActual('../../hooks/use-proceed-topcall'),
  useProceedTopcall: jest.fn()
}))

jest.mock('../PhoneLinkContent', () => ({
  ...jest.requireActual('../PhoneLinkContent'),
  PhoneLinkContent: jest.fn()
}))

const ERROR_MESSAGE_MOCK = {}

jest.mock('../../messages', () => ({
  ...jest.requireActual('../../messages'),
  ERROR_MESSAGE: ERROR_MESSAGE_MOCK
}))

const useNotificationsMock = useNotifications as jest.Mock
const useProceedTopcallMock = useProceedTopcall as jest.Mock
const useCallClientMock = useCallClient as jest.Mock
const PhoneLinkContentMock = PhoneLinkContent as jest.Mock

const showErrorMock = jest.fn()
const proceedTopcallMock = jest.fn()
const callContactMock = jest.fn()
const loading = {}

const props: Props = {
  clientId: {},
  destination: {},
  contactType: {}
} as Props

describe('ClientPhoneLink', () => {
  beforeEach(() => {
    useNotificationsMock.mockReturnValue({
      showError: showErrorMock
    })
    useProceedTopcallMock.mockReturnValue({
      proceedTopcall: proceedTopcallMock
    })
    useCallClientMock.mockReturnValue([callContactMock, { loading }])
    PhoneLinkContentMock.mockReturnValue(null)
  })

  it('call inner hooks and render component with correct props passed', () => {
    render(<ClientPhoneLink {...props} />)

    expect(useNotificationsMock).toHaveBeenCalledTimes(1)
    expect(useProceedTopcallMock).toHaveBeenCalledTimes(1)

    expect(useCallClientMock).toHaveBeenCalledTimes(1)
    expect(useCallClientMock).toHaveBeenCalledWith({
      onError: expect.any(Function),
      onCompleted: expect.any(Function)
    })

    expect(PhoneLinkContentMock).toHaveBeenCalledTimes(1)
    expect(PhoneLinkContentMock).toHaveBeenCalledWith(
      {
        phoneContactValue: props.destination,
        onClick: expect.any(Function),
        loading
      },
      {}
    )
  })

  describe('when destination is not nullable', () => {
    describe('when operation check failed', () => {
      it('shows error notification on error', () => {
        useCallClientMock.mockImplementation(({ onError }) => [
          callContactMock.mockImplementation(() => {
            onError()
          }),
          {
            loading
          }
        ])

        render(<ClientPhoneLink {...props} />)

        const onClick = PhoneLinkContentMock.mock.calls[0][0].onClick

        onClick()

        expect(callContactMock).toHaveBeenCalledTimes(1)
        expect(callContactMock).toHaveBeenCalledWith({
          variables: {
            input: { ...props }
          }
        })

        expect(proceedTopcallMock).toHaveBeenCalledTimes(0)
        expect(showErrorMock).toHaveBeenCalledTimes(1)
        expect(showErrorMock).toHaveBeenCalledWith(ERROR_MESSAGE_MOCK)
      })
    })

    describe('when operation check passed', () => {
      it('proceeds call, if contact url is no nullable', () => {
        const dataMock = { callClient: {} }

        useCallClientMock.mockImplementation(({ onCompleted }) => [
          callContactMock.mockImplementation(() => {
            onCompleted(dataMock)
          }),
          {
            loading
          }
        ])

        render(<ClientPhoneLink {...props} />)

        const onClick = PhoneLinkContentMock.mock.calls[0][0].onClick

        onClick()

        expect(callContactMock).toHaveBeenCalledTimes(1)
        expect(callContactMock).toHaveBeenCalledWith({
          variables: {
            input: { ...props }
          }
        })

        expect(proceedTopcallMock).toHaveBeenCalledTimes(1)
        expect(proceedTopcallMock).toHaveBeenCalledWith(dataMock.callClient)
        expect(showErrorMock).toHaveBeenCalledTimes(0)
      })
    })
  })
})
