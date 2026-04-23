import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { ApolloClient, gql } from '@staff-portal/data-layer-service'
import { AutocompleteModels } from '@staff-portal/graphql/staff'

import { GetTeamMembersAutocompleteDocument } from './get-team-members-autocomplete.staff.gql.types'

export default gql`
  query GetTeamMembersAutocomplete(
    $term: String!
    $excludedIds: [ID!]
    $model: AutocompleteModels!
    $offset: Int!
    $limit: Int!
  ) {
    autocomplete(
      filter: { term: $term, model: $model, excludedIds: $excludedIds }
      pagination: { offset: $offset, limit: $limit }
    ) {
      edges {
        ...TeamMembersAutocompleteEdgeFragment
      }
    }
  }

  fragment TeamMembersAutocompleteEdgeFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    entityType
    nodeTypes
    node {
      ... on Staff {
        id
        fullName
      }
    }
  }
`

export const getTeamMembersAutocomplete = async (
  term: string,
  limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  client: ApolloClient<object>
) => {
  const { data, ...options } = await client.query({
    query: GetTeamMembersAutocompleteDocument,
    variables: {
      term,
      limit,
      offset: 0,
      model: AutocompleteModels.ACTIVE_STAFF
    },
    fetchPolicy: 'cache-first'
  })

  return {
    data: data?.autocomplete.edges,
    ...options
  }
}
