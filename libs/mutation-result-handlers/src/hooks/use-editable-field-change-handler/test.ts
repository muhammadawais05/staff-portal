import { renderHook } from '@testing-library/react-hooks'
import type {
  TypedDocumentNode,
  MutationFunctionOptions,
  FetchResult
} from '@staff-portal/data-layer-service'
import { TypedMessage } from '@toptal/staff-portal-message-bus'
import type { Exact } from '@staff-portal/graphql/staff'

import { UseChangeHandlerProps, SuccessMessageEmitOptions } from '../../types'
import { MutationResult } from '../../form-error-handler'
import { useChangeHandlerUtils } from '../use-change-handler-utils'
import { createMutationResultOptions } from '../../utils'
import { useEditableFieldChangeHandler } from '.'

jest.mock('../../utils')
jest.mock('../../form-error-handler')
jest.mock('../use-change-handler-utils')

const useChangeHandlerUtilsMock = useChangeHandlerUtils as jest.Mock
const createMutationResultOptionsMock = createMutationResultOptions as jest.Mock

type PatchInput = {
  a?: string
  clientId: string
}

type Variables = Exact<{ input: PatchInput }>

type PatchResult = {
  result: { a: string } & MutationResult
  b: { b: string } & MutationResult
}

const mutationDocument = {} as TypedDocumentNode<PatchResult, Variables>
const requiredValues = { clientId: 'clientId' }

const arrangeTest = () => {
  const handleMutationResult = jest.fn(() => 'result')

  const mutationResponse: FetchResult<PatchResult> = {
    data: {
      result: { a: 'a', success: true, errors: [] },
      b: { b: 'b', success: true, errors: [] }
    }
  }
  const mutate = jest.fn(() => mutationResponse)

  const emitMessage = jest.fn()

  useChangeHandlerUtilsMock.mockReturnValue({
    handleMutationResult,
    mutate,
    emitMessage
  })

  return { mutate, handleMutationResult, mutationResponse, emitMessage }
}

describe('useEditableFieldChangeHandler', () => {
  describe('when checks if value changed', () => {
    describe('when "isValueChanged" prop passed', () => {
      it('uses "isValueChanged" func to check if value changed', () => {
        arrangeTest()

        const isValueChanged = jest.fn()

        const {
          result: { current: onChange }
        } = renderHook(() =>
          useEditableFieldChangeHandler({
            mutationDocument,
            requiredValues,
            initialValues: { a: 'a' },
            isValueChanged
          })
        )

        onChange('a', { a: 'new' })

        expect(isValueChanged).toHaveBeenCalledTimes(1)
        expect(isValueChanged).toHaveBeenCalledWith(
          'a',
          { a: 'a' },
          { a: 'new' }
        )
      })
    })
  })

  describe('when field value is changed', () => {
    it('invokes mutation', () => {
      const { mutate } = arrangeTest()
      const expectedMutateArgs: MutationFunctionOptions<
        PatchResult,
        Variables
      > = {
        variables: {
          input: { clientId: requiredValues.clientId, a: 'a' }
        }
      }

      // Act
      const {
        result: { current: onChange }
      } = renderHook(() =>
        useEditableFieldChangeHandler({
          mutationDocument,
          requiredValues,
          initialValues: { a: '' }
        })
      )

      onChange('a', { a: 'a' })

      // Assert
      expect(mutate).toHaveBeenCalledTimes(1)
      expect(mutate).toHaveBeenCalledWith(expectedMutateArgs)
    })

    it('passes expected arguments to "createMutationResultOptions"', async () => {
      const { mutationResponse, emitMessage } = arrangeTest()

      const mutationResultOptions: UseChangeHandlerProps<
        PatchResult,
        MutationResult,
        PatchInput,
        Pick<PatchInput, 'a'>,
        SuccessMessageEmitOptions<TypedMessage<unknown>>
      > = {
        mutationDocument: mutationDocument,
        requiredValues: { clientId: '' },
        initialValues: { a: '' },
        isValueChanged: () => true,
        mutationResultOptions: {
          mutationResult: 'result'
        }
      }

      const mockInput = { a: 'new' }
      const {
        result: { current: onChange }
      } = renderHook(() => useEditableFieldChangeHandler(mutationResultOptions))

      await onChange('a', mockInput)

      expect(createMutationResultOptionsMock).toHaveBeenCalledTimes(1)
      expect(createMutationResultOptionsMock).toHaveBeenCalledWith(
        mutationResponse.data,
        emitMessage,
        mockInput,
        mutationResultOptions.mutationResultOptions
      )
    })

    it('returns result of "handleMutationResult" execution', async () => {
      arrangeTest()

      const {
        result: { current: onChange }
      } = renderHook(() =>
        useEditableFieldChangeHandler({
          mutationDocument,
          requiredValues,
          initialValues: { a: '' },
          isValueChanged: () => true
        })
      )

      const returnValue = await onChange('a', { a: 'a' })

      expect(returnValue).toBe('result')
    })
  })
})
