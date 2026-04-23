import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  ResetRoleReferrerDocument,
  ResetRoleReferrerMutation
} from './reset-role-referrer.staff.gql.types'

export const RESET_ROLE_REFERRER: typeof ResetRoleReferrerDocument = gql`
  mutation ResetRoleReferrer($input: ResetRoleReferrerInput!) {
    resetRoleReferrer(input: $input) {
      __typename
      role {
        ... on Talent {
          id
          referrer {
            ... on Role {
              id
            }
            ... on WebResource {
              webResource {
                text
                url
              }
            }
          }
        }
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useResetRoleReferrer = ({
  onError,
  onCompleted
}: {
  onError: () => void
  onCompleted: (data: ResetRoleReferrerMutation) => void
}) =>
  useMutation(RESET_ROLE_REFERRER, {
    onError,
    onCompleted
  })
