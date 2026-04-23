import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  ToggleCheckSkillNameDocument,
  ToggleCheckSkillNameMutation
} from './toggle-check-skill-name.staff.gql.types'
import { SkillNameCheckType } from '../../../index'

export default gql`
  mutation ToggleCheckSkillName(
    $skillNameId: ID!
    $checkType: String!
    $isEditor: Boolean!
  ) {
    toggleCheckSkillName(
      input: { skillNameId: $skillNameId, checkType: $checkType }
    ) {
      ...MutationResultFragment
      skillName {
        id
        editorChecked @include(if: $isEditor)
        verticalChecked @skip(if: $isEditor)
      }
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

export const useToggleCheckSkillName = ({
  skillNameId,
  onCompleted,
  onError
}: {
  skillNameId: string
  onCompleted?: (data: ToggleCheckSkillNameMutation) => void
  onError?: (error: Error) => void
}) => {
  const [toggleCheckSkillName, mutationResult] = useMutation(
    ToggleCheckSkillNameDocument,
    {
      onCompleted,
      onError
    }
  )

  return {
    ...mutationResult,
    toggleCheckSkillName: (checkType: SkillNameCheckType) =>
      toggleCheckSkillName({
        variables: {
          skillNameId,
          checkType,
          isEditor: checkType === 'editor'
        }
      })
  }
}
