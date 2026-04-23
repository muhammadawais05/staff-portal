import { gql } from '@staff-portal/data-layer-service'

export const MEETING_FRAGMENT = gql`
  fragment MeetingFragment on Meeting {
    id
    subject
    currentScheduler {
      id
      code
      role {
        ... on Node {
          id
        }
        ... on Role {
          id
          type
          roleTitle
          fullName
          email
        }
        ... on Client {
          id
          type
          fullName
          email
        }
      }
    }
    attendeeName
    attendeeEmail
    attendee {
      ... on Node {
        id
      }
      ... on CompanyRepresentative {
        id
        client {
          id
          webResource {
            url
            text
          }
        }
      }
      ... on WebResource {
        webResource {
          url
          text
        }
      }
      __typename
    }
    callbackRequest {
      id
      type
    }
    masterBookingPage {
      id
      title
    }
    scheduledAt
    scheduledVia
    durationMinutes
    status
    outcome
    comment
    organizer {
      ... on Node {
        id
      }
      ... on Role {
        id
        fullName
      }
      ... on Client {
        id
        fullName
      }
      ... on WebResource {
        webResource {
          url
          text
        }
      }
    }
    additionalInformation
    conferenceLink {
      text
      url
    }
    moderationUrl
    relatedToRoleStep {
      id
      title
    }
    operations {
      cancelMeeting {
        ...MeetingOperationFragment
      }
      completeMeeting {
        ...MeetingOperationFragment
      }
      completeMeetingWithSurvey {
        ...MeetingOperationFragment
      }
      failMeeting {
        ...MeetingOperationFragment
      }
      transferMeeting {
        ...MeetingOperationFragment
      }
      becomeMeetingOrganizer {
        ...MeetingOperationFragment
      }
      assignMeetingAttendee {
        ...MeetingOperationFragment
      }
      removeMeeting {
        ...MeetingOperationFragment
      }
    }
  }

  fragment MeetingOperationFragment on Operation {
    callable
    messages
  }
`
