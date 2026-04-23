import { Meeting } from '@staff-portal/graphql/staff'

import { meetingsPageStubs } from '~integration/mocks/request-stubs'
import { getBecomeMeetingOrganizerOperationResponse } from '~integration/mocks/responses/meetings'
import { successMutationMock } from '~integration/mocks/mutations'
import {
  meetingMock,
  meetingSchedulerMock,
  talentNodeMock
} from '~integration/mocks/fragments'

const updateMeetingsListBecomeMeetingOrganizerStubs = (meeting: Meeting) =>
  cy.stubGraphQLRequests({
    ...meetingsPageStubs({
      meetings: [meeting]
    }),
    GetLazyOperation: getBecomeMeetingOrganizerOperationResponse(),
    BecomeMeetingOrganizer: {
      data: {
        becomeMeetingOrganizer: {
          meeting: meetingMock({
            currentScheduler: meetingSchedulerMock({
              role: talentNodeMock({ fullName: 'New Scheduler Name' }).node()
            })
          }),
          ...successMutationMock()
        }
      }
    },
    GetPossibleSchedulersForBecomeOrganizer: {
      data: {
        node: meetingMock()
      }
    },
    GetSchedulerAvailability: {
      data: {
        node: meetingSchedulerMock()
      }
    }
  })

export default updateMeetingsListBecomeMeetingOrganizerStubs
