/* eslint-disable jest/no-conditional-expect */

import { renderHook } from '@testing-library/react-hooks'
import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { useQuery } from '@staff-portal/data-layer-service'

import { useGetSearchList } from './use-get-search-list'
import useNotifications from './use-notifications'

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useQuery: jest.fn()
}))
jest.mock('./use-notifications', () => ({
  __esModule: true,
  default: jest.fn()
}))

const mockUseQuery = useQuery as jest.Mock
const mockDoc = {
  kind: 'Document',
  definitions: []
} as TypedDocumentNode

const useNotificationsMock = useNotifications as jest.Mock
const showErrorMock = jest.fn()

describe('#useGetSearchList', () => {
  beforeEach(() => {
    useNotificationsMock.mockReturnValue({
      showError: showErrorMock
    })
  })

  it('shows no notification if no error occur', () => {
    const mockData = [{ foo: 'bar' }]
    const onError = jest.fn()
    const data = { nodes: mockData }

    mockUseQuery.mockReturnValue({
      data,
      error: false,
      loading: false
    })
    const mockResult = {
      data,
      error: false,
      loading: false,
      refetch: undefined
    }

    const { result } = renderHook(() => useGetSearchList(mockDoc, { onError }))

    expect(result.current).toEqual(mockResult)
    expect(showErrorMock).toHaveBeenCalledTimes(0)
  })

  it('shows error notification if data is corrupted', () => {
    mockUseQuery.mockImplementation(() => {
      throw new Error('test')
    })

    const onError = jest.fn()

    // avoid error appearing on console
    const consoleErrorSpy = jest.spyOn(console, 'error')

    consoleErrorSpy.mockImplementation(() => {})

    try {
      renderHook(() => useGetSearchList(mockDoc, { onError }))
    } catch (error) {
      expect(error).toEqual(Error('test'))
      expect(showErrorMock).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledTimes(1)
    }
  })
})
