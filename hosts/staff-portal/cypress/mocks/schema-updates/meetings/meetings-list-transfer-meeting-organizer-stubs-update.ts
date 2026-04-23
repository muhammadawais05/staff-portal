import { Meeting } from '@staff-portal/graphql/staff'

import { meetingsPageStubs } from '~integration/mocks/request-stubs'
import { getTransferMeetingOrganizerOperationResponse } from '~integration/mocks/responses/meetings'
import { successMutationMock } from '~integration/mocks/mutations'
import {
  masterBookingPageConfigurationMock,
  meetingMock,
  meetingSchedulerMock,
  talentNodeMock
} from '~integration/mocks/fragments'

const updateMeetingsListTransferMeetingOrganizerStubs = (
  partialMeeting: Meeting
) => {
  const meeting = meetingMock({
    ...partialMeeting,
    currentScheduler: meetingSchedulerMock({
      role: talentNodeMock({ fullName: 'New Scheduler Name' }).node()
    }),
    masterBookingPage: masterBookingPageConfigurationMock()
  })

  cy.stubGraphQLRequests({
    ...meetingsPageStubs({
      meetings: [meeting]
    }),
    GetLazyOperation: getTransferMeetingOrganizerOperationResponse(),
    TransferMeeting: {
      data: {
        transferMeeting: {
          meeting,
          ...successMutationMock()
        }
      }
    },
    GetPossibleSchedulers: {
      data: {
        node: meeting
      }
    },
    GetSchedulerAvailability: {
      data: {
        node: meetingSchedulerMock()
      }
    }
  })
}

export default updateMeetingsListTransferMeetingOrganizerStubs
