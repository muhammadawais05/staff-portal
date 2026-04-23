import { enabledOperationMock } from '../../enabled-operation-mock'

export const getCreateTaskOperationResponse = () => ({
  data: {
    operations: {
      createTask: enabledOperationMock(),
      __typename: 'QueryOperations'
    }
  }
})
