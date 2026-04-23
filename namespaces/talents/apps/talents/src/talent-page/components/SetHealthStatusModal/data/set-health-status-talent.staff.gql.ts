import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { GET_TALENT_HEALTH_STATUS_WITH_HISTORY } from '../../../../performance-tab/data'
import { GET_TALENT_STATUS_MESSAGES } from './get-talent-status-messages.staff.gql'
import { SetHealthStatusTalentDocument } from './set-health-status-talent.staff.gql.types'

export const SET_HEALTH_STATUS_TALENT: typeof SetHealthStatusTalentDocument = gql`
  mutation SetHealthStatusTalent($input: SetHealthStatusTalentInput!) {
    setHealthStatusTalent(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useSetHealthStatusTalent = ({
  talentId,
  onError,
  onCompleted
}: {
  talentId: string
  onError: (error: Error) => void
  onCompleted?: () => void
}) =>
  useMutation(SET_HEALTH_STATUS_TALENT, {
    onError,
    onCompleted,
    refetchQueries: [
      { query: GET_TALENT_HEALTH_STATUS_WITH_HISTORY, variables: { talentId } },
      { query: GET_TALENT_STATUS_MESSAGES, variables: { talentId } }
    ]
  })
