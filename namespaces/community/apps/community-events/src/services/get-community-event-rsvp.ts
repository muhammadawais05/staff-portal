import { CommunityEventRsvp } from '@staff-portal/graphql/staff'

const COMMUNITY_EVENT_RSVP_MAP = {
  [CommunityEventRsvp.INTERNAL_RSVP]: 'Internal',
  [CommunityEventRsvp.EXTERNAL_RSVP]: 'External',
  [CommunityEventRsvp.NO_RSVP]: 'No'
}

export const getCommunityEventRSVP = (rsvp: CommunityEventRsvp) => {
  return COMMUNITY_EVENT_RSVP_MAP[rsvp]
}
