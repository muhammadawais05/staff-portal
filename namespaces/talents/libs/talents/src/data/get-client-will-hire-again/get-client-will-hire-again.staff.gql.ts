import { gql, useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'

import { GetClientWillHireAgainDocument } from './get-client-will-hire-again.staff.gql.types'
import { CLIENT_WILL_HIRE_AGAIN_FRAGMENT } from '../client-will-hire-again-fragment'

export const GET_CLIENT_WILL_HIRE_AGAIN: typeof GetClientWillHireAgainDocument = gql`
  query GetClientWillHireAgain($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        ...ClientWillHireAgainFragment
      }
    }
  }

  ${CLIENT_WILL_HIRE_AGAIN_FRAGMENT}
`

export const useGetClientWillHireTalentAgain = ({
  talentId,
  batchKey,
  onError
}: {
  talentId: string
  batchKey?: string
  onError: () => void
}) =>
  useQuery(GET_CLIENT_WILL_HIRE_AGAIN, {
    onError,
    variables: { talentId },
    context: { [BATCH_KEY]: batchKey }
  })
