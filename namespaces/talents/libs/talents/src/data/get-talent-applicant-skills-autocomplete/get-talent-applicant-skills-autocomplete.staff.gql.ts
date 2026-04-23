import { useCallback, useMemo } from 'react'
import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import {
  ApplicantSkillsAutocompleteFragment,
  GetTalentApplicationSkillsAutoCompleteDocument,
  GetTalentApplicationSkillsAutoCompleteQueryVariables
} from './get-talent-applicant-skills-autocomplete.staff.gql.types'

export const GET_TALENT_APPLICATION_SKILLS_AUTOCOMPLETE = gql`
  query GetTalentApplicationSkillsAutoComplete(
    $talentOrVerticalId: ID!
    $term: String!
    $excludedIds: [ID!]
    $offset: Int!
    $limit: Int!
  ) {
    node(id: $talentOrVerticalId) {
      ... on Talent {
        id
        vertical {
          id
          skillsAutocomplete(
            filter: { term: $term, excludedIds: $excludedIds }
            pagination: { offset: $offset, limit: $limit }
          ) {
            edges {
              ...ApplicantSkillsAutocompleteFragment
            }
          }
        }
      }

      ... on Vertical {
        id
        skillsAutocomplete(
          filter: { term: $term, excludedIds: $excludedIds }
          pagination: { offset: $offset, limit: $limit }
        ) {
          edges {
            ...ApplicantSkillsAutocompleteFragment
          }
        }
      }
    }
  }

  fragment ApplicantSkillsAutocompleteFragment on AutocompleteEdge {
    key
    labelHighlight
    node {
      ... on Skill {
        name
        id
      }
    }
  }
`

interface SkillsAutoCompleteQueryVariables
  extends Omit<
    GetTalentApplicationSkillsAutoCompleteQueryVariables,
    'offset' | 'limit'
  > {
  offset?: number
  limit?: number
}

export const useGetTalentApplicationSkillsAutoComplete = () => {
  const [fetch, { data, loading, called }] = useLazyQuery(
    GetTalentApplicationSkillsAutoCompleteDocument,
    {
      fetchPolicy: 'cache-first',
      canonizeResults: false
    }
  )

  const request = useCallback(
    ({
      talentOrVerticalId,
      term,
      excludedIds = [],
      offset = 0,
      limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE
    }: SkillsAutoCompleteQueryVariables) =>
      fetch({
        variables: { talentOrVerticalId, term, excludedIds, offset, limit }
      }),
    [fetch]
  )

  return useMemo(() => {
    let skills: ApplicantSkillsAutocompleteFragment[] | null = null

    if (data?.node) {
      if ('vertical' in data.node) {
        skills = data?.node?.vertical?.skillsAutocomplete.edges ?? []
      }

      if ('skillsAutocomplete' in data.node) {
        skills = data.node.skillsAutocomplete.edges
      }
    }

    return {
      request,
      data: skills,
      loading,
      called
    }
  }, [loading, request, data, called])
}
