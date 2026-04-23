import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import {
  gql,
  QueryFunctionOptions,
  useLazyQuery
} from '@staff-portal/data-layer-service'

import {
  GetJobSkillsAutocompleteDocument,
  GetJobSkillsAutocompleteQuery,
  GetJobSkillsAutocompleteQueryVariables
} from './get-job-skills-autocomplete.staff.gql.types'
import { SKILL_FRAGMENT } from '../../../../data'

export const GET_JOB_SKILLS_AUTOCOMPLETE: typeof GetJobSkillsAutocompleteDocument = gql`
  query GetJobSkillsAutocomplete(
    $jobId: ID!
    $term: String
    $exactName: String
    $excludedIds: [ID!]
    $offset: Int!
    $limit: Int!
  ) {
    node(id: $jobId) {
      ... on Job {
        id
        skillsAutocomplete(
          filter: {
            term: $term
            exactName: $exactName
            excludedIds: $excludedIds
          }
          pagination: { offset: $offset, limit: $limit }
        ) {
          edges {
            ...SkillAutocompleteEdgeFragment
          }
        }
      }
    }
  }

  fragment SkillAutocompleteEdgeFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    node {
      ...SkillFragment
    }
  }

  ${SKILL_FRAGMENT}
`

export type GetJobSkillsAutocompleteProps =
  Partial<GetJobSkillsAutocompleteQueryVariables> &
    QueryFunctionOptions<
      GetJobSkillsAutocompleteQuery,
      GetJobSkillsAutocompleteQueryVariables
    >

export const useGetJobSkillsAutocomplete = ({
  jobId,
  onCompleted
}: {
  jobId: string
  onCompleted?: (data: GetJobSkillsAutocompleteQuery) => void
}) => {
  const [fetch, { data, ...options }] = useLazyQuery(
    GET_JOB_SKILLS_AUTOCOMPLETE,
    {
      fetchPolicy: 'cache-first',
      canonizeResults: false,
      onCompleted
    }
  )

  const getJobSkills = ({
    term,
    exactName,
    excludedIds,
    offset = 0,
    limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE
  }: Partial<GetJobSkillsAutocompleteQueryVariables>) =>
    fetch({ variables: { jobId, term, exactName, excludedIds, offset, limit } })

  return {
    getJobSkills,
    data: data?.node?.skillsAutocomplete?.edges ?? null,
    ...options
  }
}
