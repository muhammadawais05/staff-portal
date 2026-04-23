import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { gql, useLazyQuery } from '@staff-portal/data-layer-service'
import { useCallback } from 'react'

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
  limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE
}: {
  verticalId?: string | null
  exactNames?: string[]
  limit?: number
}) => {
  const [fetch, { data, ...options }] = useLazyQuery(
    GetVerticalSkillsAutocompleteDocument,
    {
      fetchPolicy: 'cache-first',
      canonizeResults: false
    }
  )

  const getVerticalSkills = useCallback(
    (term = '', excludedIds?: string[]) => {
      if (!verticalId) {
        return
      }

      fetch({
        variables: { verticalId, term, excludedIds, exactNames, limit }
      })
    },
    [exactNames, fetch, limit, verticalId]
  )

  return {
    getVerticalSkills,
    data: data?.node?.skillsAutocomplete?.edges ?? null,
    ...options
  }
}
