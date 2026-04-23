import { MeetingStatus } from '@staff-portal/graphql/staff'

import {
  CompleteMeetingWithSurveyMutationVariables,
  CompleteMeetingWithSurveyDocument
} from './complete-meeting-with-survey.staff.gql.types'

export const createSuccessfulCompleteMeetingWithSurveyMock = (
  input: CompleteMeetingWithSurveyMutationVariables['input']
) => ({
  request: { query: CompleteMeetingWithSurveyDocument, variables: { input } },
  result: {
    data: {
      completeMeetingWithSurvey: {
        success: true,
        errors: [],
        __typename: 'CompleteMeetingWithSurveyPayload',
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
