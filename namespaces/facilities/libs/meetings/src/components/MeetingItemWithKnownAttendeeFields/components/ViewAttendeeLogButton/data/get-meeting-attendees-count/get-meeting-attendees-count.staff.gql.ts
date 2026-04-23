import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetMeetingAttendeesCount($meetingUrl: String!) {
    meetingEndpoints(
      pagination: { limit: 1000, offset: 0 }
      meetingUrl: $meetingUrl
    ) {
      totalCount
    }
  }
`
