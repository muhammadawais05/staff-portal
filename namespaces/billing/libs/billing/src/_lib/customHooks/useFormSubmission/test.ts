import { GraphQLError } from '@apollo/client'
import { act, renderHook } from '@testing-library/react-hooks'
import { mockedEmit } from '@toptal/staff-portal-message-bus'

import { ApolloContextEvents } from '../../../@types/types'
import useFormSubmission, { HandleOnSuccess } from '.'

const mockedShowError = jest.fn()
const mockedShowSuccess = jest.fn()
const mockedHandleOutboundEventEmit = jest.fn()
const mockedHandleOnCloseModal = jest.fn()

jest.mock('@toptal/picasso/utils', () => ({
  useNotifications: () => ({
    showError: mockedShowError,
    showSuccess: mockedShowSuccess
  })
}))

jest.mock('../../context/externalIntegratorContext', () => ({
  useExternalIntegratorContext: () => ({
    handleOutboundEventEmit: mockedHandleOutboundEventEmit
  })
}))

jest.mock('../useModals', () => ({
  useModals: () => ({
    handleOnCloseModal: mockedHandleOnCloseModal
  })
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: args => args
  })
}))

describe('useFormSubmission', () => {
  beforeEach(jest.resetAllMocks)

  describe('#handleOnRootLevelError', () => {
    it('shows proper error message', () => {
      const exampleErrorMessage = 'some error message'
      const { result } = renderHook(() => useFormSubmission())

      act(() => {
        result.current.handleOnRootLevelError({
          message: exampleErrorMessage,
          name: '',
          extraInfo: null,
          graphQLErrors: [],
          networkError: null
        })
      })

      expect(mockedShowError).toHaveBeenNthCalledWith(1, exampleErrorMessage)
    })
  })

  describe('#handleOnError', () => {
    it('shows proper error message', () => {
      const { result } = renderHook(() => useFormSubmission())
      const baseError = {
        extraInfo: null,
        graphQLErrors: [
          {
            message: 'graphQl error message #1'
          } as GraphQLError,
          {
            message: 'graphQl error message #2'
          } as GraphQLError
        ],
        message: 'error message',
        name: 'Error',
        networkError: {
          message: 'network error message',
          name: 'Error'
        } as GraphQLError
      }

      // error message
      act(() => {
        result.current.handleOnError(baseError)
      })

      expect(mockedShowError).toHaveBeenCalledTimes(1)
      expect(mockedShowError).toHaveBeenCalledWith('error message')

      // graphql errors
      jest.resetAllMocks()

      act(() => {
        result.current.handleOnError({
          ...baseError,
          message: ''
        })
      })

      expect(mockedShowError).toHaveBeenCalledTimes(2)
      expect(mockedShowError).toHaveBeenNthCalledWith(
        1,
        baseError.graphQLErrors[0].message
      )
      expect(mockedShowError).toHaveBeenNthCalledWith(
        2,
        baseError.graphQLErrors[1].message
      )

      // network error
      jest.resetAllMocks()

      act(() => {
        result.current.handleOnError({
          ...baseError,
          graphQLErrors: [],
          message: ''
        })
      })

      expect(mockedShowError).toHaveBeenCalledTimes(1)
      expect(mockedShowError).toHaveBeenCalledWith(
        baseError.networkError.message
      )
    })
  })

  describe('#handleOnSuccess', () => {
    let successHandler: ({
      apolloEvent,
      isModal,
      outboundEvent,
      successMessage,
      successMessageIcon,
      successMessageOptions
    }: HandleOnSuccess) => () => void

    beforeEach(() => {
      const { result } = renderHook(() => useFormSubmission())

      successHandler = result.current.handleOnSuccess
    })

    describe(`when 'apolloEvent' is '${undefined}'`, () => {
      it('calls appropriate callback functions', () => {
        act(() => {
          successHandler({
            apolloEvent: undefined
          })()
        })

        expect(mockedEmit).not.toHaveBeenCalled()
        expect(mockedHandleOutboundEventEmit).not.toHaveBeenCalled()
        expect(mockedShowSuccess).not.toHaveBeenCalled()
        expect(mockedHandleOnCloseModal).toHaveBeenCalledTimes(1)
      })
    })

    describe(`when 'apolloEvent' is defined`, () => {
      it('calls appropriate callback functions', () => {
        act(() => {
          successHandler({
            apolloEvent: ApolloContextEvents.commitmentChange
          })()
        })

        expect(mockedEmit).toHaveBeenNthCalledWith(
          1,
          ApolloContextEvents.commitmentChange
        )
        expect(mockedHandleOutboundEventEmit).not.toHaveBeenCalled()
        expect(mockedShowSuccess).not.toHaveBeenCalled()
        expect(mockedHandleOnCloseModal).toHaveBeenCalledTimes(1)
      })
    })

    describe(`when 'isModal' is '${undefined}'`, () => {
      it('calls appropriate callback functions', () => {
        act(() => {
          successHandler({
            isModal: undefined
          })()
        })

        expect(mockedHandleOnCloseModal).toHaveBeenCalledTimes(1)
        expect(mockedHandleOutboundEventEmit).not.toHaveBeenCalled()
        expect(mockedShowSuccess).not.toHaveBeenCalled()
        expect(mockedEmit).not.toHaveBeenCalled()
      })
    })

    describe(`when 'isModal' is '${false}'`, () => {
      it('calls appropriate callback functions', () => {
        act(() => {
          successHandler({
            isModal: false
          })()
        })

        expect(mockedHandleOnCloseModal).not.toHaveBeenCalled()
        expect(mockedHandleOutboundEventEmit).not.toHaveBeenCalled()
        expect(mockedShowSuccess).not.toHaveBeenCalled()
        expect(mockedEmit).not.toHaveBeenCalled()
      })
    })

    describe(`when 'isModal' is '${true}'`, () => {
      it('calls appropriate callback functions', () => {
        act(() => {
          successHandler({
            isModal: true
          })()
        })

        expect(mockedHandleOnCloseModal).toHaveBeenCalledTimes(1)
        expect(mockedEmit).not.toHaveBeenCalled()
        expect(mockedHandleOutboundEventEmit).not.toHaveBeenCalled()
        expect(mockedShowSuccess).not.toHaveBeenCalled()
      })
    })

    describe(`when 'outboundEvent' is '${undefined}'`, () => {
      it('calls appropriate callback functions', () => {
        act(() => {
          successHandler({
            outboundEvent: undefined
          })()
        })

        expect(mockedHandleOutboundEventEmit).not.toHaveBeenCalled()
        expect(mockedEmit).not.toHaveBeenCalled()
        expect(mockedShowSuccess).not.toHaveBeenCalled()
        expect(mockedHandleOnCloseModal).toHaveBeenCalledTimes(1)
      })
    })

    describe(`when 'outboundEvent' is '${JSON.stringify({
      key: 'commitment:changed'
    })}'`, () => {
      it('calls appropriate callback functions', () => {
        const expectedObject = {
          key: ApolloContextEvents.commitmentChange,
          payload: {}
        }

        act(() => {
          successHandler({
            outboundEvent: { key: expectedObject.key }
          })()
        })

        expect(mockedHandleOutboundEventEmit).toHaveBeenNthCalledWith(
          1,
          'commitment:change',
          expectedObject.payload
        )
        expect(mockedEmit).not.toHaveBeenCalled()
        expect(mockedShowSuccess).not.toHaveBeenCalled()
        expect(mockedHandleOnCloseModal).toHaveBeenCalledTimes(1)
      })
    })

    describe(`when 'outboundEvent' is '${JSON.stringify({
      key: 'commitment:changed',
      payload: { a: 'a' }
    })}'`, () => {
      it('calls appropriate callback functions', () => {
        const expectedObject = {
          key: ApolloContextEvents.commitmentChange,
          payload: { a: 'a' }
        }

        act(() => {
          successHandler({
            outboundEvent: expectedObject
          })()
        })

        expect(mockedHandleOutboundEventEmit).toHaveBeenNthCalledWith(
          1,
          'commitment:change',
          expectedObject.payload
        )
        expect(mockedEmit).not.toHaveBeenCalled()
        expect(mockedShowSuccess).not.toHaveBeenCalled()
        expect(mockedHandleOnCloseModal).toHaveBeenCalledTimes(1)
      })
    })

    describe(`when 'successMessage' is '${undefined}'`, () => {
      it('calls appropriate callback functions', () => {
        act(() => {
          successHandler({
            successMessage: undefined
          })()
        })

        expect(mockedShowSuccess).not.toHaveBeenCalled()
        expect(mockedEmit).not.toHaveBeenCalled()
        expect(mockedHandleOutboundEventEmit).not.toHaveBeenCalled()
        expect(mockedHandleOnCloseModal).toHaveBeenCalledTimes(1)
      })
    })

    describe(`when 'successMessage' is defined`, () => {
      it('calls appropriate callback functions', () => {
        const successMessageOptions = { persist: true }

        act(() => {
          successHandler({
            successMessage: 'exampleSuccessMessage',
            successMessageOptions
          })()
        })

        expect(mockedShowSuccess).toHaveBeenNthCalledWith(
          1,
          'exampleSuccessMessage',
          undefined,
          successMessageOptions
        )
        expect(mockedEmit).not.toHaveBeenCalled()
        expect(mockedHandleOutboundEventEmit).not.toHaveBeenCalled()
        expect(mockedHandleOnCloseModal).toHaveBeenCalledTimes(1)
      })
    })
  })
})
