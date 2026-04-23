import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { SYSTEM_INFORMATION_FRAGMENT } from './system-information-fragment.staff.gql'

export default gql`
  mutation SetPatchClientSystemInformationProfile(
    $input: PatchClientProfileInput!
  ) {
    patchClientProfile(input: $input) {
      client {
        ...SystemInformationFragment
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${SYSTEM_INFORMATION_FRAGMENT}
`
