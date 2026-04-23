import { MeetingScheduler } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { WithTypename } from '~integration/types'
import { talentNodeMock } from '~integration/mocks/fragments/talent-node-mock'

export const meetingSchedulerMock = (
  meetingScheduler?: Partial<MeetingScheduler>
): WithTypename<MeetingScheduler> => ({
  id: encodeEntityId('123', 'MeetingScheduler'),
  code: 'code',
  role: talentNodeMock({
    availableForMeeting: true
  }).node(),
  webResource: {
    text: ''
  },
  ...meetingScheduler,
  __typename: 'MeetingScheduler'
})
