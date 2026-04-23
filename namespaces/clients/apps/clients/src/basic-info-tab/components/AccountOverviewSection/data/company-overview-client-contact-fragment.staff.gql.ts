import { gql } from '@staff-portal/data-layer-service'

export const COMPANY_OVERVIEW_CLIENT_CONTACT_FRAGMENT = gql`
  fragment CompanyOverviewClientContactFragment on Contact {
    id
    type
    value
    note
    primary
    phoneCategory
  }
`
