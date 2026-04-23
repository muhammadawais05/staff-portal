import { MatchQualityMetricName } from '@staff-portal/graphql/staff'
import { mapToTypename } from '@staff-portal/test-utils'

import {
  GetMatchQualitySectionWithJobQueryVariables,
  GetMatchQualitySectionWithJobQuery
} from './get-match-quality-section-with-job.staff.gql.types'
import {
  createTalentMatchQualityFragment,
  MetricMockParam
} from '../get-match-quality-section/mocks'
import { GET_MATCH_QUALITY_SECTION_WITH_JOB } from './get-match-quality-section-with-job.staff.gql'

export const createGetMatchQualitySectionWithJobMock = (
  variables: GetMatchQualitySectionWithJobQueryVariables,
  metricsMock?: MetricMockParam,
  job?: GetMatchQualitySectionWithJobQuery['job']
) => {
  const names = [
    MatchQualityMetricName.PORTFOLIO_COUNT,
    MatchQualityMetricName.HIGH_QUALITY_PHOTO,
    MatchQualityMetricName.EXTERNAL_PROFILES,
    MatchQualityMetricName.EMPLOYMENT_ITEMS,
    MatchQualityMetricName.NO_YELLOW_FLAG,
    MatchQualityMetricName.FEEDBACK_SCORE,
    MatchQualityMetricName.NO_CONSECUTIVE_FAILED_ENGAGEMENTS,
    MatchQualityMetricName.FAILED_TRIALS_COUNT,
    MatchQualityMetricName.SKILL_MATCH,
    MatchQualityMetricName.COUNTRY_FIT,
    MatchQualityMetricName.HOURS_OVERLAP,
    MatchQualityMetricName.RATE_MATCH,
    MatchQualityMetricName.INTERVIEW_COUNT,
    MatchQualityMetricName.UNSUCCESSFUL_ENGAGEMENT
  ]

  const nodes = names.map(name => {
    let metric = createTalentMatchQualityFragment({ name })

    if (metricsMock && metricsMock[name]) {
      metric = {
        ...metric,
        ...metricsMock[name]
      }
    }

    return metric
  })

  return {
    request: {
      query: GET_MATCH_QUALITY_SECTION_WITH_JOB,
      variables
    },
    result: {
      data: {
        metrics: {
          __typename: 'Talent',
          id: variables.talentId,
          matchQualityMetrics: {
            nodes: mapToTypename(nodes, 'MatchQualityMetric'),
            __typename: 'MatchQualityMetricConnection'
          }
        },
        job: {
          id: variables.jobId,
          webResource: {
            ...job?.webResource,
            __typename: 'Link'
          },
          __typename: 'Job'
        }
      }
    }
  }
}

export const createGetMatchQualitySectionWithJobFailedMock = (
  variables: GetMatchQualitySectionWithJobQueryVariables,
  errorMessage = 'fake error message.'
) => ({
  request: { query: GET_MATCH_QUALITY_SECTION_WITH_JOB, variables },
  error: new Error(errorMessage)
})
