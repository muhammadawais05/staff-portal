import { Meeting } from '@staff-portal/graphql/staff'

import { meetingsPageStubs } from '~integration/mocks/request-stubs'
import { getRemoveMeetingOperationResponse } from '~integration/mocks/responses/meetings'
import { successMutationMock } from '~integration/mocks/mutations'
import { meetingMock } from '~integration/mocks/fragments'

const updateMeetingsListDeleteMeetingStubs = (meetings: Meeting[]) =>
  cy.stubGraphQLRequests({
    ...meetingsPageStubs({
      meetings
    }),
    GetLazyOperation: getRemoveMeetingOperationResponse(),
    RemoveMeeting: {
      data: {
        removeMeeting: {
          meeting: meetingMock(),
          ...successMutationMock()
        }
      }
    }
  })

export default updateMeetingsListDeleteMeetingStubs
