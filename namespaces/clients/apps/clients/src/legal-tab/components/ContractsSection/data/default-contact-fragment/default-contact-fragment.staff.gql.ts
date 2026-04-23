import { gql } from '@staff-portal/data-layer-service'

export const DEFAULT_CONTACT_FRAGMENT = gql`
  fragment DefaultContactFragment on CompanyRepresentative {
    id
    fullName
    email
  }
`
