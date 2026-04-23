import { CommunityEventStatus } from '@staff-portal/graphql/staff'
import { ColorType } from '@toptal/picasso'

const COMMUNITY_EVENT_STATUS_MAP: Record<
  CommunityEventStatus,
  { label: string; color: ColorType }
> = {
  [CommunityEventStatus.APPROVED]: {
    label: 'Approved',
    color: 'green'
  },
  [CommunityEventStatus.PENDING]: {
    label: 'Pending',
    color: 'yellow'
  },
  [CommunityEventStatus.REJECTED]: {
    label: 'Rejected',
    color: 'red'
  },
  [CommunityEventStatus.REMOVED]: {
    label: 'Removed',
    color: 'red'
  }
}

export const getCommunityEventStatusMapped = (status: CommunityEventStatus) => {
  return COMMUNITY_EVENT_STATUS_MAP[status]
}
