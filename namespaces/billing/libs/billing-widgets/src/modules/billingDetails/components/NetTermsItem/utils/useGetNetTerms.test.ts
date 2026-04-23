import { renderHook } from '@testing-library/react-hooks'

import { useGetNetTerms } from './useGetNetTerms'

describe('useGetNetTerms', () => {
  it('returns proper data object', () => {
    const { result } = renderHook(() => useGetNetTerms('123'))

    expect(result.current()).toEqual({
      data: undefined,
      loading: false,
      request: expect.anything()
    })
  })
})
