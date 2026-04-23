import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import {
  GetTalentSkillsAutocompleteDocument,
  GetTalentSkillsAutocompleteQueryVariables
} from './get-talent-skills-autocomplete.staff.gql.types'
import { NOTE_AUTOCOMPLETE_EDGE_FRAGMENT } from '../note-autocomplete-edge-fragment'

export const GET_TALENT_SKILLS_AUTOCOMPLETE: typeof GetTalentSkillsAutocompleteDocument = gql`
  query GetTalentSkillsAutocomplete(
    $noteQuestionId: ID!
    $verticalId: ID!
    $term: String!
    $excludedIds: [ID!]
    $excludedExactSkillNames: [String!]
    $offset: Int!
    $limit: Int!
  ) {
    node(id: $noteQuestionId) {
      ... on NoteQuestion {
        id
        talentSkillsAutocomplete(
          filter: {
            term: $term
            talentVerticalId: $verticalId
            excludedIds: $excludedIds
            excludedExactSkillNames: $excludedExactSkillNames
          }
          pagination: { limit: $limit, offset: $offset }
        ) {
          edges {
            ...NoteAutocompleteEdgeFragment
          }
        }
      }
    }
  }

  ${NOTE_AUTOCOMPLETE_EDGE_FRAGMENT}
`

export const useGetTalentSkillsAutocomplete = ({
  noteQuestionId,
  verticalId
}: {
  noteQuestionId: string
  verticalId: string
}) => {
  const [fetch, { data, ...options }] = useLazyQuery(
    GET_TALENT_SKILLS_AUTOCOMPLETE,
    { fetchPolicy: 'cache-first' }
  )

  const getTalentSkills = ({
    term,
    excludedIds,
    excludedExactSkillNames,
    limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
    offset = 0
  }: { term: string } & Partial<
    Omit<
      GetTalentSkillsAutocompleteQueryVariables,
      'term' | 'noteQuestionId' | 'verticalId'
    >
  >) =>
    fetch({
      variables: {
        excludedIds,
        excludedExactSkillNames,
        limit,
        noteQuestionId,
        offset,
        verticalId,
        term
      }
    })

  return {
    getTalentSkills,
    data: data?.node?.talentSkillsAutocomplete?.edges ?? null,
    ...options
  }
}
