import { Meeting, MeetingStatus } from '@staff-portal/graphql/staff'

import { meetingsPageStubs } from '~integration/mocks/request-stubs'
import { getFailMeetingOperationResponse } from '~integration/mocks/responses/meetings'
import { successMutationMock } from '~integration/mocks/mutations'
import { meetingMock } from '~integration/mocks/fragments'

const updateMeetingsListMarkMeetingAsNotCompletedStubs = (
  meetings: Meeting[]
) =>
  cy.stubGraphQLRequests({
    ...meetingsPageStubs({
      meetings
    }),
    GetLazyOperation: getFailMeetingOperationResponse(),
    FailMeeting: {
      data: {
        failMeeting: {
          meeting: meetingMock({
            status: MeetingStatus.FAILED
          }),
          ...successMutationMock()
        }
      }
    }
  })

export default updateMeetingsListMarkMeetingAsNotCompletedStubs
