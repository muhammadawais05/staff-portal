import { getFormErrors } from './get-form-errors'

describe('getFormErrors', () => {
  it('should return "base" error as formWideError', () => {
    expect(
      getFormErrors([{ code: 'code', key: 'base', message: 'base error' }])
    ).toStrictEqual({
      formWideError: 'base error',
      validationErrors: undefined
    })
  })

  it('should return validationErrors using other errors', () => {
    expect(
      getFormErrors([{ code: 'code', key: 'field1', message: 'field1 error' }])
    ).toStrictEqual({
      formWideError: undefined,
      validationErrors: { field1: 'field1 error' }
    })
  })

  it('should return object with undefined fields if there is no error', () => {
    expect(getFormErrors([])).toStrictEqual({
      formWideError: undefined,
      validationErrors: undefined
    })
  })

  it('returns form base error', () => {
    expect(
      getFormErrors(
        [
          { code: 'code', key: 'base', message: 'base error' },
          { code: 'code', key: 'field', message: 'field message' }
        ],
        true
      )
    ).toStrictEqual({
      formWideError: 'base error',
      validationErrors: {
        'FINAL_FORM/form-error': 'base error',
        field: 'field message'
      }
    })
  })

  it('returns multiple base errors', () => {
    expect(
      getFormErrors(
        [
          { code: 'code', key: 'base', message: 'base error 1' },
          { code: 'code', key: 'base', message: 'base error 2' }
        ],
        true
      )
    ).toStrictEqual({
      formWideError: 'base error 1<br/>base error 2',
      validationErrors: {
        'FINAL_FORM/form-error': 'base error 1<br/>base error 2'
      }
    })
  })

  it('returns array of errors for fields', () => {
    expect(
      getFormErrors(
        [
          { code: 'code', key: 'test.0.field', message: 'field error 1' },
          { code: 'code', key: 'test.1.field', message: 'field error 2' }
        ],
        true
      )
    ).toStrictEqual({
      formWideError: undefined,
      validationErrors: {
        test: [{ field: 'field error 1' }, { field: 'field error 2' }]
      }
    })
  })
})
