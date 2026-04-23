import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export const INVITE_TO_LOGIN_COMPANY_REPRESENTATIVE_FRAGMENT = gql`
  fragment InviteToLoginCompanyRepresentativeFragment on CompanyRepresentative {
    id
    fullName
    invitedToLoginAt
    client {
      id
      portalPermissionsEnabled
    }
    operations {
      inviteToLoginCompanyRepresentative {
        ...OperationFragment
      }
    }
  }

  ${OPERATION_FRAGMENT}
`
