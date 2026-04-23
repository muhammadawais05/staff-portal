import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { GetClaimCallRequestFragment } from './get-claim-call-request.staff.gql.types'

export const createGetClaimCallRequestMock = (
  fields?: Partial<GetClaimCallRequestFragment>
) => ({
  id: encodeEntityId('1000', 'Test'),
  name: 'Test Name',
  type: 'scheduled',
  createdAt: '2018-11-03T06:10:28.160+03:00',
  requestedStartTime: '2018-11-04T17:30:00.000+03:00',
  inWorkingHours: true,
  overlappingMeetings: {
    __typename: 'CallbackRequestOverlappingMeetingConnection',
    nodes: []
  },
  operations: {
    claimCallbackRequestWithClient: {
      callable: OperationCallableTypes.HIDDEN,
      messages: [],
      __typename: 'Operation'
    },
    __typename: 'CallbackRequestOperations'
  },
  __typename: 'CallbackRequest',
  ...fields
})
