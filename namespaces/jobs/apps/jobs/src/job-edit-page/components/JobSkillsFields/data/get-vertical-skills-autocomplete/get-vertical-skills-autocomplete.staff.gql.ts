import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { gql, useQuery } from '@staff-portal/data-layer-service'

import { VerticalSkillFragmentDoc } from '../vertical-skill-fragment/vertical-skill-fragment.staff.gql.types'
import { GetVerticalSkillsAutocompleteDocument } from './get-vertical-skills-autocomplete.staff.gql.types'

export default gql`
  query GetVerticalSkillsAutocomplete(
    $verticalId: ID!
    $term: String
    $exactNames: [String!]
    $excludedIds: [ID!]
    $limit: Int!
  ) {
    node(id: $verticalId) {
      ... on Vertical {
        id
        skillsAutocomplete(
          filter: {
            term: $term
            exactNames: $exactNames
            excludedIds: $excludedIds
          }
          pagination: { offset: 0, limit: $limit }
        ) {
          edges {
            ...VerticalSkillAutocompleteEdgeFragment
          }
        }
      }
    }
  }

  fragment VerticalSkillAutocompleteEdgeFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    node {
      ...VerticalSkillFragment
    }
  }
  ${VerticalSkillFragmentDoc}
`

export const useGetVerticalSkillsAutocomplete = ({
  verticalId,
  exactNames,
  limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  skip
}: {
  verticalId: string
  exactNames?: string[]
  limit?: number
  skip?: boolean
}) => {
  const { data, ...options } = useQuery(GetVerticalSkillsAutocompleteDocument, {
    variables: { verticalId, exactNames, limit },
    fetchPolicy: 'cache-first',
    canonizeResults: false,
    skip
  })

  return {
    data: data?.node?.skillsAutocomplete?.edges ?? null,
    ...options
  }
}
