import { renderHook } from '@testing-library/react-hooks'
import { TypedDocumentNode } from '@graphql-typed-document-node/core'

import { useGetData } from './use-get-data'
import { useGetNode } from './use-get-node'
import { useGetStaffNode } from './use-get-staff-node'
import { useGetNodes } from './use-get-nodes'
import { useQuery } from '../../hooks'

jest.mock('../../hooks')

const mockUseQuery = useQuery as jest.Mock
const mockDoc = {
  kind: 'Document',
  definitions: []
} as TypedDocumentNode

describe('GQL query data helper', () => {
  describe('#useGetData', () => {
    describe('when `initialLoading` is `true`', () => {
      it('returns loading state during request', () => {
        mockUseQuery.mockReturnValue({
          data: undefined,
          error: false,
          loading: true
        })
        const mockResult = {
          data: undefined,
          error: false,
          loading: true,
          refetch: undefined
        }

        expect(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          useGetData<any, any>(mockDoc, 'custom')(
            { test: 'abc' },
            { fetchPolicy: 'network-only' }
          )
        ).toEqual(mockResult)
      })
    })

    it('returns properties of custom data field', () => {
      const mockData = { foo: 'bar' }

      mockUseQuery.mockReturnValue({
        data: { custom: mockData },
        error: false,
        loading: false
      })
      const mockResult = {
        data: mockData,
        error: false,
        loading: false,
        refetch: undefined
      }

      const { result } = renderHook(() => {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        return useGetData<any, any>(mockDoc, 'custom')(
          { test: 'abc' },
          { fetchPolicy: 'network-only' }
        )
      })

      expect(result.current).toEqual(mockResult)
    })
  })

  describe('#useGetNode', () => {
    it('returns properties of `data.node`', () => {
      const mockData = { foo: 'bar' }

      mockUseQuery.mockReturnValue({
        data: { node: mockData },
        error: false,
        loading: false
      })
      const mockResult = {
        data: mockData,
        error: false,
        loading: false,
        refetch: undefined
      }

      const { result } = renderHook(() => useGetNode(mockDoc)({ test: 'abc' }))

      expect(result.current).toEqual(mockResult)
    })
  })

  describe('#useGetStaffNode', () => {
    it('returns properties of `data.node`', () => {
      const mockData = { foo: 'bar' }

      mockUseQuery.mockReturnValue({
        data: { staffNode: mockData },
        error: false,
        loading: false
      })
      const mockResult = {
        data: mockData,
        error: false,
        loading: false,
        refetch: undefined
      }

      const { result } = renderHook(() =>
        useGetStaffNode(mockDoc)({ test: 'abc' })
      )

      expect(result.current).toEqual(mockResult)
    })
  })

  describe('#useGetNodes', () => {
    it('returns properties of `data.nodes`', () => {
      const mockData = [{ foo: 'bar' }]

      mockUseQuery.mockReturnValue({
        data: { nodes: mockData },
        error: false,
        loading: false
      })
      const mockResult = {
        data: mockData,
        error: false,
        loading: false,
        refetch: undefined
      }

      const { result } = renderHook(() => useGetNodes(mockDoc)({ test: 'abc' }))

      expect(result.current).toEqual(mockResult)
    })
  })
})
