import { useNotifications } from '@toptal/picasso/utils'
import { act } from 'react-test-renderer'
import type { OptionsObject } from 'notistack'
import { UserError } from '@staff-portal/graphql/staff'

import { useHandleMutationResult } from './use-handle-mutation-result'
import { getFormErrors } from '../../utils'

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn()
}))

jest.mock('../../utils', () => ({
  __esModule: true,
  getFormErrors: jest.fn(() => null)
}))

const showSuccess = jest.fn((message: string) => message)
const showError = jest.fn((message: string) => message)

describe('useHandleMutationResult', () => {
  beforeEach(() => {
    const mockedUseNotification = useNotifications as jest.Mock

    mockedUseNotification.mockReturnValue({
      showSuccess,
      showError
    })
  })

  describe('when successNotificationMessage is provided', () => {
    const SUCCESS_MESSAGE = 'test.'

    it('shows success message', () => {
      const onSuccessAction = jest.fn()

      const { handleMutationResult } = useHandleMutationResult()

      act(() => {
        const mutationResult = handleMutationResult({
          mutationResult: {
            success: true,
            errors: []
          },
          successNotificationMessage: SUCCESS_MESSAGE,
          onSuccessAction
        })

        expect(showSuccess).toHaveBeenCalledWith(SUCCESS_MESSAGE)

        expect(onSuccessAction).toHaveBeenCalled()
        expect(mutationResult).toBeUndefined()
      })
    })

    describe('when successNotificationOptions is provided', () => {
      it('passes options to the showSuccess callback', () => {
        const onSuccessAction = jest.fn()
        const options = 'options' as OptionsObject

        const { handleMutationResult } = useHandleMutationResult()

        act(() => {
          const mutationResult = handleMutationResult({
            mutationResult: {
              success: true,
              errors: []
            },
            successNotificationMessage: SUCCESS_MESSAGE,
            successNotificationOptions: options,
            onSuccessAction
          })

          expect(showSuccess).toHaveBeenCalledWith(
            SUCCESS_MESSAGE,
            undefined,
            options
          )

          expect(onSuccessAction).toHaveBeenCalled()
          expect(mutationResult).toBeUndefined()
        })
      })
    })
  })

  describe('when successNotificationMessage is NOT provided', () => {
    it('does NOT show success message', () => {
      const { handleMutationResult } = useHandleMutationResult()

      act(() => {
        const mutationResult = handleMutationResult({
          mutationResult: {
            success: true,
            errors: []
          }
        })

        expect(showSuccess).not.toHaveBeenCalled()
        expect(mutationResult).toBeUndefined()
      })
    })
  })

  describe('when mutationResult is undefined', () => {
    it('returns undefined', () => {
      const FORM_WIDE_ERROR =
        'Submit failed. Please check your internet connection.'
      const VALIDATION_ERRORS = {
        test: 'foo'
      }
      const MOCK_ERRORS = {
        formWideError: FORM_WIDE_ERROR,
        validationErrors: VALIDATION_ERRORS
      }

      const { handleMutationResult } = useHandleMutationResult()

      const mockedGetFormErrors = getFormErrors as jest.Mock

      mockedGetFormErrors.mockReturnValue(MOCK_ERRORS)

      act(() => {
        const result = handleMutationResult({
          mutationResult: undefined
        })

        expect(result).toBeUndefined()
      })
    })
  })

  it('shows form wide error and returns field level errors', () => {
    const FORM_WIDE_ERROR = 'test'
    const VALIDATION_ERRORS = {}

    const mockedGetFormErrors = getFormErrors as jest.Mock

    mockedGetFormErrors.mockReturnValue({
      formWideError: FORM_WIDE_ERROR,
      validationErrors: VALIDATION_ERRORS
    })

    const { handleMutationResult } = useHandleMutationResult()

    act(() => {
      const result = handleMutationResult({
        mutationResult: {
          success: false,
          errors: []
        }
      })

      expect(showError).toHaveBeenCalledWith(FORM_WIDE_ERROR)
      expect(result).toStrictEqual({
        ...VALIDATION_ERRORS,
        originalErrors: []
      })
    })
  })

  describe('when capitalizeErrors is true', () => {
    it('capitalizes errors', () => {
      const FORM_WIDE_ERROR = 'test'
      const VALIDATION_ERRORS = [
        { code: 'code', key: 'lowercase_error', message: 'lowercase error' }
      ]

      const mockedGetFormErrors = getFormErrors as jest.Mock

      mockedGetFormErrors.mockImplementation(
        (errors: UserError[]) => ({
          formWideError: FORM_WIDE_ERROR,
          validationErrors: errors.reduce(
            (result, { key, message }) => ({ ...result, [key]: message }),
            {} as Record<string, string>
          )
        })
      )

      const { handleMutationResult } = useHandleMutationResult()

      act(() => {
        const result = handleMutationResult({
          mutationResult: {
            success: false,
            errors: VALIDATION_ERRORS
          },
          capitalizeErrors: true
        })

        expect(showError).toHaveBeenCalledWith(FORM_WIDE_ERROR)
        expect(result).toEqual({
          lowercase_error: 'Lowercase error',
          originalErrors: [
            { code: 'code', key: 'lowercase_error', message: 'Lowercase error' }
          ]
        })
      })
    })
  })

  describe('when returnAllErrors is true', () => {
    it('returns both formWideError and validationErrors', () => {
      const FORM_WIDE_ERROR = 'test'
      const VALIDATION_ERRORS = {}
      const MOCK_ERRORS = {
        formWideError: FORM_WIDE_ERROR,
        validationErrors: VALIDATION_ERRORS
      }

      const mockedGetFormErrors = getFormErrors as jest.Mock

      mockedGetFormErrors.mockReturnValue(MOCK_ERRORS)

      const { handleMutationResult } = useHandleMutationResult()

      act(() => {
        const result = handleMutationResult({
          mutationResult: {
            success: false,
            errors: []
          },
          returnAllErrors: true
        })

        expect(showError).toHaveBeenCalledWith(FORM_WIDE_ERROR)
        expect(result).toStrictEqual({
          ...MOCK_ERRORS,
          validationErrors: {
            ...MOCK_ERRORS.validationErrors,
            originalErrors: []
          }
        })
      })
    })
  })
})
