import {
  isQuotaExceededError,
  QUOTA_EXCEEDED_ERROR_NAME
} from './is-quota-exceeded-error'

describe('isQuotaExceededError', () => {
  it.each([
    {
      error: new DOMException('err', 'err'),
      result: false
    },
    {
      error: new DOMException('err', QUOTA_EXCEEDED_ERROR_NAME),
      result: true
    }
  ])(
    'checks if error is `QuotaExceededError`',
    ({ error, result: expectedResult }) => {
      const result = isQuotaExceededError(error)

      expect(result).toBe(expectedResult)
    }
  )
})
