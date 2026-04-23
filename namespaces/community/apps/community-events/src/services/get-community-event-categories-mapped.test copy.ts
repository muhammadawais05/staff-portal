import { CommunityEventCategory } from '@staff-portal/graphql/staff'

import { getCommunityEventCategoriesMapped } from './get-community-event-categories-mapped'

describe('Get community event category names', () => {
  it.each([
    [[CommunityEventCategory.COMMUNITY], ['Community']],
    [[CommunityEventCategory.OTHER], ['Other']],
    [[CommunityEventCategory.TOPTAL_ORGANIZED], ['Toptal']],
    [[CommunityEventCategory.TOPTAL_SPONSORED], ['Sponsored']],
    [
      [
        CommunityEventCategory.COMMUNITY,
        CommunityEventCategory.TOPTAL_SPONSORED,
        CommunityEventCategory.OTHER
      ],
      ['Community', 'Sponsored', 'Other']
    ]
  ])(
    'returns proper category names for %s category enum(s)',
    (value, expected) => {
      const result = getCommunityEventCategoriesMapped(value)

      expect(result).toEqual(expected)
    }
  )
})
