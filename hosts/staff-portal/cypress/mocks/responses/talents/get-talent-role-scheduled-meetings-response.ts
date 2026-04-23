import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentRoleScheduledMeetingsResponse = (
  talent?: Partial<Talent>
) => ({
  data: {
    staffNode: {
      id: encodeEntityId('123', 'Talent'),
      type: 'Developer',
      roleTitle: 'Developer',
      fullName: 'Euna Conroy',
      scheduleMeetingUrl: null,
      scheduledMeetings: {
        nodes: [],
        __typename: 'ScheduledMeetingsConnection'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
