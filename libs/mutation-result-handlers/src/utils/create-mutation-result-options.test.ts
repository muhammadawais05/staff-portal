import { defineMessage } from '@toptal/staff-portal-message-bus'

import { createMutationResultOptions } from '.'
import { HandleMutationResultOptions } from '../form-error-handler'

const emitMock = jest.fn()

const mockInput = { onTime: '2022-03-02' }

const MESSAGE = defineMessage<{
  companyId: string
}>()

describe('createMutationResultOptions', () => {
  describe('when `options` parameter is omitted', () => {
    describe('when response is empty', () => {
      it('returns nothing if data is empty', () => {
        expect(createMutationResultOptions({}, emitMock, mockInput)).toEqual({
          mutationResult: null,
          isFormSubmit: true
        })
      })

      it('returns nothing if data is undefined', () => {
        expect(
          createMutationResultOptions(undefined, emitMock, mockInput)
        ).toEqual({
          mutationResult: null,
          isFormSubmit: true
        })
      })
    })

    describe('if response data contains several keys', () => {
      it('throws an error', () => {
        expect(() =>
          createMutationResultOptions(
            {
              a: { errors: [], success: true },
              b: { errors: [], success: true }
            },
            () => {},
            mockInput
          )
        ).toThrow(
          'Mutation response data contains more than one key (["a","b"]). ' +
            'Provide "mutationResult" option to specify key to extract'
        )
      })
    })

    describe('if response has data', () => {
      it('extracts data from response on first key', () => {
        const mutationResult = { test: 'foo', success: true, errors: [] }
        const data = { bar: mutationResult }

        expect(createMutationResultOptions(data, emitMock, mockInput)).toEqual({
          mutationResult,
          isFormSubmit: true
        })
      })
    })
  })

  describe('when `options` parameter is passed', () => {
    it('extracts data from response', () => {
      const mutationResult = { test: 'foo', success: true, errors: [] }
      const response = {
        keyOfResponse: mutationResult
      }

      const returnValue = createMutationResultOptions(
        response,
        emitMock,
        mockInput,
        {
          mutationResult: 'keyOfResponse'
        }
      )

      expect(returnValue).toEqual({
        mutationResult,
        isFormSubmit: true
      })
    })

    describe('when "onSuccessAction" prop passed', () => {
      it('returns expected value', () => {
        const mutationResult = { test: 'foo', success: true, errors: [] }
        const response = {
          keyOfResponse: mutationResult
        }
        const onSuccessAction = jest.fn()

        const returnValue = createMutationResultOptions(
          response,
          emitMock,
          mockInput,
          {
            mutationResult: 'keyOfResponse',
            onSuccessAction
          }
        )

        expect(returnValue).toEqual({
          mutationResult,
          isFormSubmit: true,
          onSuccessAction
        })
      })

      describe('when "successMessageEmitOptions" passed', () => {
        const mutationResult = { test: 'foo', success: true, errors: [] }
        const onSuccessAction = jest.fn()
        let returnValue: HandleMutationResultOptions<any>

        beforeEach(() => {
          const response = {
            keyOfResponse: mutationResult
          }

          returnValue = createMutationResultOptions(
            response,
            emitMock,
            mockInput,
            {
              mutationResult: 'keyOfResponse',
              onSuccessAction,
              successMessageEmitOptions: {
                type: MESSAGE,
                payload: {
                  companyId: 'blabla'
                }
              }
            }
          )
        })

        it('returns expected value', () => {
          expect(returnValue).toEqual({
            mutationResult,
            isFormSubmit: true,
            onSuccessAction: expect.any(Function)
          })
          expect(returnValue.onSuccessAction).not.toEqual(onSuccessAction)
        })

        it('returns an override `onSuccessAction` handler', () => {
          returnValue?.onSuccessAction?.(returnValue.mutationResult)

          expect(onSuccessAction).toHaveBeenCalledTimes(1)
          expect(onSuccessAction).toHaveBeenCalledWith(
            returnValue.mutationResult
          )

          expect(emitMock).toHaveBeenCalledTimes(1)
        })
      })
    })

    describe('when "successNotificationMessage" passed as a string', () => {
      it('returns expected value', () => {
        const mutationResult = { test: 'foo', success: true, errors: [] }
        const response = {
          keyOfResponse: mutationResult
        }

        const mockMessage = 'Mock success message'

        const returnValue = createMutationResultOptions(
          response,
          emitMock,
          mockInput,
          {
            successNotificationMessage: mockMessage,
            mutationResult: 'keyOfResponse'
          }
        )

        expect(returnValue.successNotificationMessage).toBe(mockMessage)
      })
    })

    describe('when "successNotificationMessage" passed as a function', () => {
      it('returns expected value', () => {
        const mutationResult = { test: 'foo', success: true, errors: [] }
        const response = {
          keyOfResponse: mutationResult
        }

        const mockMessage = 'Mock success message at'

        const returnValue = createMutationResultOptions(
          response,
          emitMock,
          mockInput,
          {
            successNotificationMessage: ({ onTime }) =>
              [mockMessage, onTime].join(' '),
            mutationResult: 'keyOfResponse'
          }
        )

        expect(returnValue.successNotificationMessage).toBe(
          `Mock success message at ${mockInput.onTime}`
        )
      })
    })

    describe('when "onSuccessAction" is omitted', () => {
      describe('when "successMessageEmitOptions" passed', () => {
        let returnValue: HandleMutationResultOptions<any>

        beforeEach(() => {
          const response = {
            result: { success: true, errors: [] }
          }

          returnValue = createMutationResultOptions(
            response,
            emitMock,
            mockInput,
            {
              mutationResult: 'result',
              successMessageEmitOptions: {
                type: MESSAGE,
                payload: {
                  companyId: 'blabla'
                }
              }
            }
          )
        })

        it('returns expected value', () => {
          expect(returnValue.onSuccessAction).toBeInstanceOf(Function)
        })

        it('returns an override `onSuccessAction` handler', () => {
          returnValue?.onSuccessAction?.(returnValue.mutationResult)

          expect(emitMock).toHaveBeenCalledTimes(1)
        })
      })
    })
  })
})
