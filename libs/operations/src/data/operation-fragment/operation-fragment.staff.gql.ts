import { gql } from '@staff-portal/data-layer-service'

export const OPERATION_FRAGMENT = gql`
  fragment OperationFragment on Operation {
    callable
    messages
  }
`
