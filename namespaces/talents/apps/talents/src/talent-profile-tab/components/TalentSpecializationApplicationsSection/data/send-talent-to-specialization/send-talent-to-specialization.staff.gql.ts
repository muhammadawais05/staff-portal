import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  SendTalentToSpecializationDocument,
  SendTalentToSpecializationMutation
} from './send-talent-to-specialization.staff.gql.types'
import { GET_TALENT_SPECIALIZATION_APPLICATIONS } from '../get-talent-specialization-applications'

export const SEND_TALENT_TO_SPECIALIZATION: typeof SendTalentToSpecializationDocument = gql`
  mutation SendTalentToSpecialization(
    $input: SendTalentToSpecializationInput!
  ) {
    sendTalentToSpecialization(input: $input) {
      talent {
        id
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useSendTalentToSpecialization = ({
  talentId,
  onError,
  onCompleted
}: {
  talentId: string
  onError: () => void
  onCompleted: (data: SendTalentToSpecializationMutation) => void
}) =>
  useMutation(SEND_TALENT_TO_SPECIALIZATION, {
    onError,
    onCompleted,
    refetchQueries: [
      {
        query: GET_TALENT_SPECIALIZATION_APPLICATIONS,
        variables: { talentId }
      }
    ]
  })
