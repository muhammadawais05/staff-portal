import * as Sentry from '@sentry/react'

import {
  decodeId,
  decodeRawIdAndType,
  encodeId,
  getEGidIntl,
  getInvoiceOldFormat,
  getMutationErrorMessage,
  getNotableObject,
  getOldGID,
  submitMutation,
  LegacyGidFormat
} from '.'

jest.mock('@sentry/react', () => ({
  captureMessage: jest.fn()
}))

describe('Apollo helpers', () => {
  describe('#getMutationErrorMessage', () => {
    describe('when error type is `networkError`', () => {
      describe('when error type is `ServerError`', () => {
        it('return a formatted string', () => {
          expect(
            getMutationErrorMessage({
              networkError: {
                result: {
                  errors: [{ message: 'Error 01' }, { message: 'Error 02' }]
                }
              }
            })
          ).toBe(`Error 01

Error 02`)

          expect(Sentry.captureMessage).toHaveBeenNthCalledWith(
            1,
            `[networkError error]: Error 01

Error 02`
          )
        })
      })

      describe('when error type is `ServerParseError`', () => {
        it('return a formatted string', () => {
          expect(
            getMutationErrorMessage({
              networkError: { response: 'Bad request', statusCode: 404 }
            })
          ).toBe('404 Bad request')

          expect(Sentry.captureMessage).toHaveBeenNthCalledWith(
            2,
            '[networkError error]: 404 Bad request'
          )
        })
      })

      describe('when error type is `Error`', () => {
        it('return a formatted string', () => {
          expect(
            getMutationErrorMessage({
              networkError: { message: 'example error' }
            })
          ).toBe('example error')

          expect(Sentry.captureMessage).toHaveBeenCalledTimes(3)
          expect(Sentry.captureMessage).toHaveBeenNthCalledWith(
            3,
            '[networkError error]: example error'
          )
        })
      })
    })

    describe('when error type is `graphQLErrors`', () => {
      it('return a formatted string', () => {
        expect(
          getMutationErrorMessage({
            graphQLErrors: [{ message: 'Error 01' }, { message: 'Error 02' }]
          })
        ).toBe(`Error 01

Error 02`)

        expect(Sentry.captureMessage).toHaveBeenNthCalledWith(
          4,
          `[graphQLErrors error]: Error 01

Error 02`
        )
      })
    })
  })

  describe('#getEGidIntl', () => {
    it('return a formatted string', () => {
      expect(getEGidIntl('gid://platform/Billing::Cycle/357504')).toBe(357504)
    })
  })

  describe('#decodeRawIdAndType', () => {
    it.each`
      inputId                               | type              | id
      ${'VjEtSW52b2ljZS0xMjM0NTY='}         | ${'invoice'}      | ${'123456'}
      ${'VjEtUGF5bWVudC0wMDAxMjM0'}         | ${'payment'}      | ${'0001234'}
      ${'VjEtUGF5bWVudEdyb3VwLTAwMDEyMzQ='} | ${'paymentGroup'} | ${'0001234'}
    `('given $inputId returns $type and $id', ({ inputId, type, id }) => {
      const actual = decodeRawIdAndType(inputId)
      const expected = {
        id,
        type
      }

      expect(actual).toEqual(expected)
    })
  })

  describe('#decodeId', () => {
    describe('when type is `engagement`', () => {
      it('return a formatted string', () => {
        expect(
          decodeId({
            id: 'VjEtRW5nYWdlbWVudC0xNzE2MDg',
            type: 'engagement'
          })
        ).toBe(171608)
      })
    })

    describe('when type is `job`', () => {
      it('return a formatted string', () => {
        expect(decodeId({ id: 'VjEtSm9iLTE0NTU0NA', type: 'job' })).toBe(145544)
      })
    })
  })

  describe('#encodeId', () => {
    describe('when type is `engagement`', () => {
      it('return a formatted string', () => {
        expect(encodeId({ id: '171608', type: 'engagement' })).toBe(
          'VjEtRW5nYWdlbWVudC0xNzE2MDg'
        )
      })
    })

    describe('when type is `job`', () => {
      it('return a formatted string', () => {
        expect(encodeId({ id: '145544', type: 'job' })).toBe(
          'VjEtSm9iLTE0NTU0NA'
        )
      })
    })

    describe('when type is `invoice`', () => {
      it('return a formatted string', () => {
        expect(encodeId({ id: 377249, type: 'invoice' })).toBe(
          'VjEtSW52b2ljZS0zNzcyNDk'
        )
      })
    })
  })
})

describe('#getInvoiceOldFormat', () => {
  it('return a proper relative `platform` url from an encoded id', () => {
    expect(getInvoiceOldFormat('VjEtSW52b2ljZS0zNzcyNDk')).toBe(377249)
  })
})

