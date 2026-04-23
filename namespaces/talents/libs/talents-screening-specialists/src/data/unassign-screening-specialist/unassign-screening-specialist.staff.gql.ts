import {
  gql,
  MutationHookOptions,
  useMutation
} from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { SPECIALIST_ASSIGNMENT_FRAGMENT } from '../specialist-assignment-fragment.staff.gql'
import { TSS_TALENT_FRAGMENT } from '../tss-talent-fragment.staff.gql'
import {
  UnassignScreeningSpecialistDocument,
  UnassignScreeningSpecialistMutation,
  UnassignScreeningSpecialistMutationVariables
} from './unassign-screening-specialist.staff.gql.types'

export const UNASSIGN_SCREENING_SPECIALIST: typeof UnassignScreeningSpecialistDocument = gql`
  mutation UnassignScreeningSpecialist(
    $input: UnassignScreeningSpecialistInput!
  ) {
    unassignScreeningSpecialist(input: $input) {
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

export const useUnassignScreeningSpecialist = (
  options?: Pick<
    MutationHookOptions<
      UnassignScreeningSpecialistMutation,
      UnassignScreeningSpecialistMutationVariables
    >,
    'onCompleted' | 'onError'
  >
) => {
  const [unassignScreeningSpecialist, { loading }] = useMutation(
    UNASSIGN_SCREENING_SPECIALIST,
    { ...options }
  )

  return {
    unassignScreeningSpecialist: (specialistAssignmentId: string) =>
      unassignScreeningSpecialist({
        variables: { input: { specialistAssignmentId } }
      }),
    loading
  }
}
