import { CommunityEventCategory } from '@staff-portal/graphql/staff'

const COMMUNITY_EVENT_CATEGORIES_MAP = {
  [CommunityEventCategory.COMMUNITY]: 'Community',
  [CommunityEventCategory.OTHER]: 'Other',
  [CommunityEventCategory.TOPTAL_ORGANIZED]: 'Toptal',
  [CommunityEventCategory.TOPTAL_SPONSORED]: 'Sponsored'
}

export const getCommunityEventCategoriesMapped = (
  categories: CommunityEventCategory[]
) => {
  return categories.map(category => COMMUNITY_EVENT_CATEGORIES_MAP[category])
}
