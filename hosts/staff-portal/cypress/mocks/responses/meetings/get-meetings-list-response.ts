import { Meeting } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getMeetingsListResponse = (meetings: Meeting[] = []) => ({
  data: {
    viewer: {
      me: {
        id: encodeEntityId('123', 'Staff'),
        __typename: 'Staff'
      },
      meetings: {
        nodes: meetings,
        totalCount: meetings.length,
        __typename: 'MeetingConnection'
      },
      __typename: 'Viewer'
    }
  }
})
