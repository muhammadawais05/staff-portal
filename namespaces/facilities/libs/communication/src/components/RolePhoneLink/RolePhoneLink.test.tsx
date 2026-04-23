import { render } from '@testing-library/react'
import React from 'react'
import { useNotifications } from '@toptal/picasso/utils'

import { PhoneLinkContent } from '../PhoneLinkContent'
import { useProceedTopcall } from '../../hooks/use-proceed-topcall'
import { useCallRole } from '../../hooks/use-call-role'
import RolePhoneLink, { Props } from './RolePhoneLink'

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn()
}))

jest.mock('../../hooks/use-call-role', () => ({
  ...jest.requireActual('../../hooks/use-call-role'),
  useCallRole: jest.fn()
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
const useCallRoleMock = useCallRole as jest.Mock
const PhoneLinkContentMock = PhoneLinkContent as jest.Mock

const showErrorMock = jest.fn()
const proceedTopcallMock = jest.fn()
const callContactMock = jest.fn()
const loading = {}

const props: Props = {
  roleId: {},
  destination: {},
  contactType: {}
} as Props

describe('RolePhoneLink', () => {
  beforeEach(() => {
    useNotificationsMock.mockReturnValue({
      showError: showErrorMock
    })
    useProceedTopcallMock.mockReturnValue({
      proceedTopcall: proceedTopcallMock
    })
    useCallRoleMock.mockReturnValue([callContactMock, { loading }])
    PhoneLinkContentMock.mockReturnValue(null)
  })

  it('call inner hooks and render component with correct props passed', () => {
    render(<RolePhoneLink {...props} />)

    expect(useNotificationsMock).toHaveBeenCalledTimes(1)
    expect(useProceedTopcallMock).toHaveBeenCalledTimes(1)

    expect(useCallRoleMock).toHaveBeenCalledTimes(1)
    expect(useCallRoleMock).toHaveBeenCalledWith({
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
        useCallRoleMock.mockImplementation(({ onError }) => [
          callContactMock.mockImplementation(() => {
            onError()
          }),
          {
            loading
          }
        ])

        PhoneLinkContentMock.mockImplementation(({ onClick }) => {
          onClick()

          return null
        })

        render(<RolePhoneLink {...props} />)

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
        const dataMock = { callRole: {} }

        PhoneLinkContentMock.mockImplementation(({ onClick }) => {
          onClick()

          return null
        })

        useCallRoleMock.mockImplementation(({ onCompleted }) => [
          callContactMock.mockImplementation(() => {
            onCompleted(dataMock)
          }),
          {
            loading
          }
        ])

        render(<RolePhoneLink {...props} />)

        expect(callContactMock).toHaveBeenCalledTimes(1)
        expect(callContactMock).toHaveBeenCalledWith({
          variables: {
            input: { ...props }
          }
        })

        expect(proceedTopcallMock).toHaveBeenCalledTimes(1)
        expect(proceedTopcallMock).toHaveBeenCalledWith(dataMock.callRole)
        expect(showErrorMock).toHaveBeenCalledTimes(0)
      })
    })
  })
})
