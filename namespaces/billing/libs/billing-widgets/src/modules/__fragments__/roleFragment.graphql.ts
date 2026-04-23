import { gql } from '@apollo/client'

export const roleItemFragment = gql`
  fragment RoleItem on Role {
    fullName
    id
    email
  }
`
