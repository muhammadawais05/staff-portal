import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { CLIENT_SOCIAL_MEDIA_FRAGMENT } from './client-social-media-fragment.staff.gql'

export default gql`
  mutation SetPatchClientSocialMediaProfile($input: PatchClientProfileInput!) {
    patchClientProfile(input: $input) {
      client {
        ...ClientSocialMediaFragment
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${CLIENT_SOCIAL_MEDIA_FRAGMENT}
`
