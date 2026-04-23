import { renderHook } from '@testing-library/react-hooks'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { Exact, MutationResult } from '@staff-portal/graphql/staff'
import { useMutation, TypedDocumentNode } from '@staff-portal/data-layer-service'

import { useHandleMutationResult } from '../../form-error-handler'
import { useChangeHandlerUtils } from './use-change-handler-utils'

type PatchInput = {
  a?: string
  clientId: string
}

type Variables = Exact<{ input: PatchInput }>

type PatchResult = {
  result: { a: string } & MutationResult
  b: { b: string } & MutationResult
}

jest.mock('@toptal/staff-portal-message-bus', () => ({
  useMessageEmitter: jest.fn()
}))
jest.mock('@staff-portal/data-layer-service', () => ({
  useMutation: jest.fn()
}))
jest.mock('../../form-error-handler', () => ({
  useHandleMutationResult: jest.fn()
}))

const mutationDocument = {} as TypedDocumentNode<PatchResult, Variables>

const useMutationMock = useMutation as jest.Mock
const useHandleMutationResultMock = useHandleMutationResult as jest.Mock
const useMessageEmitterMock = useMessageEmitter as jest.Mock

describe('useChangeHandlerUtils', () => {
  it('calls functions and returns as expected', () => {
    const emitMessage = () => {}
    const mutate = () => {}
    const handleMutationResult = () => {}
    const useMutationVariables = {
      loading: false,
      called: false,
      error: undefined,
      data: {}
    }

    useMutationMock.mockReturnValue([mutate, useMutationVariables])
    useHandleMutationResultMock.mockReturnValue({
      handleMutationResult
    })
    useMessageEmitterMock.mockReturnValue(emitMessage)

    const {
      result: { current: utils }
    } = renderHook(() =>
      useChangeHandlerUtils({
        mutationDocument,
        onCompleted: () => {}
      })
    )

    expect(utils).toEqual({
      mutate,
      emitMessage,
      handleMutationResult,
      ...useMutationVariables
    })
  })
})
