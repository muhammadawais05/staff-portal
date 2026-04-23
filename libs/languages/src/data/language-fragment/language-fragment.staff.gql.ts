import { gql } from '@staff-portal/data-layer-service'

export const LANGUAGE_FRAGMENT = gql`
  fragment LanguageFragment on Language {
    id
    name
  }
`
