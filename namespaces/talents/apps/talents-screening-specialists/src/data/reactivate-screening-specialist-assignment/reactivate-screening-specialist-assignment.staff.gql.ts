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
  ReactivateScreeningSpecialistAssignmentDocument,
  ReactivateScreeningSpecialistAssignmentMutation,
  ReactivateScreeningSpecialistAssignmentMutationVariables
} from './reactivate-screening-specialist-assignment.staff.gql.types'

export const REACTIVATE_SPECIALIST_ASSIGNMENT: typeof ReactivateScreeningSpecialistAssignmentDocument = gql`
  mutation ReactivateScreeningSpecialistAssignment(
    $input: ReactivateScreeningSpecialistAssignmentInput!
  ) {
    reactivateScreeningSpecialistAssignment(input: $input) {
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

export const useReactivateScreeningSpecialistAssignment = (
  options?: MutationHookOptions<
    ReactivateScreeningSpecialistAssignmentMutation,
    ReactivateScreeningSpecialistAssignmentMutationVariables
  >
) => {
  const [reactivateScreeningSpecialistAssignment, { loading }] = useMutation(
    REACTIVATE_SPECIALIST_ASSIGNMENT,
    { ...options }
  )

  return {
    reactivateScreeningSpecialistAssignment: (
      archivedSpecialistAssignmentId: string
    ) =>
      reactivateScreeningSpecialistAssignment({
        variables: { input: { archivedSpecialistAssignmentId } }
      }),
    loading
  }
}
