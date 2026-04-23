import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { TALENT_COACHING_ENGAGEMENT_FRAGMENT } from '../../../../../../data'
import { AssignCoachToTalentCoachingEngagementDocument } from './'

export const SET_COACHING_ASSIGNEE = gql`
  mutation AssignCoachToTalentCoachingEngagement(
    $input: AssignCoachToTalentCoachingEngagementInput!
  ) {
    assignCoachToTalentCoachingEngagement(input: $input) {
      ...MutationResultFragment
      talentCoachingEngagement {
        ...TalentCoachingEngagementFragment
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${TALENT_COACHING_ENGAGEMENT_FRAGMENT}
`

export const useAssignCoachMutation = ({
  onError
}: {
  onError: (error: Error) => void
}) => useMutation(AssignCoachToTalentCoachingEngagementDocument, { onError })
