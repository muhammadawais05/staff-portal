import { useNotifications } from '@toptal/picasso/utils'
import { renderHook } from '@testing-library/react-hooks'

import { useCallContact } from '../use-call-contact'
import { useProceedTopcall } from '../use-proceed-topcall'
import {
  useCallContactWithOperationCheck,
  Props
} from './use-call-contact-with-operation-check'

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn()
}))

jest.mock('../use-call-contact', () => ({
  ...jest.requireActual('../use-call-contact'),
  useCallContact: jest.fn()
}))

jest.mock('../../hooks/use-proceed-topcall', () => ({
  ...jest.requireActual('../../hooks/use-proceed-topcall'),
  useProceedTopcall: jest.fn()
}))

const ERROR_MESSAGE_MOCK = {}

jest.mock('../../messages', () => ({
  ...jest.requireActual('../../messages'),
  ERROR_MESSAGE: ERROR_MESSAGE_MOCK
}))

const useProceedTopcallMock = useProceedTopcall as jest.Mock
const useCallContactMock = useCallContact as jest.Mock
const useNotificationsMock = useNotifications as jest.Mock

const showErrorMock = jest.fn()
const proceedTopcallMock = jest.fn()

const props: Props = {
  roleId: {},
  phoneContactId: {},
  contactSourceId: {}
} as Props

describe('useCallContactWithOperationCheck', () => {
  beforeEach(() => {
    useNotificationsMock.mockReturnValue({ showError: showErrorMock })
    useProceedTopcallMock.mockReturnValue({
      proceedTopcall: proceedTopcallMock
    })
  })

  it('returns loading corresponding to callContact loading', () => {
    const loading = {}

    useCallContactMock.mockReturnValue([{}, { loading }])

    const { result } = renderHook(() => useCallContactWithOperationCheck(props))

    expect(result.current.loading).toBe(loading)
  })

  describe('when phoneContactId is not nullable', () => {
    it('shows error notification on error', () => {
      const callContactMock = jest.fn()

      useCallContactMock.mockImplementation(({ onError }) => [
        callContactMock.mockImplementation(() => onError()),
        {}
      ])

      const { result } = renderHook(() =>
        useCallContactWithOperationCheck(props)
      )

      result.current.callContact()

      expect(callContactMock).toHaveBeenCalledTimes(1)
      expect(callContactMock).toHaveBeenCalledWith({
        variables: {
          input: {
            roleId: props.roleId,
            contactId: props.phoneContactId,
            contactSourceId: props.contactSourceId
          }
        }
      })

      expect(showErrorMock).toHaveBeenCalledTimes(1)
      expect(showErrorMock).toHaveBeenCalledWith(ERROR_MESSAGE_MOCK)
    })

    it('proceeds call on success, if contact url is not nullable', () => {
      const callContactMock = jest.fn()
      const dataMock = { callContact: {} }

      useCallContactMock.mockImplementation(({ onCompleted }) => [
        callContactMock.mockImplementation(() => onCompleted(dataMock)),
        {}
      ])

      const { result } = renderHook(() =>
        useCallContactWithOperationCheck(props)
      )

      result.current.callContact()

      expect(callContactMock).toHaveBeenCalledTimes(1)
      expect(callContactMock).toHaveBeenCalledWith({
        variables: {
          input: {
            roleId: props.roleId,
            contactId: props.phoneContactId,
            contactSourceId: props.contactSourceId
          }
        }
      })

      expect(proceedTopcallMock).toHaveBeenCalledTimes(1)
      expect(proceedTopcallMock).toHaveBeenCalledWith(dataMock.callContact)
    })
  })
})
