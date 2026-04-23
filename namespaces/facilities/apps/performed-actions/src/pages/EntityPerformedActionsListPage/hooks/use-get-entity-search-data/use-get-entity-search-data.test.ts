import { renderHook } from '@testing-library/react-hooks'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import useGetEntitySearchData from './use-get-entity-search-data'

describe('useGetEntitySearchData', () => {
  it('renders a valid entity search data', () => {
    const { result } = renderHook(() =>
      useGetEntitySearchData({
        entityType: 'Talent',
        entityId: encodeEntityId('123', 'Talent'),
        decodedEntityId: '123'
      })
    )

    expect(result.current).toEqual({
      entityGid: 'gid://platform/Talent/123',
      searchVariables: {
        feeds: [['gid://platform/Talent/123']]
      }
    })
  })
})
