import { renderHook } from '@testing-library/react-hooks'

import { useRoleTitle } from './useRoleTitle'

describe('#useRoleTitle', () => {
  describe('When `node` is nullable', () => {
    it('returns `undefined` result', () => {
      const { result: undefinedResult } = renderHook(() =>
        useRoleTitle(null, [])
      )

      expect(undefinedResult.current).toBeUndefined()
    })
  })

  it('generates role title relatively to autocomplete node data', () => {
    const { result: undefinedResult } = renderHook(() =>
      useRoleTitle({ __typename: 'Client', id: 'foo', roleType: 'foo' }, [])
    )

    expect(undefinedResult.current).toBeUndefined()

    const { result } = renderHook(() =>
      useRoleTitle(
        {
          __typename: 'Client',
          id: 'MS1DbGllbnQtMjIzOTQ2',
          roleType: 'foo',
          companyLegacyId: 12345
        },
        ['top_level_company']
      )
    )

    expect(result.current).toBe('top_level_company #12345')

    const { result: resultWithoutCompanyId } = renderHook(() =>
      useRoleTitle(
        { __typename: 'Client', id: 'MS1DbGllbnQtMjIzOTQ2', roleType: 'foo' },
        ['developer']
      )
    )

    expect(resultWithoutCompanyId.current).toBe('developer')
  })
})
