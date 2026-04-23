import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  AddTalentToRemoteConsultingDocument,
  AddTalentToRemoteConsultingMutation
} from './add-talent-to-remote-consulting.staff.gql.types'
import { GET_TALENT_SPECIALIZATION_APPLICATIONS } from '../get-talent-specialization-applications'

export const ADD_TALENT_TO_REMOTE_CONSULTING: typeof AddTalentToRemoteConsultingDocument = gql`
  mutation AddTalentToRemoteConsulting(
    $input: AddTalentToRemoteConsultingInput!
  ) {
    addTalentToRemoteConsulting(input: $input) {
      talent {
        id
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useAddTalentToRemoteConsulting = ({
  talentId,
  onError,
  onCompleted
}: {
  talentId: string
  onError: () => void
  onCompleted: (data: AddTalentToRemoteConsultingMutation) => void
}) =>
  useMutation(ADD_TALENT_TO_REMOTE_CONSULTING, {
    onError,
    onCompleted,
    refetchQueries: [
      {
        query: GET_TALENT_SPECIALIZATION_APPLICATIONS,
        variables: { talentId }
      }
    ]
  })
