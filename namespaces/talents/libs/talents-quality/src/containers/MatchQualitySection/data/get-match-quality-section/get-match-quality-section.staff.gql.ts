import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetMatchQualitySectionDocument } from './get-match-quality-section.staff.gql.types'
import { TALENT_MATCH_QUALITY_FRAGMENT } from '../talent-match-quality-fragment/talent-match-quality-fragment.staff.gql'

export const GET_MATCH_QUALITY_SECTION: typeof GetMatchQualitySectionDocument = gql`
  query GetMatchQualitySection($talentId: ID!) {
    metrics: node(id: $talentId) {
      ... on Talent {
        id
        matchQualityMetrics {
          nodes {
            ...TalentMatchQualityFragment
          }
        }
      }
    }
  }

  ${TALENT_MATCH_QUALITY_FRAGMENT}
`

export const useGetMatchQualitySection = ({
  talentId,
  onError,
  skip
}: {
  talentId: string
  onError: () => void
  skip?: boolean
}) => {
  const { data, loading, error } = useQuery(GET_MATCH_QUALITY_SECTION, {
    onError,
    skip,
    variables: {
      talentId
    }
  })

  return {
    metrics: data?.metrics,
    loading: loading && !data,
    error
  }
}
