import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Client } from '@staff-portal/graphql/staff'

import { meetingOperationsMock } from '~integration/mocks/fragments'

export const getClientScheduledMeetingsResponse = (
  client?: Partial<Client>
) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      type: 'Company',
      fullName: 'DuBuque, Cruickshank and Volkman',
      scheduleMeetingUrl: null,
      scheduledMeetings: {
        nodes: [
          {
            id: 'VjEtTWVldGluZy04MjE0MzE',
            subject: 'Obfuscated subject for meeting 821431',
            currentScheduler: null,
            attendeeName: 'Ahmed Smith',
            attendeeEmail: null,
            attendee: {
              id: 'VjEtQ2xpZW50LTMzNzkzOQ',
              __typename: 'Client',
              webResource: {
                url: 'https://staging.toptal.net/platform/staff/companies/1544845',
                text: 'DuBuque, Cruickshank and Volkman',
                __typename: 'Link'
              }
            },
            callbackRequest: null,
            masterBookingPage: null,
            scheduledAt: '2020-11-13T23:00:00+03:00',
            scheduledVia: 'UNKNOWN',
            durationMinutes: 30,
            status: 'FINISHED',
            outcome: null,
            comment: null,
            organizer: {
              id: 'VjEtU3RhZmYtMTQ3NDgyOQ',
              __typename: 'Staff',
              fullName: 'Malia Torphy',
              webResource: {
                url: 'https://staging.toptal.net/platform/staff/staff/1474829',
                text: 'Malia Torphy',
                __typename: 'Link'
              }
            },
            additionalInformation: null,
            conferenceLink: null,
            moderationUrl: null,
            relatedToRoleStep: null,
            operations: meetingOperationsMock(),
            __typename: 'Meeting'
          }
        ],
        __typename: 'ClientScheduledMeetingsConnection'
      },
      ...client,
      __typename: 'Client'
    }
  }
})
