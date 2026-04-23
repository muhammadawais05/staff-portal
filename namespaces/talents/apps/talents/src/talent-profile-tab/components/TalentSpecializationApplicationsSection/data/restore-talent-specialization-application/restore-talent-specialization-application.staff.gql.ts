import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  RestoreTalentSpecializationApplicationDocument,
  RestoreTalentSpecializationApplicationMutation
} from './restore-talent-specialization-application.staff.gql.types'
import { GET_TALENT_SPECIALIZATION_APPLICATIONS } from '../get-talent-specialization-applications'

export const RESTORE_TALENT_SPECIALIZATION_APPLICATION: typeof RestoreTalentSpecializationApplicationDocument = gql`
  mutation RestoreTalentSpecializationApplication(
    $input: RestoreSpecializationApplicationInput!
  ) {
    restoreSpecializationApplication(input: $input) {
      specializationApplication {
        id
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useRestoreTalentSpecializationApplication = ({
  talentId,
  onError,
  onCompleted
}: {
  talentId: string
  onError: () => void
  onCompleted: (data: RestoreTalentSpecializationApplicationMutation) => void
}) =>
  useMutation(RESTORE_TALENT_SPECIALIZATION_APPLICATION, {
    onError,
    onCompleted,
    refetchQueries: [
      {
        query: GET_TALENT_SPECIALIZATION_APPLICATIONS,
        variables: { talentId }
      }
    ]
  })
