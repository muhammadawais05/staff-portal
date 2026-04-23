import { useQuery } from '@apollo/client'
import fixtures from '@staff-portal/billing/src/_fixtures'

import { useGetCommercialDocumentMemorandums } from '.'

jest.mock('@apollo/client')

describe('Memorandums', () => {
  it('will return loading state properly', () => {
    ;(useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: null,
      loading: true,
      initialLoading: true
    })

    expect(useGetCommercialDocumentMemorandums('abc123')).toEqual({
      data: undefined,
      error: null,
      loading: true,
      initialLoading: true,
      refetch: undefined
    })
  })

  it('will return data when loading is complete', () => {
    ;(useQuery as jest.Mock).mockReturnValue({
      data: { node: fixtures.MockGetCommercialDocumentMemorandums },
      error: null,
      loading: false
    })

    expect(useGetCommercialDocumentMemorandums('abc123')).toEqual({
      data: fixtures.MockGetCommercialDocumentMemorandums,
      error: null,
      loading: false,
      initialLoading: false,
      refetch: undefined
    })
  })
})
