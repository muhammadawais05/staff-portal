import { gql } from '@apollo/client'

export const userErrorFragment = gql`
  fragment UserErrorFragment on UserError {
    code
    key
    message
  }
`
