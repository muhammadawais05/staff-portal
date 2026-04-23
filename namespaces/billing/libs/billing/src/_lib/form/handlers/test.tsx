import React from 'react'
import { omit } from 'lodash-es'

import {
  cleanNumberValueWithLimit,
  convertToInteger,
  formatCleanNumberValue,
  formatCleanNegativeNumberValue,
  handleOnSubmissionError,
  handleSubmit,
  onBlurToFloatNumber,
  onChangeToFloatNumber
} from '.'
import { submitMutation } from '../../helpers/apollo'

describe('formatCleanNumberValue', () => {
  it('properly formats the input value', () => {
    expect(formatCleanNumberValue('1')).toBe('1.00')
    expect(formatCleanNumberValue('string')).toBe('0.00')
    expect(formatCleanNumberValue('1.00')).toBe('1.00')
    expect(formatCleanNumberValue('')).toBe('')
    expect(formatCleanNumberValue()).toBe('')
  })
})

describe('formatCleanNegativeNumberValue', () => {
  it('properly formats the input value', () => {
    // Should function in the same way as formatCleanNumberValue for positive input
    expect(formatCleanNegativeNumberValue('1')).toBe('1.00')
    expect(formatCleanNegativeNumberValue('string')).toBe('0.00')
    expect(formatCleanNegativeNumberValue('1.00')).toBe('1.00')
    expect(formatCleanNegativeNumberValue('')).toBe('')
    expect(formatCleanNegativeNumberValue()).toBe('')
    // Should keep the negative input negative
    expect(formatCleanNegativeNumberValue('-1')).toBe('-1.00')
    expect(formatCleanNegativeNumberValue('-12.00')).toBe('-12.00')
    expect(formatCleanNegativeNumberValue('-00.50')).toBe('-0.50')
  })
})

describe('cleanNumberValueWithLimit', () => {
  it('properly formats the input value', () => {
    const limiter = cleanNumberValueWithLimit(11)

    expect(limiter('')).toBe('')
    expect(limiter('string')).toBe('')
    expect(limiter('1111')).toBe('1111')
    expect(limiter('1.00')).toBe('1.00')
    expect(limiter('1.0000')).toBe('1.0000')
    expect(limiter('1234567891234')).toBe('12345678912')
    expect(limiter('1234567891234.')).toBe('12345678912.')
    expect(limiter('1234567891234.0')).toBe('12345678912.0')
    expect(limiter('1234567891234.00')).toBe('12345678912.00')
    expect(limiter('1234567891234.0000')).toBe('12345678912.00')
  })
})

describe('onChangeToFloatNumber', () => {
  it('omits any letters', () => {
    const input = { target: { value: '123a' } }
    const changeMock = jest.fn()

    onChangeToFloatNumber(changeMock)(input)
    const expected = '123'

    expect(changeMock).toHaveBeenNthCalledWith(1, expected)
  })

  it('omits any useless decimal points', () => {
    const input = { target: { value: '12...323.23.32.' } }
    const changeMock = jest.fn()

    onChangeToFloatNumber(changeMock)(input)
    const expected = '12.'

    expect(changeMock).toHaveBeenNthCalledWith(1, expected)
  })

  it('removes anything other than numbers and periods', () => {
    const input = { target: { value: '$1,000,,000...00.00' } }
    const changeMock = jest.fn()

    onChangeToFloatNumber(changeMock)(input)
    const expected = '1000000.'

    expect(changeMock).toHaveBeenNthCalledWith(1, expected)
  })
})

describe('onBlurToFloatNumber', () => {
  it('formats the value to 2 decimal points', () => {
    const input = { target: { value: '12.' } }
    const changeMock = jest.fn()
    const blurMock = jest.fn()

    onBlurToFloatNumber(changeMock, blurMock)(input)
    const expected = '12.00'

    expect(changeMock).toHaveBeenNthCalledWith(1, expected)
    expect(blurMock).toHaveBeenNthCalledWith(1, expected)
  })

  it('removes anything other than numbers and periods and formats the value to 2 decimal points', () => {
    const input = { target: { value: '$1,000,,000...00.00' } }
    const changeMock = jest.fn()
    const blurMock = jest.fn()

    onBlurToFloatNumber(changeMock, blurMock)(input)
    const expected = '1000000.00'

    expect(changeMock).toHaveBeenNthCalledWith(1, expected)
    expect(blurMock).toHaveBeenNthCalledWith(1, expected)
  })
})

