import { MeetingStatus } from '@staff-portal/graphql/staff'

import {
  CompleteMeetingMutationVariables,
  CompleteMeetingDocument
} from './complete-meeting.staff.gql.types'

export const createSuccessfulCompleteMeetingMock = (
  input: CompleteMeetingMutationVariables
) => ({
  request: { query: CompleteMeetingDocument, variables: input },
  result: {
    data: {
      completeMeeting: {
        success: true,
        errors: [],
        __typename: 'CompleteMeetingPayload',
        meeting: {
          id: input.meetingId,
          subject: 'Meeting subject',
          attendeeName: 'John Doe',
          attendeeEmail: null,
          attendee: null,
          currentScheduler: null,
          callbackRequest: null,
          masterBookingPage: null,
          scheduledAt: null,
          scheduledVia: null,
          durationMinutes: null,
          status: MeetingStatus.COMPLETED,
          outcome: null,
          comment: null,
          organizer: null,
          additionalInformation: null,
          conferenceLink: null,
          moderationUrl: null,
          relatedToRoleStep: null,
          operations: null,
          __typename: 'Meeting'
        }
      }
    }
  }
})
