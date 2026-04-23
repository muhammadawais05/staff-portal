import { CallbackRequestOperations } from '@staff-portal/graphql/staff'

import { WithTypename } from '~integration/types'
import { hiddenOperationMock } from '../hidden-operation-mock'

export const getCallRequestOperationsMock = (
  operations?: Partial<CallbackRequestOperations>
): WithTypename<CallbackRequestOperations> => ({
  __typename: 'CallbackRequestOperations',
  claimCallbackRequest: hiddenOperationMock(),
  claimCallbackRequestWithClient: hiddenOperationMock(),
  removeCallbackRequest: hiddenOperationMock(),
  ...operations
})
