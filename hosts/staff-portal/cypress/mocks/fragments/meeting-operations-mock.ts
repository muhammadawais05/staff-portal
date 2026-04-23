import { MeetingOperations } from '@staff-portal/graphql/staff'

import { WithTypename } from '~integration/types'
import { hiddenOperationMock } from '../hidden-operation-mock'

export const meetingOperationsMock = (
  operations?: Partial<MeetingOperations>
): WithTypename<MeetingOperations> => ({
  __typename: 'MeetingOperations',
  cancelMeeting: hiddenOperationMock(),
  completeMeeting: hiddenOperationMock(),
  completeMeetingWithSurvey: hiddenOperationMock(),
  failMeeting: hiddenOperationMock(),
  transferMeeting: hiddenOperationMock(),
  becomeMeetingOrganizer: hiddenOperationMock(),
  assignMeetingAttendee: hiddenOperationMock(),
  removeMeeting: hiddenOperationMock(),
  ...operations
})
