import { workScheduleValidator } from './work-schedule-validator'

const MIN_VALUE = 0
const MAX_VALUE = 168
const ACCEPTABLE_VALUE = 100
const SUCCESS_VALIDATION_RESULT = undefined

describe('workScheduleValidator', () => {
  it('fails for a blank value', () => {
    expect(workScheduleValidator(undefined)).toBe(
      'Must be a valid non-decimal number.'
    )
  })

  it('fails for a value below a min value', () => {
    expect(workScheduleValidator(MIN_VALUE - 1)).toBe(
      'Must be greater than or equal to 0.'
    )
  })

  it('fails for a string value below a min value', () => {
    expect(workScheduleValidator(`${MIN_VALUE - 1}`)).toBe(
      'Must be greater than or equal to 0.'
    )
  })

  it('fails for a value over the max value', () => {
    expect(workScheduleValidator(MAX_VALUE + 1)).toBe(
      'Must be less than or equal to 168.'
    )
  })

  it('fails for a string value over the max value', () => {
    expect(workScheduleValidator(`${MAX_VALUE + 1}`)).toBe(
      'Must be less than or equal to 168.'
    )
  })

  it('passes for the min value: ' + MIN_VALUE, () => {
    expect(workScheduleValidator(MIN_VALUE)).toEqual(SUCCESS_VALIDATION_RESULT)
  })

  it('passes for the max value: ' + MAX_VALUE, () => {
    expect(workScheduleValidator(MAX_VALUE)).toEqual(SUCCESS_VALIDATION_RESULT)
  })

  it('passes for an acceptable value', () => {
    expect(workScheduleValidator(ACCEPTABLE_VALUE)).toEqual(
      SUCCESS_VALIDATION_RESULT
    )
  })
})
