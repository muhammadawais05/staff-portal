import { encodeEntityId } from '@staff-portal/data-layer-service'

import { OverlappingMeetingsFragment } from './overlapping-meetings-fragment.staff.gql.types'

export const createOverlappingMeetingsMock = (
  fields?: Partial<OverlappingMeetingsFragment>
) => ({
  id: encodeEntityId('1000', 'Test'),
  overlappingMeetings: {
    nodes: [],
    __typename: 'CallbackRequestOverlappingMeetingConnection'
  },
  __typename: 'CallbackRequest',
  ...fields
})
