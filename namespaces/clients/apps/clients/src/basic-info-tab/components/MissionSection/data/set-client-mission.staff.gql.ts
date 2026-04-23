import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { CLIENT_MISSION_FRAGMENT } from './client-mission-fragment.staff.gql'

export default gql`
  mutation SetClientMission($input: PatchClientProfileInput!) {
    patchClientProfile(input: $input) {
      client {
        ...ClientMissionFragment
      }
      ...MutationResultFragment
    }
  }

  ${CLIENT_MISSION_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`
