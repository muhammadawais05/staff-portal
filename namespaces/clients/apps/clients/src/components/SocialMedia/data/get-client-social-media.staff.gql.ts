import { gql } from '@staff-portal/data-layer-service'

import { CLIENT_SOCIAL_MEDIA_FRAGMENT } from './client-social-media-fragment.staff.gql'

export default gql`
  query GetClientSocialMedia($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        ...ClientSocialMediaFragment
      }
    }
  }

  ${CLIENT_SOCIAL_MEDIA_FRAGMENT}
`
