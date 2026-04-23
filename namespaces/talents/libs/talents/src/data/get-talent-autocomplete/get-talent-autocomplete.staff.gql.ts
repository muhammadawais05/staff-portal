import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { gql, useLazyQuery } from '@staff-portal/data-layer-service'
import { AutocompleteModels } from '@staff-portal/graphql/staff'

import {
  GetTalentAutocompleteDocument,
  GetTalentAutocompleteQueryVariables
} from './get-talent-autocomplete.staff.gql.types'

export const TALENT_AUTOCOMPLETE_EDGE_FRAGMENT = gql`
  fragment TalentAutocompleteEdgeFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    nodeTypes
    node {
      ... on Talent {
        id
      }
    }
  }
`

export default gql`
  query GetTalentAutocomplete(
    $term: String!
    $offset: Int!
    $limit: Int!
    $model: AutocompleteModels!
  ) {
    autocomplete(
      filter: { term: $term, model: $model }
      pagination: { offset: $offset, limit: $limit }
    ) {
      edges {
        ...TalentAutocompleteEdgeFragment
      }
    }
  }
  ${TALENT_AUTOCOMPLETE_EDGE_FRAGMENT}
`

export const useGetTalentAutocomplete = () => {
  const [fetch, { data, ...options }] = useLazyQuery(
    GetTalentAutocompleteDocument,
    {
      fetchPolicy: 'cache-first',
      canonizeResults: false
    }
  )

  const getTalents = ({
    term,
    offset = 0,
    limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
    model = AutocompleteModels.TALENTS
  }: { term: string } & Partial<GetTalentAutocompleteQueryVariables>) =>
    fetch({ variables: { term, offset, limit, model } })

  return {
    getTalents,
    data: data?.autocomplete.edges ?? null,
    ...options
  }
}
