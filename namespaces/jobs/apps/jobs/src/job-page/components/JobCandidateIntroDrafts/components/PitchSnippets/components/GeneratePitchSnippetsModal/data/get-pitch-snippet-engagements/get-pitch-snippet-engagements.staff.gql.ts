import { gql, useQuery } from '@staff-portal/data-layer-service'
import { ENGAGEMENT_PITCH_SNIPPET_FRAGMENT } from '@staff-portal/engagements-candidate-sending'

import { GetPitchSnippetEngagementsDocument } from './get-pitch-snippet-engagements.staff.gql.types'

export const GET_PITCH_SNIPPET_ENGAGEMENTS = gql`
  query GetPitchSnippetEngagements($engagementIds: [ID!]!) {
    nodes(ids: $engagementIds) {
      ... on Engagement {
        ...EngagementPitchSnippetFragment
      }
    }
  }

  ${ENGAGEMENT_PITCH_SNIPPET_FRAGMENT}
`

export const useGetPitchSnippetEngagements = (engagementIds: string[]) => {
  const { data, error, loading, ...restOptions } = useQuery(
    GetPitchSnippetEngagementsDocument,
    {
      throwOnError: true,
      variables: { engagementIds }
    }
  )

  return {
    data: data?.nodes ?? [],
    error,
    loading,
    ...restOptions
  }
}
