import { SpecialistAssignmentArchivingReasons } from '@staff-portal/graphql/staff'
import {
  gql,
  MutationHookOptions,
  useMutation
} from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  ArchiveSpecialistAssignmentsDocument,
  ArchiveSpecialistAssignmentsMutation,
  ArchiveSpecialistAssignmentsMutationVariables
} from './archive-specialist-assignments.staff.gql.types'
import { SPECIALIST_ASSIGNMENT_FRAGMENT } from '../../../../data/specialist-assignment-fragment.staff.gql'
import { TSS_TALENT_FRAGMENT } from '../../../../data/tss-talent-fragment.staff.gql'

export const ARCHIVE_SPECIALIST_ASSIGNMENTS: typeof ArchiveSpecialistAssignmentsDocument = gql`
  mutation ArchiveSpecialistAssignments(
    $input: ArchiveSpecialistAssignmentsInput!
  ) {
    archiveSpecialistAssignments(input: $input) {
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

export const useArchiveSpecialistAssignments = (
  options?: MutationHookOptions<
    ArchiveSpecialistAssignmentsMutation,
    ArchiveSpecialistAssignmentsMutationVariables
  >
) => {
  const [archiveSpecialistAssignments, { loading }] = useMutation(
    ARCHIVE_SPECIALIST_ASSIGNMENTS,
    { ...options }
  )

  return {
    archiveSpecialistAssignments: (
      specialistAssignmentIds: string[],
      reason: SpecialistAssignmentArchivingReasons,
      comment?: string
    ) =>
      archiveSpecialistAssignments({
        variables: { input: { specialistAssignmentIds, comment, reason } }
      }),
    loading
  }
}
