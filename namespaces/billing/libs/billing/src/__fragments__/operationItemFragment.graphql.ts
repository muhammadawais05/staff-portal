import { gql } from '@apollo/client'

export const operationItemFragment = gql`
  fragment OperationItem on Operation {
    callable
    messages
  }
`
