import { renderHook } from '@testing-library/react-hooks'
import { Operation, OperationCallableTypes } from '@staff-portal/graphql/staff'
import { useQuery, ApolloError } from '@staff-portal/data-layer-service'
import { NodeType } from '@staff-portal/graphql'

import { useGetOperation } from './use-get-operation'

jest.mock('../data/get-lazy-operation', () => ({
  makeGetLazyOperationQuery: () => null
}))
jest.mock('@staff-portal/data-layer-service', () => ({
  ApolloError: jest.requireActual('@staff-portal/data-layer-service').ApolloError,
  useQuery: jest.fn(),
  concatMessages: (messages?: []) => messages?.join('')
}))

const OPERATION_NAME = 'addClientRoleFlag'

const useQueryMock = useQuery as jest.Mock
const mockUseQuery = (result: {
  loading: boolean
  data?: { node: { operations: { [OPERATION_NAME]: Operation } } }
  error?: ApolloError
}) => {
  useQueryMock.mockImplementationOnce(() => result)
}

const arrangeTest = () => {
  return renderHook(() =>
    useGetOperation({
      nodeId: '123',
      nodeType: NodeType.CLIENT,
      operationName: OPERATION_NAME
    })
  )
}

describe('useGetOperation', () => {
  it('returns loading state', () => {
    mockUseQuery({ loading: true })

    const {
      result: { current }
    } = arrangeTest()

    expect(current).toStrictEqual({
      enabled: false,
      error: undefined,
      loading: true
    })
  })

  it('returns enabled', () => {
    mockUseQuery({
      loading: false,
      data: {
        node: {
          operations: {
            [OPERATION_NAME]: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            }
          }
        }
      }
    })

    const {
      result: { current }
    } = arrangeTest()

    expect(current).toStrictEqual({
      enabled: true,
      error: null,
      loading: false
    })
  })

  it('returns error', () => {
    const ERROR = new ApolloError({
      networkError: new Error('Failed to fetch')
    })

    mockUseQuery({
      loading: false,
      error: ERROR
    })

    const {
      result: { current }
    } = arrangeTest()

    expect(current).toStrictEqual({
      enabled: false,
      error: 'Failed to fetch',
      loading: false
    })
  })
})
