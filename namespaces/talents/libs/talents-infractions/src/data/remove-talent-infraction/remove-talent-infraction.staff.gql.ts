import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { RemoveTalentInfractionDocument } from './remove-talent-infraction.staff.gql.types'

export const REMOVE_TALENT_INFRACTION: typeof RemoveTalentInfractionDocument = gql`
  mutation RemoveTalentInfraction($input: RemoveTalentInfractionInput!) {
    removeTalentInfraction(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useRemoveTalentInfraction = ({
  onError
}: {
  onError?: () => void
}) => useMutation(REMOVE_TALENT_INFRACTION, { onError })
