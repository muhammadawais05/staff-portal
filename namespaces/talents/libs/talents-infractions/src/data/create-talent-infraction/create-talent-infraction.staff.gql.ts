import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { CreateTalentInfractionDocument } from './create-talent-infraction.staff.gql.types'

export const CREATE_TALENT_INFRACTION: typeof CreateTalentInfractionDocument = gql`
  mutation CreateTalentInfraction($input: CreateTalentInfractionInput!) {
    createTalentInfraction(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCreateTalentInfraction = ({
  onError
}: {
  onError: (error: Error) => void
}) => useMutation(CREATE_TALENT_INFRACTION, { onError })
