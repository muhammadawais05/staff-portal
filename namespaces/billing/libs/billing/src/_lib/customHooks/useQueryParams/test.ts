import { act, renderHook } from '@testing-library/react-hooks'

import { ArrayParam, NumberParam, StringParam, useQueryParams } from '.'

let mockHistoryReplace = jest.fn()

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    search: 'param1=My+string+param&param2=34857&param3=Flag1&param3=Flag2'
  }),
  useHistory: () => ({
    replace: mockHistoryReplace
  })
}))

describe('useQueryParams', () => {
  beforeEach(() => {
    mockHistoryReplace = jest.fn()
  })

  it('returns url values', () => {
    const { result } = renderHook(() =>
      useQueryParams({
        param1: StringParam,
        param2: NumberParam,
        param3: ArrayParam
      })
    )

    const { current } = result

    expect(current[0]).toEqual({
      param1: 'My string param',
      param2: 34857,
      param3: ['Flag1', 'Flag2']
    })
  })

  it('sets url values', () => {
    const { result } = renderHook(() =>
      useQueryParams({
        param1: StringParam,
        param2: NumberParam,
        param3: ArrayParam
      })
    )

    act(() => {
      const { current } = result

      const setValues = current[1]

      setValues({ param2: 233, param3: ['Flag8'] })
    })

    expect(mockHistoryReplace).toHaveBeenCalledWith({
      search: 'param1=My+string+param&param2=233&param3=Flag8'
    })
  })
})
