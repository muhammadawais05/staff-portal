import {
  allocatedHoursValidator,
  requiredValidator
} from '../allocated-hours-validators'

const MIN_VALUE = 0
const MAX_VALUE = 168
const ACCEPTABLE_VALUE = 100
const SUCCESS_VALIDATION_RESULT = undefined

describe('requiredValidator', () => {
  it('fails when undefined', () => {
    expect(requiredValidator(undefined)).toBe(
      'You must specify allocated hours.'
    )
  })

  it('fails when an empty string', () => {
    expect(requiredValidator('')).toBe('You must specify allocated hours.')
  })

  it('fails when a blank string', () => {
    expect(requiredValidator('     ')).toBe(
      'You must specify allocated hours.'
    )
  })

  it('passes for any value', () => {
    expect(requiredValidator('Hello World! 123')).toEqual(
      SUCCESS_VALIDATION_RESULT
    )
  })
})

describe('allocatedHoursValidator', () => {
  it('fails for a blank value', () => {
    expect(allocatedHoursValidator(undefined)).toBe(
      'Must be a valid non-decimal number.'
    )
  })

  it('fails for a blank string', () => {
    expect(allocatedHoursValidator('')).toBe(
      'Must be a valid non-decimal number.'
    )
  })

  it('fails for a value below a min value', () => {
    expect(allocatedHoursValidator(MIN_VALUE - 1)).toBe(
      'Must be greater than or equal to 0.'
    )
  })

  it('fails for a string value below a min value', () => {
    expect(allocatedHoursValidator(`${MIN_VALUE - 1}`)).toBe(
      'Must be greater than or equal to 0.'
    )
  })

  it('fails for a value over the max value', () => {
    expect(allocatedHoursValidator(MAX_VALUE + 1)).toBe(
      'Must be less than or equal to 168.'
    )
  })

  it('fails for a string value over the max value', () => {
    expect(allocatedHoursValidator(`${MAX_VALUE + 1}`)).toBe(
      'Must be less than or equal to 168.'
    )
  })

  it('passes for the min value: ' + MIN_VALUE, () => {
    expect(allocatedHoursValidator(MIN_VALUE)).toEqual(
      SUCCESS_VALIDATION_RESULT
    )
  })

  it('passes for the max value: ' + MAX_VALUE, () => {
    expect(allocatedHoursValidator(MAX_VALUE)).toEqual(
      SUCCESS_VALIDATION_RESULT
    )
  })

  it('passes for an acceptable value', () => {
    expect(allocatedHoursValidator(ACCEPTABLE_VALUE)).toEqual(
      SUCCESS_VALIDATION_RESULT
    )
  })
})
