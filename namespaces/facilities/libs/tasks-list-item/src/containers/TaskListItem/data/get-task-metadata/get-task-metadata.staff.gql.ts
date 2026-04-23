import { gql, useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'
import {
  FIRST_TASK_CARD_BATCH_KEY,
  TASK_METADATA_FRAGMENT
} from '@staff-portal/tasks'

import { GetTaskMetadataDocument } from './get-task-metadata.staff.gql.types'

export const GET_TASK_METADATA: typeof GetTaskMetadataDocument = gql`
  query GetTaskMetadata($taskId: ID!) {
    node(id: $taskId) {
      ... on Task {
        id
        ...TaskMetadataFragment
      }
    }
  }

  ${TASK_METADATA_FRAGMENT}
`

export const useGetTaskMetadata = ({
  taskId,
  skip
}: {
  taskId: string
  skip: boolean
}) => {
  const { data, ...rest } = useQuery(GET_TASK_METADATA, {
    variables: { taskId },
    skip,
    context: { [BATCH_KEY]: FIRST_TASK_CARD_BATCH_KEY }
  })

  return { data: data?.node || undefined, ...rest }
}
