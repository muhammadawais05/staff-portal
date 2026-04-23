import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { gql, useLazyQuery } from '@staff-portal/data-layer-service'
import { AutocompleteModels } from '@staff-portal/graphql/staff'

import {
  GetTeamAutocompleteDocument,
  GetTeamAutocompleteQueryVariables
} from './use-get-team-autocomplete.staff.gql.types'

export default gql`
  fragment TeamAutocompleteEdgeFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    nodeTypes
    node {
      ... on Team {
        id
      }
    }
  }

  query GetTeamAutocomplete(
    $term: String!
    $offset: Int!
    $limit: Int!
    $model: AutocompleteModels!
    $excludedIds: [ID!]
  ) {
    autocomplete(
      filter: { term: $term, model: $model, excludedIds: $excludedIds }
      pagination: { offset: $offset, limit: $limit }
    ) {
      edges {
        ...TeamAutocompleteEdgeFragment
      }
    }
  }
`

export const useGetTeamAutocomplete = () => {
  const [fetch, { data, ...options }] = useLazyQuery(
    GetTeamAutocompleteDocument,
    { fetchPolicy: 'cache-first' }
  )

  const getTeams = ({
    term,
    excludedIds,
    offset = 0,
    limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
    model = AutocompleteModels.TEAMS
  }: { term: string } & Partial<GetTeamAutocompleteQueryVariables>) =>
    fetch({ variables: { term, excludedIds, offset, limit, model } })

  return {
    getTeams,
    data: data?.autocomplete.edges ?? [],
    ...options
  }
}
