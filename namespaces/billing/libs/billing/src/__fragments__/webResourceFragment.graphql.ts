import { gql } from '@apollo/client'

export const webResourceFragment = gql`
  fragment WebResourceFragment on Link {
    text
    url
  }
`
