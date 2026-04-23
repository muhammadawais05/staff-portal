import { renderHook } from '@testing-library/react-hooks'

import useGetStaffAbilitySearchData from './use-get-staff-ability-search-data'

describe('useGetStaffAbilitySearchData', () => {
  it('renders a valid staff ability search data', () => {
    const { result } = renderHook(() =>
      useGetStaffAbilitySearchData({
        entityType: '',
        entityId: '',
        decodedEntityId: '123'
      })
    )

    expect(result.current).toEqual({
      entityGid: 'gid://platform/Ability/123',
      searchVariables: {
        feeds: [['gid://platform/Ability/123']]
      }
    })
  })
})
