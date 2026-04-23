import {
  Meeting,
  MeetingOperations,
  MeetingScheduledVia,
  MeetingStatus
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { meetingOperationsMock } from '~integration/mocks/fragments/meeting-operations-mock'
import { WithTypename } from '~integration/types'
import { talentNodeMock } from '~integration/mocks/fragments/talent-node-mock'
import { webResourceMock } from '~integration/mocks/fragments/web-resource-mock'
import { meetingSchedulerMock } from '~integration/mocks/fragments/meeting-scheduler-mock'

export const meetingMock = (
  meeting?: Partial<Omit<Meeting, 'operations'>> & {
    operations?: Partial<MeetingOperations>
  }
): WithTypename<Meeting> => ({
  id: encodeEntityId('123', 'Meeting'),
  subject: 'Subject',
  scheduledAt: '2022-01-01T00:00:00+03:00',
  scheduledVia: MeetingScheduledVia.UNKNOWN,
  finishedAt: '',
  durationMinutes: 30,
  status: MeetingStatus.SCHEDULED,
  organizer: talentNodeMock().node(),
  currentScheduler: meetingSchedulerMock(),
  attendee: talentNodeMock({ fullName: 'Foo Bar' }).node(),
  attendeeName: 'Foo Bar',
  attendeeEmail: null,
  callbackRequest: null,
  masterBookingPage: null,
  outcome: null,
  comment: null,
  additionalInformation: null,
  possibleSchedulersForBecomeOrganizer: {
    nodes: [meetingSchedulerMock()],
    totalCount: 1
  },
  possibleSchedulersForTransfer: {
    nodes: [meetingSchedulerMock()],
    totalCount: 1
  },
  topSchedulerMeeting: true,
  conferenceLink: null,
  moderationUrl: null,
  relatedToRoleStep: null,
  pendingJobs: null,
  ...webResourceMock({
    text: 'meeting'
  }),
  ...meeting,
  operations: meetingOperationsMock({
    ...meeting?.operations
  }),
  __typename: 'Meeting'
})
