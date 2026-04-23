import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  ConvertSpecializationApplicationDocument,
  ConvertSpecializationApplicationMutation
} from './convert-specialization-application.staff.gql.types'
import { GET_TALENT_SPECIALIZATION_APPLICATIONS } from '../get-talent-specialization-applications'

export const CONVERT_SPECIALIZATION_APPLICATION: typeof ConvertSpecializationApplicationDocument = gql`
  mutation ConvertSpecializationApplication(
    $input: ConvertSpecializationApplicationInput!
  ) {
    convertSpecializationApplication(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useConvertSpecializationApplication = ({
  talentId,
  onError,
  onCompleted
}: {
  talentId: string
  onError: () => void
  onCompleted: (data: ConvertSpecializationApplicationMutation) => void
}) =>
  useMutation(CONVERT_SPECIALIZATION_APPLICATION, {
    onError,
    onCompleted,
    refetchQueries: [
      {
        query: GET_TALENT_SPECIALIZATION_APPLICATIONS,
        variables: { talentId }
      }
    ]
  })
