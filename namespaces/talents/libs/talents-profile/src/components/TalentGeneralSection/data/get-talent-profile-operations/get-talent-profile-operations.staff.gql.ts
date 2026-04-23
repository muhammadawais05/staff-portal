import { gql, useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'
import { TALENT_OPERATIONS_FRAGMENT } from '@staff-portal/talents'

import { GetTalentProfileOperationsDocument } from './get-talent-profile-operations.staff.gql.types'

export const GET_TALENT_PROFILE_OPERATIONS: typeof GetTalentProfileOperationsDocument = gql`
  query GetTalentProfileOperations($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        ...TalentOperationsFragment
      }
    }
  }

  ${TALENT_OPERATIONS_FRAGMENT}
`

export const useGetTalentProfileOperations = ({
  talentId,
  batchKey,
  onError
}: {
  talentId: string
  batchKey?: string
  onError?: (error: Error) => void
}) => {
  const { data, ...restOptions } = useQuery(GET_TALENT_PROFILE_OPERATIONS, {
    throwOnError: true,
    variables: { talentId },
    onError,
    context: { [BATCH_KEY]: batchKey }
  })

  return { ...restOptions, operations: data?.node?.operations }
}
