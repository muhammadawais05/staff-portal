import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  ChangeRoleReferrerDocument,
  ChangeRoleReferrerMutation
} from './change-role-referrer.staff.gql.types'

export const CHANGE_ROLE_REFERRER: typeof ChangeRoleReferrerDocument = gql`
  mutation ChangeRoleReferrer($input: ChangeRoleReferrerInput!) {
    changeRoleReferrer(input: $input) {
      __typename
      role {
        ... on Talent {
          id
          referrer {
            ... on Node {
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

export const useChangeRoleReferrer = ({
  onError,
  onCompleted
}: {
  onError: () => void
  onCompleted: (data: ChangeRoleReferrerMutation) => void
}) =>
  useMutation(CHANGE_ROLE_REFERRER, {
    onError,
    onCompleted
  })