describe('handleOnSubmissionError', () => {
  describe('when error is falsy', () => {
    describe('when error list is empty', () => {
      it('returns `undefined`', () => {
        expect(
          handleOnSubmissionError('changeEngagementCommitment')({
            data: {
              changeEngagementCommitment: {
                __typename: 'ChangeEngagementCommitmentPayload',
                engagement: null,
                errors: [],
                success: false
              }
            }
          })
        ).toBeUndefined()
      })
    })

    describe('when no errors', () => {
      it('returns `undefined`', () => {
        expect(
          handleOnSubmissionError('changeEngagementCommitment')({
            data: {
              changeEngagementCommitment: {
                __typename: 'ChangeEngagementCommitmentPayload',
                engagement: null,
                success: false
              }
            }
          })
        ).toBeUndefined()
      })
    })
  })

  describe('when there are errors', () => {
    it('returns the proper error object', () => {
      const data = {
        changeEngagementCommitment: {
          __typename: 'ChangeEngagementCommitmentPayload',
          engagement: null,
          errors: [
            {
              __typename: 'GraniteError',
              code: 'totalCommitmentExceedsAvailability',
              key: 'base',
              message:
                "Total requested commitment (80 hours) exceeds talent's availability (50 hours)."
            },
            {
              __typename: 'GraniteError',
              code: 'changeDateExceeded',
              key: 'change_date',
              message: 'ChangeDate is over a certain period.'
            },
            {
              __typename: 'GraniteError',
              code: 'changeDateMandatory',
              key: 'change_date',
              message: 'ChangeDate is a required field.'
            },
            {
              __typename: 'GraniteError',
              code: 'commentMandatory',
              key: 'comment',
              message: 'Comment is a required field.'
            },
            {
              __typename: 'GraniteError',
              code: 'commentMandatory',
              key: 'installments[0].dueDate',
              message: 'comment is a required field.'
            },
            {
              code: '',
              key: 'subject.base',
              message: 'Must set at least one template value',
              __typename: 'StandardUserError'
            }
          ],
          success: false
        }
      }

      expect(
        handleOnSubmissionError('changeEngagementCommitment')({ data })
      ).toEqual({
        'FINAL_FORM/form-error': (
          <>
            Total requested commitment (80 hours) exceeds talent's availability
            (50 hours).
            <br />
            Must set at least one template value
          </>
        ),
        changeDate: (
          <>
            ChangeDate is over a certain period.
            <br />
            ChangeDate is a required field.
          </>
        ),
        comment: 'Comment is a required field.',
        installments: [{ dueDate: 'Comment is a required field.' }]
      })
    })
  })
})

const valuesMock = {
  comment: 'Example comment',
  dueDate: '2015-05-05',
  isTalent: true
}

jest.mock('../../helpers/apollo')

