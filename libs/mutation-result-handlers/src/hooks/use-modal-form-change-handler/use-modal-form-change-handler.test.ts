import { renderHook } from '@testing-library/react-hooks'

import { useChangeHandlerUtils } from '../use-change-handler-utils'
import { createMutationResultOptions } from '../../utils'
import { useModalFormChangeHandler } from './use-modal-form-change-handler'

jest.mock('../../utils')
jest.mock('../../form-error-handler')
jest.mock('../use-change-handler-utils')

const useModalFormChangeHandlerCasted =
  useModalFormChangeHandler as unknown as (options: unknown) => {
    handleSubmit: (input: unknown) => Promise<unknown>
    handleSubmitExtended: (input: unknown) => Promise<unknown>
  }
const mockedShowError = jest.fn()

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: () => ({
    showError: mockedShowError
  })
}))

const useChangeHandlerUtilsMock = useChangeHandlerUtils as jest.Mock
const createMutationResultOptionsMock = createMutationResultOptions as jest.Mock

const mockInput = {}

const arrangeTest = () => {
  const handleMutationResult = jest.fn(() => 'result')

  const mutationResponse = {
    data: {}
  }
  const mutate = jest.fn(() => mutationResponse)

  const emitMessage = jest.fn()

  useChangeHandlerUtilsMock.mockReturnValue({
    handleMutationResult,
    mutate,
    emitMessage
  })

  return { mutate, handleMutationResult, mutationResponse, emitMessage }
}

describe('useModalFormChangeHandler', () => {
  describe('returned handleSubmit callback', () => {
    it('invokes mutation with expected props passed', async () => {
      const input = {}

      const { mutate } = arrangeTest()

      const {
        result: { current }
      } = renderHook(() => useModalFormChangeHandlerCasted({}))

      await current.handleSubmit(input)

      expect(mutate).toHaveBeenCalledTimes(1)
      expect(mutate).toHaveBeenCalledWith({
        variables: {
          input
        }
      })
    })

    it('passes expected arguments to "createMutationResultOptions"', async () => {
      const { mutationResponse, emitMessage } = arrangeTest()

      const options = {
        mutationDocument: {},
        mutationResultOptions: {}
      }

      const {
        result: {
          current: { handleSubmit }
        }
      } = renderHook(() => useModalFormChangeHandlerCasted(options))

      await handleSubmit(mockInput)

      expect(createMutationResultOptionsMock).toHaveBeenCalledTimes(1)
      expect(createMutationResultOptionsMock).toHaveBeenCalledWith(
        mutationResponse.data,
        emitMessage,
        mockInput,
        options.mutationResultOptions
      )
    })

    it('returns result of "handleMutationResult" execution', async () => {
      arrangeTest()

      const options = {
        mutationDocument: {},
        mutationResultOptions: {}
      }

      const {
        result: {
          current: { handleSubmit }
        }
      } = renderHook(() => useModalFormChangeHandlerCasted(options))

      const returnValue = await handleSubmit({})

      expect(returnValue).toBe('result')
    })

    describe('when there is a GraphQL error', () => {
      it('calls the onError function', async () => {
        const mockOnError = jest.fn()

        useChangeHandlerUtilsMock.mockImplementation(({ onError }) => ({
          handleMutationResult: () => {},
          mutate: () => {
            onError()

            return {}
          }
        }))

        const {
          result: {
            current: { handleSubmit }
          }
        } = renderHook(() =>
          useModalFormChangeHandlerCasted({
            onError: mockOnError
          })
        )

        await handleSubmit({})

        expect(mockOnError).toHaveBeenCalled()
        expect(mockedShowError).not.toHaveBeenCalled()
      })

      it('calls the showError function', async () => {
        const errorNotificationMessage = 'Some error notification'

        useChangeHandlerUtilsMock.mockImplementation(({ onError }) => ({
          handleMutationResult: () => {},
          mutate: () => {
            onError()

            return {}
          }
        }))

        const {
          result: {
            current: { handleSubmit }
          }
        } = renderHook(() =>
          useModalFormChangeHandlerCasted({
            errorNotificationMessage
          })
        )

        await handleSubmit({})

        expect(mockedShowError).toHaveBeenCalledWith(errorNotificationMessage)
      })
    })
  })

  describe('returned handleSubmitExtended callback', () => {
    it('invokes mutation with expected props passed', async () => {
      const variables = {}

      const { mutate } = arrangeTest()

      const {
        result: { current }
      } = renderHook(() => useModalFormChangeHandlerCasted({}))

      await current.handleSubmitExtended(variables)

      expect(mutate).toHaveBeenCalledTimes(1)
      expect(mutate).toHaveBeenCalledWith({
        variables
      })
    })

    it('passes expected arguments to "createMutationResultOptions"', async () => {
      const { mutationResponse, emitMessage } = arrangeTest()

      const options = {
        mutationDocument: {},
        mutationResultOptions: {}
      }

      const {
        result: {
          current: { handleSubmitExtended }
        }
      } = renderHook(() => useModalFormChangeHandlerCasted(options))

      await handleSubmitExtended({ input: mockInput })

      expect(createMutationResultOptionsMock).toHaveBeenCalledTimes(1)
      expect(createMutationResultOptionsMock).toHaveBeenCalledWith(
        mutationResponse.data,
        emitMessage,
        mockInput,
        options.mutationResultOptions
      )
    })

    it('returns result of "handleMutationResult" execution', async () => {
      arrangeTest()

      const options = {
        mutationDocument: {},
        mutationResultOptions: {}
      }

      const {
        result: {
          current: { handleSubmitExtended }
        }
      } = renderHook(() => useModalFormChangeHandlerCasted(options))

      const returnValue = await handleSubmitExtended({})

      expect(returnValue).toBe('result')
    })

    describe('when there is a GraphQL error', () => {
      it('calls the onError function', async () => {
        const mockOnError = jest.fn()

        useChangeHandlerUtilsMock.mockImplementation(({ onError }) => ({
          handleMutationResult: () => {},
          mutate: () => {
            onError()

            return {}
          }
        }))

        const {
          result: {
            current: { handleSubmitExtended }
          }
        } = renderHook(() =>
          useModalFormChangeHandlerCasted({
            onError: mockOnError
          })
        )

        await handleSubmitExtended({})

        expect(mockOnError).toHaveBeenCalled()
        expect(mockedShowError).not.toHaveBeenCalled()
      })

      it('calls the showError function', async () => {
        const errorNotificationMessage = 'Some error notification'

        useChangeHandlerUtilsMock.mockImplementation(({ onError }) => ({
          handleMutationResult: () => {},
          mutate: () => {
            onError()

            return {}
          }
        }))

        const {
          result: {
            current: { handleSubmitExtended }
          }
        } = renderHook(() =>
          useModalFormChangeHandlerCasted({
            errorNotificationMessage
          })
        )

        await handleSubmitExtended({})

        expect(mockedShowError).toHaveBeenCalledWith(errorNotificationMessage)
      })
    })
  })
})
