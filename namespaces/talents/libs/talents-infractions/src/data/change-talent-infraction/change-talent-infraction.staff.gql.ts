import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { ChangeTalentInfractionDocument } from './change-talent-infraction.staff.gql.types'
import { TALENT_INFRACTION_FRAGMENT } from '../talent-infraction-fragment'

export const CHANGE_TALENT_INFRACTION: typeof ChangeTalentInfractionDocument = gql`
  mutation ChangeTalentInfraction($input: ChangeTalentInfractionInput!) {
    changeTalentInfraction(input: $input) {
      ...MutationResultFragment
      talentInfraction {
        ...TalentInfractionFragment
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${TALENT_INFRACTION_FRAGMENT}
`

export const useChangeTalentInfraction = ({
  onError
}: {
  onCompleted?: () => void
  onError: (error: Error) => void
}) => useMutation(CHANGE_TALENT_INFRACTION, { onError })
