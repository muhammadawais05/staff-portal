import { gql } from '@staff-portal/data-layer-service'

export const USER_BY_EMAIL_FRAGMENT = gql`
  fragment UserByEmailFragment on Role {
    id
    email
    fullName
    ... on WebResource {
      webResource {
        url
      }
    }
    __typename
  }
`
