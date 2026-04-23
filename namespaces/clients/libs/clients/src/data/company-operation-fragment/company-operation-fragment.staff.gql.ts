import { gql } from '@staff-portal/data-layer-service'

export const COMPANY_OPERATION_FRAGMENT = gql`
  fragment CompanyOperationFragment on Operation {
    callable
    messages
  }
`