describe('#submitMutation', () => {
  let responseMock, submitMutationArgsMock

  describe('when mutation performed properly', () => {
    describe('resolved with `success` `true`', () => {
      beforeEach(() => {
        responseMock = {
          data: {
            invoiceData: {
              errors: [{ code: 'UNAUTHORIZED', key: 'example' }],
              success: true
            }
          }
        }
        submitMutationArgsMock = {
          beforeAction: jest.fn(),
          handleError: jest.fn(),
          handleSuccess: jest.fn(),
          input: { invoiceId: 'abc123' },
          responseKey: 'invoiceData',
          submit: jest.fn(async () => responseMock),
          updateCache: 'exampleUpdateCache'
        }
      })

      describe('when response is `success`', () => {
        it('beforeAction called', async () => {
          await submitMutation(submitMutationArgsMock)

          expect(submitMutationArgsMock.beforeAction).toHaveBeenCalledTimes(1)
        })

        it('`handleSuccess` logic`', async () => {
          await submitMutation(submitMutationArgsMock)

          expect(submitMutationArgsMock.handleSuccess).toHaveBeenNthCalledWith(
            1,
            submitMutationArgsMock.input,
            responseMock.data.invoiceData
          )
          expect(submitMutationArgsMock.handleError).not.toHaveBeenCalled()
        })
      })

      describe('when `spreadInputProps` is `false`', () => {
        it('`updateCache` logic', async () => {
          await submitMutation(submitMutationArgsMock)

          expect(submitMutationArgsMock.submit).toHaveBeenNthCalledWith(1, {
            update: submitMutationArgsMock.updateCache,
            variables: { input: submitMutationArgsMock.input }
          })
        })
      })

      describe('when `spreadInputProps` is `true`', () => {
        it('`updateCache` logic', async () => {
          await submitMutation({
            ...submitMutationArgsMock,
            spreadInputProps: true
          })

          expect(submitMutationArgsMock.submit).toHaveBeenNthCalledWith(1, {
            update: submitMutationArgsMock.updateCache,
            variables: { ...submitMutationArgsMock.input }
          })
        })
      })
    })

    describe('resolved with `success` `fail`', () => {
      beforeEach(() => {
        responseMock = {
          data: {
            invoiceData: {
              errors: [{ code: 'UNAUTHORIZED', key: 'example' }],
              success: false
            }
          }
        }
        submitMutationArgsMock = {
          beforeAction: jest.fn(),
          handleError: jest.fn(),
          handleSuccess: jest.fn(),
          input: { invoiceId: 'abc123' },
          responseKey: 'invoiceData',
          submit: jest.fn(() => Promise.resolve(responseMock)),
          updateCache: 'exampleUpdateCache'
        }
      })

      describe('when response is not `success`', () => {
        it('`handleError` logic`', async () => {
          await submitMutation(submitMutationArgsMock)

          expect(submitMutationArgsMock.handleSuccess).not.toHaveBeenCalled()
          expect(submitMutationArgsMock.handleError).toHaveBeenNthCalledWith(
            1,
            responseMock
          )
        })
      })
    })
  })

  describe('when mutation ended up in an error', () => {
    let error

    beforeEach(() => {
      error = {
        networkError: { response: 'Bad request', statusCode: 400 }
      }
      submitMutationArgsMock = {
        beforeAction: jest.fn(),
        handleError: jest.fn(),
        handleSuccess: jest.fn(),
        input: { invoiceId: 'abc123' },
        responseKey: 'invoiceData',
        submit: jest.fn(() => Promise.reject(error)),
        updateCache: jest.fn()
      }
    })

    it('handleError called', async () => {
      await submitMutation(submitMutationArgsMock)

      expect(submitMutationArgsMock.handleError).toHaveBeenCalledWith(error)
    })
  })
})

describe('#getNotableObject', () => {
  it('returns properly formatted object', () => {
    expect(getNotableObject('VjEtSW52b2ljZS0zNzcyNDk')).toStrictEqual({
      notableId: '377249',
      notableType: 'invoice'
    })

    expect(getNotableObject('VjEtUHVyY2hhc2VPcmRlci0yMDAz')).toStrictEqual({
      notableId: '2003',
      notableType: 'purchaseOrder'
    })
  })
})

describe.each([
  ['engagement', 123456, 'gid://platform/Engagement/123456'],
  ['billingCycle', 123456, 'gid://platform/Billing::Cycle/123456'],
  ['invoice', 123456, 'gid://platform/Invoice/123456']
] as [keyof typeof LegacyGidFormat, number, string][])(
  '#getOldGID',
  (type, id, oldId) => {
    describe(`when type is ${type}`, () => {
      it('return the old GID', () => {
        expect(getOldGID({ id, type })).toBe(oldId)
      })
    })
  }
)
