import { TaskCardLayoutContentItem } from '@staff-portal/tasks'

import { COMMUNITY_EVENT_CONFIGURATION } from '../../config'
import { CommunityEventFragment } from '../../data/community-event-fragment'
import { getCommunityEventContentMapping } from './get-community-event-content-mapping'

export const getCommunityEventContentItems = (
  communityEvent: CommunityEventFragment
): TaskCardLayoutContentItem[] => {
  const contentMapping = getCommunityEventContentMapping(communityEvent)

  return COMMUNITY_EVENT_CONFIGURATION.map(key => ({
    key,
    ...contentMapping[key]
  }))
}
