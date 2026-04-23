import MockDate from 'mockdate'

import * as fieldValidators from '.'
import i18n from '../../../utils/i18n'

describe('fieldValidators', () => {
  describe('#composeValidators', () => {
    describe('when value is valid', () => {
      it('validation passes and returns `undefined`', () => {
        expect(
          fieldValidators.composeValidators(
            fieldValidators.required,
            fieldValidators.positiveNumber
          )('12', { number: '12' })
        ).toBeUndefined()
      })
    })

    describe('when value is invalid', () => {
      it('validation fails on all validators and returns error message', () => {
        expect(
          fieldValidators.composeValidators(
            fieldValidators.required,
            fieldValidators.positiveNumber
          )('', { number: '' })
        ).toBe(i18n.t('common:validation.required'))
      })

      it('validation fails and returns error message', () => {
        expect(
          fieldValidators.composeValidators(
            fieldValidators.required,
            fieldValidators.positiveNumber
          )('-12', { number: '' })
        ).toBe(i18n.t('common:validation.positive'))
      })
    })
  })

  describe('#required', () => {
    describe('when value is not defined/set/does not exist', () => {
      it('returns `undefined`', () => {
        expect(fieldValidators.required('abc')).toBeUndefined()
      })
    })

    describe('when value is not positive', () => {
      it('returns error message', () => {
        expect(fieldValidators.required('')).toBe(
          i18n.t('common:validation.required')
        )
      })
    })
  })

  describe('#positiveNumber', () => {
    describe('when value is positive', () => {
      it('returns `undefined`', () => {
        expect(fieldValidators.positiveNumber('12')).toBeUndefined()
      })
    })

    describe('when value is not positive', () => {
      it('returns error message', () => {
        expect(fieldValidators.positiveNumber('0')).toBe(
          i18n.t('common:validation.positive')
        )
      })
    })
  })

  describe('#validNumber', () => {
    describe('when value is number', () => {
      it('returns `undefined`', () => {
        expect(fieldValidators.validNumber('12')).toBeUndefined()
      })
    })

    describe('when value is not number', () => {
      it('returns error message', () => {
        expect(fieldValidators.validNumber('.')).toBe(
          i18n.t('common:validation.validNumber')
        )
      })
    })
  })

  describe('#futureDate', () => {
    beforeAll(() => MockDate.set('2015-05-19'))

    afterAll(MockDate.reset)

    it.each`
      input           | expected                                    | message
      ${'2015-05-19'} | ${''}                                       | ${`returns '' when date is today`}
      ${'2015-05-20'} | ${''}                                       | ${`returns '' when date is today`}
      ${'2015-05-18'} | ${i18n.t('common:validation.todayOrLater')} | ${'returns error when date belongs to past'}
    `('$message', ({ input, expected }) => {
      expect(fieldValidators.futureDate(input)).toEqual(expected)
    })
  })

  describe('#dateAfter', () => {
    describe('when date is after boundary date', () => {
      it('returns no errors', () => {
        const date = '2020-01-02'
        const boundaryDate = '2020-01-01'

        expect(
          fieldValidators.dateAfter({
            boundaryDate,
            errorMessage: 'Sample error message'
          })(date)
        ).toBeUndefined()
      })
    })

    describe('when date is on or before boundary date', () => {
      it('returns error message', () => {
        const date = '2020-01-01'
        const dayAfter = '2020-01-02'
        const errorMessage = 'Sample error message'

        expect(
          fieldValidators.dateAfter({
            boundaryDate: date,
            errorMessage
          })(date)
        ).toBe(errorMessage)
        expect(
          fieldValidators.dateAfter({
            boundaryDate: dayAfter,
            errorMessage
          })(date)
        ).toBe(errorMessage)
      })
    })
  })

  describe('#dateBefore', () => {
    describe('when date is before boundary date', () => {
      it('returns no errors', () => {
        const date = '2020-01-01'
        const boundaryDate = '2020-01-02'

        expect(
          fieldValidators.dateBefore({
            boundaryDate,
            errorMessage: 'Sample error message'
          })(date)
        ).toBeUndefined()
      })
    })

    describe('when date is on or after boundary date', () => {
      it('returns error message', () => {
        const date = '2020-01-01'
        const dayBefore = '2019-12-31'
        const errorMessage = 'Sample error message'

        expect(
          fieldValidators.dateBefore({
            boundaryDate: date,
            errorMessage
          })(date)
        ).toBe(errorMessage)
        expect(
          fieldValidators.dateBefore({
            boundaryDate: dayBefore,
            errorMessage
          })(date)
        ).toBe(errorMessage)
      })
    })
  })
})

