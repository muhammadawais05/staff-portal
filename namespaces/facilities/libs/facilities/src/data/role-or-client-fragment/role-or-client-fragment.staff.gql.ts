import { gql } from '@staff-portal/data-layer-service'

import { WEB_RESOURCE_FRAGMENT } from '../web-resource-fragment/web-resource-fragment.staff.gql'

export const ROLE_OR_CLIENT_FRAGMENT = gql`
  fragment RoleOrClientFragment on RoleOrClient {
    ... on Node {
      id
      ...WebResourceFragment
    }
    ... on Role {
      id
      fullName
    }
    ... on Client {
      id
      fullName
    }
  }

  ${WEB_RESOURCE_FRAGMENT}
`
