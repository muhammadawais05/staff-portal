import { gql } from '@apollo/client'

export const roleTypeFragment = gql`
  fragment RoleType on Role {
    roleType: type
  }
`
