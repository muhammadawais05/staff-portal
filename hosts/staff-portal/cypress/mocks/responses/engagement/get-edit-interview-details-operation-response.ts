import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '../../enabled-operation-mock'

export const getEditInterviewDetailsOperationResponse = () => ({
  data: {
    node: {
      __typename: 'Interview',
      id: encodeEntityId('123', 'Engagement'),
      operations: {
        updateInterviewGoogleCalendarEvent: enabledOperationMock(),
        __typename: 'InterviewtOperations'
      }
    }
  }
})
