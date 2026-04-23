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
  UnassignScreeningSpecialistsDocument,
  UnassignScreeningSpecialistsMutation,
  UnassignScreeningSpecialistsMutationVariables
} from './unassign-screening-specialists.staff.gql.types'

export const UNASSIGN_SCREENING_SPECIALISTS: typeof UnassignScreeningSpecialistsDocument = gql`
  mutation UnassignScreeningSpecialists(
    $input: UnassignScreeningSpecialistsInput!
  ) {
    unassignScreeningSpecialists(input: $input) {
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

export const useUnassignScreeningSpecialists = (
  options?: MutationHookOptions<
    UnassignScreeningSpecialistsMutation,
    UnassignScreeningSpecialistsMutationVariables
  >
) => {
  const [unassignScreeningSpecialists, { loading }] = useMutation(
    UNASSIGN_SCREENING_SPECIALISTS,
    { ...options }
  )

  return {
    unassignScreeningSpecialists: (specialistAssignmentIds: string[]) =>
      unassignScreeningSpecialists({
        variables: { input: { specialistAssignmentIds } }
      }),
    loading
  }
}
