import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { CLIENT_ABOUT_FRAGMENT } from './client-about-fragment.staff.gql'

export default gql`
  mutation SetClientAbout($input: PatchClientProfileInput!) {
    patchClientProfile(input: $input) {
      client {
        ...ClientAboutFragment
      }
      ...MutationResultFragment
    }
  }

  ${CLIENT_ABOUT_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`
