import { gql } from '@staff-portal/data-layer-service'

export const COMMUNITY_EVENT_FRAGMENT = gql`
  fragment CommunityEventFragmentV2 on CommunityEvent {
    attendees(pagination: { offset: 0, limit: 0 }) {
      totalCount
    }
    categories
    description
    id
    name
    shortName
    rsvp
    slug
    status
    leader {
      id
      name
      photoUrl
    }
    eventLocation {
      address
      city
      country {
        id
        name
      }
      id
    }
    scheduledTime {
      startDate
      startTime
      endDate
      endTime
      id
      timeZone {
        value
        name
      }
    }
  }
`
