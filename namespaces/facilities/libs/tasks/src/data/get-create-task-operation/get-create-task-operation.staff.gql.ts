import { gql, useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import { GetCreateTaskOperationDocument } from './get-create-task-operation.staff.gql.types'
import { TASK_LIST_GQL_BATCH_KEY } from '../../constants'

export const GET_CREATE_TASK_OPERATION: typeof GetCreateTaskOperationDocument = gql`
  query GetCreateTaskOperation {
    operations {
      createTask {
        ...OperationFragment
      }
    }
  }

  ${OPERATION_FRAGMENT}
`

export const useGetCreateTaskOperation = () => {
  const { data, ...restOptions } = useQuery(GET_CREATE_TASK_OPERATION, {
    context: { [BATCH_KEY]: TASK_LIST_GQL_BATCH_KEY },
    fetchPolicy: 'cache-first'
  })

  return { ...restOptions, data: data?.operations.createTask }
}
