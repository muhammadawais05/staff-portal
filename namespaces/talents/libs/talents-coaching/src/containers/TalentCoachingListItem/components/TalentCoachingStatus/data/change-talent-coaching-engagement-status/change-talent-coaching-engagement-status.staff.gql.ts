import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { TALENT_COACHING_ENGAGEMENT_FRAGMENT } from '../../../../../../data'
import { ChangeTalentCoachingEngagementStatusDocument } from './'

export const CHANGE_COACHING_STATUS = gql`
  mutation ChangeTalentCoachingEngagementStatus(
    $input: ChangeTalentCoachingEngagementStatusInput!
  ) {
    changeTalentCoachingEngagementStatus(input: $input) {
      ...MutationResultFragment
      talentCoachingEngagement {
        ...TalentCoachingEngagementFragment
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${TALENT_COACHING_ENGAGEMENT_FRAGMENT}
`

export const useChangeCoachingStatusMutation = ({
  onError
}: {
  onError: (error: Error) => void
}) => useMutation(ChangeTalentCoachingEngagementStatusDocument, { onError })
