import { getFormErrors } from '@staff-portal/mutation-result-handlers'
import { act } from '@testing-library/react-hooks'

import useHandleQueryErrors from './use-handle-query-errors'

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: () => ({ showError: jest.fn() })
}))

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  getFormErrors: jest.fn(() => null)
}))

describe('useHandleQueryErrors', () => {
  it('shows form wide error', () => {
    const VALIDATION_ERRORS = {}

    const mockedGetFormErrors = getFormErrors as jest.Mock

    mockedGetFormErrors.mockReturnValue({
      validationErrors: VALIDATION_ERRORS
    })

    const { handleQueryErrors } = useHandleQueryErrors()

    act(() => {
      const result = handleQueryErrors({
        errors: []
      })

      expect(result).toStrictEqual({
        ...VALIDATION_ERRORS,
        originalErrors: []
      })
    })
  })
})