describe('#greaterOrEqualValue', () => {
  describe.each([
    [
      { valueKey: 'talentAmount', valueLabel: 'developer amount' },
      '50',
      { comment: 'abc', talentAmount: '50.5' }
    ],
    [
      {
        errorMessage: 'Example error message',
        valueKey: 'talentAmount',
        valueLabel: 'developer amount'
      },
      '50',
      { comment: 'abc', talentAmount: '50.5' }
    ]
  ])('when its an error', (setupArgs, value, allValues) => {
    describe(`when value is ${value} compare to ${
      allValues[setupArgs.valueKey]
    }`, () => {
      it(`returns 'error' message}`, () => {
        expect(
          fieldValidators.greaterOrEqualValue(setupArgs)(value, allValues)
        ).toBe(
          setupArgs.errorMessage ||
            i18n.t('common:validation.greaterOrEqualValue', {
              label: setupArgs.valueLabel
            })
        )
      })
    })
  })

  describe.each([
    [
      { valueKey: 'talentAmount', valueLabel: 'developer amount' },
      '50.5',
      { comment: 'abc', talentAmount: '50.5' }
    ],
    [
      { valueKey: 'talentAmount', valueLabel: 'developer amount' },
      '51',
      { comment: 'abc', talentAmount: '50.5' }
    ]
  ])('when its not an error', (setupArgs, value, allValues) => {
    describe(`when '${value}' is compare to ${
      allValues[setupArgs.valueKey]
    }`, () => {
      it(`returns "undefined"`, () => {
        expect(
          fieldValidators.greaterOrEqualValue(setupArgs)(value, allValues)
        ).toBeUndefined()
      })
    })
  })
})

describe('#lessThanOrEqualValue', () => {
  describe.each([
    [
      { valueKey: 'talentAmount', valueLabel: 'developer amount' },
      '50.5',
      { comment: 'abc', talentAmount: '50' }
    ],
    [
      {
        errorMessage: 'Example error message',
        valueKey: 'talentAmount',
        valueLabel: 'developer amount'
      },
      '50.5',
      { comment: 'abc', talentAmount: '50' }
    ]
  ])('when its an error', (setupArgs, value, allValues) => {
    describe(`when value is ${value} compare to ${
      allValues[setupArgs.valueKey]
    }`, () => {
      it(`returns 'error' message}`, () => {
        expect(
          fieldValidators.lessThanOrEqualValue(setupArgs)(value, allValues)
        ).toBe(
          setupArgs.errorMessage ||
            i18n.t('common:validation.lessThanOrEqualValue', {
              label: setupArgs.valueLabel
            })
        )
      })
    })
  })

  describe.each([
    [
      { valueKey: 'talentAmount', valueLabel: 'developer amount' },
      '50.5',
      { comment: 'abc', talentAmount: '50.5' }
    ],
    [
      { valueKey: 'talentAmount', valueLabel: 'developer amount' },
      '50.5',
      { comment: 'abc', talentAmount: '51' }
    ]
  ])('when its not an error', (setupArgs, value, allValues) => {
    describe(`when '${value}' is compare to ${
      allValues[setupArgs.valueKey]
    }`, () => {
      it(`returns "undefined"`, () => {
        expect(
          fieldValidators.lessThanOrEqualValue(setupArgs)(value, allValues)
        ).toBeUndefined()
      })
    })
  })
})
