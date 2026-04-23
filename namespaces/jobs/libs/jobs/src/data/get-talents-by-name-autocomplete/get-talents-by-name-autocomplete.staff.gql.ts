import { gql } from '@staff-portal/data-layer-service'

export const TALENT_EDGE_AUTOCOMPLETE_FRAGMENT = gql`
  fragment TalentEdgeAutocompleteFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    nodeTypes
    node {
      ...TalentVerticalAutocompleteFragment
    }
  }
`

export const TALENT_VERTICAL_AUTOCOMPLETE_FRAGMENT = gql`
  fragment TalentVerticalAutocompleteFragment on Node {
    id
    ... on Talent {
      id
      vertical {
        id
        name
      }
    }
  }
`

export default gql`
  query GetTalentsByNameAutocomplete(
    $jobId: ID!
    $term: String!
    $offset: Int!
    $limit: Int!
    $specialization: ID
  ) {
    node(id: $jobId) {
      ... on Job {
        id
        talentsAutocomplete(
          filter: { term: $term, specialization: $specialization }
          pagination: { offset: $offset, limit: $limit }
        ) {
          edges {
            ...TalentEdgeAutocompleteFragment
          }
        }
      }
    }
  }
  ${TALENT_EDGE_AUTOCOMPLETE_FRAGMENT}
  ${TALENT_VERTICAL_AUTOCOMPLETE_FRAGMENT}
`
