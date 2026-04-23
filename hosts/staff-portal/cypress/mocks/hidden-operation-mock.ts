import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { OperationFragment } from '@staff-portal/operations'

import { WithTypename } from '~integration/types'

export const hiddenOperationMock = ({
  messages = []
}: { messages?: string[] } = {}): WithTypename<OperationFragment> => ({
  callable: OperationCallableTypes.HIDDEN,
  messages,
  __typename: 'Operation'
})
