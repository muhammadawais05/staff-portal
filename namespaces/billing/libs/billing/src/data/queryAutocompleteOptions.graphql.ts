import { gql } from '@apollo/client'

export default gql`
  query QueryAutocomplete(
    $term: String!
    $ids: [ID!]
    $model: AutocompleteModels!
    $excludedIds: [ID!]
    $offset: Int!
    $limit: Int!
  ) {
    autocomplete(
      filter: {
        term: $term
        ids: $ids
        model: $model
        excludedIds: $excludedIds
      }
      pagination: { offset: $offset, limit: $limit }
    ) {
      edges {
        ...QueryAutocompleteEdge
      }
    }
  }

  fragment QueryAutocompleteEdge on AutocompleteEdge {
    key
    entityType
    label
    labelHighlight
    node {
      ...QueryAutocompleteNode
    }
    nodeTypes
  }

  fragment QueryAutocompleteNode on Node {
    __typename
    id
    ... on Client {
      ...QueryAutocompleteClient
    }
    ... on Talent {
      ...QueryAutocompleteRoleType
    }
    ... on TalentPartner {
      ...QueryAutocompleteRoleType
    }
    ... on Staff {
      ...QueryAutocompleteRoleType
    }
    ... on ReferralPartner {
      ...QueryAutocompleteRoleType
    }
    ... on Leader {
      ...QueryAutocompleteRoleType
    }
    ... on CompanyRepresentative {
      ...QueryAutocompleteRoleType
    }
  }

  fragment QueryAutocompleteClient on Client {
    companyLegacyId
    roleType: type
  }

  fragment QueryAutocompleteRoleType on Role {
    roleType: type
  }
`
