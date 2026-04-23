import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { OTHER_ROLE_FRAGMENT } from '@staff-portal/role-profile'

import {
  ApplyTalentToAnotherVerticalDocument,
  ApplyTalentToAnotherVerticalMutation
} from './apply-talent-to-another-vertical.staff.gql.types'

export const APPLY_TALENT_TO_ANOTHER_VERTICAL: typeof ApplyTalentToAnotherVerticalDocument = gql`
  mutation ApplyTalentToAnotherVertical(
    $input: ApplyTalentToAnotherVerticalInput!
  ) {
    applyTalentToAnotherVertical(input: $input) {
      ...MutationResultFragment
      talent {
        id
        associatedRoles(filter: {}) {
          nodes {
            ...OtherRoleFragment
          }
        }
      }
    }
  }

  ${OTHER_ROLE_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`

export const useApplyTalentToAnotherVertical = ({
  onError,
  onCompleted
}: {
  onError: (error: Error) => void
  onCompleted: (data: ApplyTalentToAnotherVerticalMutation) => void
}) =>
  useMutation(APPLY_TALENT_TO_ANOTHER_VERTICAL, {
    onError,
    onCompleted
  })
