import { gql } from '@staff-portal/data-layer-service'
import { ROLE_OR_CLIENT_FRAGMENT } from '@staff-portal/facilities'

export const CLIENT_LAST_LOGIN_FRAGMENT = gql`
  fragment ClientLastLoginFragment on Client {
    id
    representatives(order: { field: CURRENT_SIGN_IN_AT, direction: DESC }) {
      nodes {
        ...RoleOrClientFragment
        currentSignInAt
        currentSignInIp
        ipLocation: ipLocationV2 {
          cityName
          countryName
        }
      }
    }
  }

  ${ROLE_OR_CLIENT_FRAGMENT}
`
