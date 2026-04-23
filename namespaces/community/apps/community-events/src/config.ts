import {
  CommunityEventCategory,
  CommunityEventStatus,
  CommunityEventSource,
  CommunityEventVenue
} from '@staff-portal/graphql/staff'

type MappingValue = string | { label: string; value: string }

export const EVENT_SOURCE_MAPPING: Record<CommunityEventSource, MappingValue> =
  {
    [CommunityEventSource.CLIENT]: 'Client',
    [CommunityEventSource.TALENT]: 'Talent'
  }

export const EVENT_CATEGORY_MAPPING: Record<
  CommunityEventCategory,
  MappingValue
> = {
  [CommunityEventCategory.COMMUNITY]: 'Community',
  [CommunityEventCategory.OTHER]: 'Other',
  [CommunityEventCategory.TOPTAL_ORGANIZED]: 'Toptal',
  [CommunityEventCategory.TOPTAL_SPONSORED]: 'Sponsored'
}

export const EVENT_STATUS_MAPPING: Record<CommunityEventStatus, MappingValue> =
  {
    [CommunityEventStatus.APPROVED]: 'Approved',
    [CommunityEventStatus.PENDING]: 'Pending',
    [CommunityEventStatus.REJECTED]: 'Rejected',
    [CommunityEventStatus.REMOVED]: 'Removed'
  }

export const EVENT_VENUE_MAPPING: Record<CommunityEventVenue, MappingValue> = {
  [CommunityEventVenue.ALL_EVENTS]: {
    label: 'All Events',
    value: ''
  },
  [CommunityEventVenue.OFFLINE]: 'Offline',
  [CommunityEventVenue.ONLINE]: 'Online'
}
