import {
  gql,
  MutationHookOptions,
  useMutation
} from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import {
  SPECIALIST_ASSIGNMENT_FRAGMENT,
  TSS_TALENT_FRAGMENT
} from '@staff-portal/talents-screening-specialists'

import {
  AssignScreeningSpecialistsDocument,
  AssignScreeningSpecialistsMutation,
  AssignScreeningSpecialistsMutationVariables
} from './assign-screening-specialists.staff.gql.types'

export const ASSIGN_SCREENING_SPECIALISTS: typeof AssignScreeningSpecialistsDocument = gql`
  mutation AssignScreeningSpecialists(
    $input: AssignScreeningSpecialistsInput!
  ) {
    assignScreeningSpecialists(input: $input) {
      ...MutationResultFragment
      specialistAssignments {
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

export const useAssignScreeningSpecialists = (
  options?: MutationHookOptions<
    AssignScreeningSpecialistsMutation,
    AssignScreeningSpecialistsMutationVariables
  >
) => {
  const [assignScreeningSpecialists, { loading }] = useMutation(
    ASSIGN_SCREENING_SPECIALISTS,
    { ...options }
  )

  return {
    assignScreeningSpecialists: (talentIds: string[], assigneeId: string) =>
      assignScreeningSpecialists({
        variables: { input: { talentIds, assigneeId } }
      }),
    loading
  }
}
