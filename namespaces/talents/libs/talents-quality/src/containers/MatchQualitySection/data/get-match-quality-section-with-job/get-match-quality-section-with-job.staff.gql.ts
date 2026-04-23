import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetMatchQualitySectionWithJobDocument } from './get-match-quality-section-with-job.staff.gql.types'
import { TALENT_MATCH_QUALITY_FRAGMENT } from '../talent-match-quality-fragment/talent-match-quality-fragment.staff.gql'

export const GET_MATCH_QUALITY_SECTION_WITH_JOB: typeof GetMatchQualitySectionWithJobDocument = gql`
  query GetMatchQualitySectionWithJob($talentId: ID!, $jobId: ID!) {
    metrics: node(id: $talentId) {
      ... on Talent {
        id
        matchQualityMetrics(jobId: $jobId) {
          nodes {
            ...TalentMatchQualityFragment
          }
        }
      }
    }
    job: node(id: $jobId) {
      ... on Job {
        id
        webResource {
          text
          url
        }
      }
    }
  }

  ${TALENT_MATCH_QUALITY_FRAGMENT}
`

export const useGetMatchQualitySectionWithJob = ({
  talentId,
  jobId,
  onError,
  skip
}: {
  talentId: string
  jobId: string
  onError: () => void
  skip?: boolean
}) => {
  const { data, loading, error } = useQuery(
    GET_MATCH_QUALITY_SECTION_WITH_JOB,
    {
      onError,
      skip,
      variables: {
        talentId,
        jobId
      }
    }
  )

  return {
    metrics: data?.metrics,
    job: data?.job,
    loading: loading && !data,
    error
  }
}
