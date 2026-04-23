import { Meeting } from '@staff-portal/graphql/staff'

import { meetingsPageStubs } from '~integration/mocks/request-stubs'
import { successMutationMock } from '~integration/mocks/mutations'
import { meetingMock } from '~integration/mocks/fragments'
import {
  getMeetingAttendeeAutocompleteResponse,
  getMeetingAttendeesResponse
} from '~integration/mocks/responses/meetings'

const updateMeetingsListAttendeeStubs = (partialMeeting: Meeting) => {
  const meeting = meetingMock(partialMeeting)

  cy.stubGraphQLRequests({
    ...meetingsPageStubs({ meetings: [meeting] }),
    AssignMeetingAttendee: {
      data: {
        assignMeetingAttendee: {
          meeting,
          ...successMutationMock()
        }
      }
    },
    GetMeetingAttendeeAutocomplete: getMeetingAttendeeAutocompleteResponse(),
    GetMeetingAttendees: getMeetingAttendeesResponse()
  })
}

export default updateMeetingsListAttendeeStubs
