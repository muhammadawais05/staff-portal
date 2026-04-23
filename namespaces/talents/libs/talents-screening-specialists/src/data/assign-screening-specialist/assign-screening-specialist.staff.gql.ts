import {
  gql,
  MutationHookOptions,
  useMutation
} from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  AssignScreeningSpecialistDocument,
  AssignScreeningSpecialistMutation,
  AssignScreeningSpecialistMutationVariables
} from './assign-screening-specialist.staff.gql.types'
import { SPECIALIST_ASSIGNMENT_FRAGMENT } from '../specialist-assignment-fragment.staff.gql'
import { TSS_TALENT_FRAGMENT } from '../tss-talent-fragment.staff.gql'

export const ASSIGN_SCREENING_SPECIALIST: typeof AssignScreeningSpecialistDocument = gql`
  mutation AssignScreeningSpecialist($input: AssignScreeningSpecialistInput!) {
    assignScreeningSpecialist(input: $input) {
      ...MutationResultFragment
      specialistAssignment {
        id
        talent {
          ...TssTalentFragment
          currentSpecialistAssignment {
            ...SpecialistAssignmentFragment
          }
        }
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${SPECIALIST_ASSIGNMENT_FRAGMENT}
  ${TSS_TALENT_FRAGMENT}
`

export const useAssignScreeningSpecialist = (
  options?: MutationHookOptions<
    AssignScreeningSpecialistMutation,
    AssignScreeningSpecialistMutationVariables
  >
) => {
  const [assignScreeningSpecialist, { loading }] = useMutation(
    ASSIGN_SCREENING_SPECIALIST,
    { ...options }
  )

  return {
    assignScreeningSpecialist: (talentId: string, assigneeId: string) =>
      assignScreeningSpecialist({
        variables: { input: { talentId, assigneeId } }
      }),
    loading
  }
}
