import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetPossibleSchedulersForBecomeOrganizer(
    $meetingId: ID!
    $from: Time!
    $till: Time!
  ) {
    node(id: $meetingId) {
      ... on Meeting {
        id
        possibleSchedulersForBecomeOrganizer {
          nodes {
            ...SchedulerForBecomeOrganizerFragment
          }
        }
      }
    }
  }

  fragment SchedulerForBecomeOrganizerFragment on MeetingScheduler {
    id
    code
    role {
      ... on Role {
        id
        fullName
        availableForMeeting(from: $from, till: $till)
      }
    }
  }
`
