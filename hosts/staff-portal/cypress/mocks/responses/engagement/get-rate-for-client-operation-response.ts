import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '../../enabled-operation-mock'

export const getRateForClientOperationResponse = () => ({
  data: {
    node: {
      __typename: 'Interview',
      id: encodeEntityId('12345', 'Interview'),
      operations: {
        rateForClientInterview: enabledOperationMock(),
        __typename: 'InterviewOperations'
      }
    }
  }
})
