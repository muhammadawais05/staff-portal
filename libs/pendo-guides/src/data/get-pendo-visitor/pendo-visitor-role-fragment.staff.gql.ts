import { gql } from '@staff-portal/data-layer-service'

export const PENDO_VISITOR_ROLE_FRAGMENT = gql`
  fragment PendoVisitorRoleFragment on Role {
    fullName
    id
    roleTitle
    email
  }
`
