import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { INTERNAL_TEAM_FRAGMENT } from './get-internal-team-data.staff.gql'

export default gql`
  mutation SetPatchClientInternalTeam($input: PatchClientProfileInput!) {
    patchClientProfile(input: $input) {
      client {
        ...InternalTeamFragment
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${INTERNAL_TEAM_FRAGMENT}
`
