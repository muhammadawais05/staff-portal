import { concatUnexpectedValidationErrors } from './concat-unexpected-validation-errors'

describe('concatUnexpectedValidationErrors', () => {
  it('should concatenate valid error messages', () => {
    expect(
      concatUnexpectedValidationErrors(
        { field1: 'error 1', field2: '', field3: 'error 3' },
        []
      )
    ).toBe('error 1, error 3')
  })

  it('should ignore errors with "base" key', () => {
    expect(concatUnexpectedValidationErrors({ base: 'error 1' }, [])).toBe('')
  })

  it('should ignore errors whose key is in the list', () => {
    expect(
      concatUnexpectedValidationErrors({ field1: 'error 1' }, ['field1'])
    ).toBe('')
  })
})
