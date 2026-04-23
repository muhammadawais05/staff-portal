import { Talent } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'

export const getCreateTalentTaskOperationResponse = (
  talent?: Partial<Talent>
) => ({
  data: {
    operations: {
      createTask: enabledOperationMock(),
      __typename: 'QueryOperations'
    },
    ...talent
  }
})
