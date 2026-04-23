import { gql } from '@staff-portal/data-layer-service'

import { CLIENT_ABOUT_FRAGMENT } from './client-about-fragment.staff.gql'

export const GET_CLIENT_ABOUT = gql`
  query GetClientAbout($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        ...ClientAboutFragment
      }
    }

    ${CLIENT_ABOUT_FRAGMENT}
  }
`

export const GET_CLIENT_ABOUT_AND_OPERATION = gql`
  query GetClientAboutAndOperation($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        ...ClientAboutFragment
        operations {
          patchClientProfile {
            callable
            messages
          }
        }
      }
    }

    ${CLIENT_ABOUT_FRAGMENT}
  }
`
