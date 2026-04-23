import { gql, useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'
import { FIRST_TASK_CARD_BATCH_KEY } from '@staff-portal/tasks'

import { GetTalentTaskDocument } from './get-talent-task.staff.gql.types'
import { TASK_TALENT_FRAGMENT } from '../../../../data'

const GET_TALENT_TASK: typeof GetTalentTaskDocument = gql`
  query GetTalentTask($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        ...TaskTalentFragment
      }
    }
  }

  ${TASK_TALENT_FRAGMENT}
`

export const useGetTalent = (talentId: string) => {
  const { data, ...restOptions } = useQuery(GET_TALENT_TASK, {
    throwOnError: true,
    variables: { talentId },
    context: { [BATCH_KEY]: FIRST_TASK_CARD_BATCH_KEY }
  })

  return {
    data: data?.node,
    ...restOptions
  }
}