describe('#handleSubmit', () => {
  const handleSubmitMockData = {
    beforeAction: 'exampleBeforeAction',
    handleError: 'exampleError',
    handleSuccess: 'exampleSuccess',
    responseKey: 'exampleResponseKey',
    spreadInputProps: true,
    submit: 'exampleSubmit',
    updateCache: 'exampleUpdateCache'
  }

  beforeEach(jest.resetAllMocks)

  describe('when input values need to be modified', () => {
    it('when values being adjustd', () => {
      handleSubmit({
        adjustValues: values =>
          values.isTalent ? omit(values, ['dueDate']) : values,
        variables: { invoiceId: '123456' },
        ...handleSubmitMockData
      })(valuesMock)

      expect(submitMutation).toHaveBeenCalledTimes(1)
      expect(submitMutation).toHaveBeenCalledWith({
        beforeAction: 'exampleBeforeAction',
        handleError: 'exampleError',
        handleSuccess: 'exampleSuccess',
        input: {
          comment: 'Example comment',
          invoiceId: '123456',
          isTalent: true
        },
        responseKey: 'exampleResponseKey',
        spreadInputProps: true,
        submit: 'exampleSubmit',
        updateCache: 'exampleUpdateCache'
      })
    })
  })

  describe('when input not adjusted', () => {
    it('when values left untouched', () => {
      handleSubmit({
        ...handleSubmitMockData,
        variables: { invoiceId: '123456' }
      })(valuesMock)

      expect(submitMutation).toHaveBeenCalledTimes(1)
      expect(submitMutation).toHaveBeenCalledWith({
        beforeAction: 'exampleBeforeAction',
        handleError: 'exampleError',
        handleSuccess: 'exampleSuccess',
        input: {
          comment: 'Example comment',
          dueDate: '2015-05-05',
          invoiceId: '123456',
          isTalent: true
        },
        responseKey: 'exampleResponseKey',
        spreadInputProps: true,
        submit: 'exampleSubmit',
        updateCache: 'exampleUpdateCache'
      })
    })
  })

  describe('when variables is undefined', () => {
    it('when values left untouched', () => {
      handleSubmit(handleSubmitMockData)(valuesMock)

      expect(submitMutation).toHaveBeenCalledTimes(1)
      expect(submitMutation).toHaveBeenCalledWith({
        beforeAction: 'exampleBeforeAction',
        handleError: 'exampleError',
        handleSuccess: 'exampleSuccess',
        input: {
          comment: 'Example comment',
          dueDate: '2015-05-05',
          isTalent: true
        },
        responseKey: 'exampleResponseKey',
        spreadInputProps: true,
        submit: 'exampleSubmit',
        updateCache: 'exampleUpdateCache'
      })
    })
  })

  describe('validation before submit', () => {
    describe('when validation passes', () => {
      beforeEach(() => {
        handleSubmit({
          ...handleSubmitMockData,
          validate: () => {
            return {}
          },
          variables: { invoiceId: '123456' }
        })(valuesMock)
      })

      it('form is submitted', () => {
        expect(submitMutation).toHaveBeenCalledTimes(1)
      })
    })

    describe('when validation fails', () => {
      let submitResult = {}

      beforeEach(() => {
        submitResult = handleSubmit({
          ...handleSubmitMockData,
          validate: () => {
            return { someError: 'sample error message' }
          },
          variables: { invoiceId: '123456' }
        })(valuesMock)
      })

      it('form is not submitted', () => {
        expect(submitMutation).not.toHaveBeenCalled()
      })

      it('error object is returned', () => {
        expect(submitResult).toStrictEqual({
          someError: 'sample error message'
        })
      })
    })
  })
})

describe('#convertToInteger', () => {
  it.each`
    input        | expected
    ${2.54}      | ${'2'}
    ${2.2}       | ${'2'}
    ${2.0}       | ${'2'}
    ${2}         | ${'2'}
    ${0}         | ${'0'}
    ${''}        | ${''}
    ${'.'}       | ${''}
    ${undefined} | ${''}
    ${null}      | ${''}
  `(`converts '$input' --> '$expected'`, ({ input, expected }) => {
    const actual = convertToInteger(input)

    expect(actual).toBe(expected)
  })
})

describe('when there are nested errors', () => {
  it('returns the proper error object', () => {
    const data = {
      changeEngagementCommitment: {
        __typename: 'ChangeEngagementCommitmentPayload',
        engagement: null,
        errors: [
          {
            __typename: 'GraniteError',
            code: 'commentMandatory',
            key: 'comment',
            message: 'Comment is a required field.'
          },
          {
            __typename: 'GraniteError',
            code: 'commentMandatory',
            key: 'installments[0].dueDate',
            message: 'comment is a required field.'
          },
          {
            __typename: 'GraniteError',
            code: 'commentMandatory',
            key: 'other[0].dueDate.array[0].field',
            message: 'comment is a required field.'
          },
          { code: 'code', key: 'test.0.field', message: 'field error 1' },
          { code: 'code', key: 'test.1.field', message: 'field error 2' }
        ],
        success: false
      }
    }

    expect(
      handleOnSubmissionError('changeEngagementCommitment')({ data })
    ).toEqual({
      comment: 'Comment is a required field.',
      installments: [
        {
          dueDate: 'Comment is a required field.'
        }
      ],
      other: [
        { dueDate: { array: [{ field: 'Comment is a required field.' }] } }
      ],
      test: [{ field: 'Field error 1' }, { field: 'Field error 2' }]
    })
  })
})
