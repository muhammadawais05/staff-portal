import {
  MatchQualityMetricName,
  MatchQualityMetricValue
} from '@staff-portal/graphql/staff'
import { mapToTypename } from '@staff-portal/test-utils'

import { GetMatchQualitySectionQueryVariables } from './get-match-quality-section.staff.gql.types'
import { TalentMatchQualityFragment } from '../talent-match-quality-fragment/talent-match-quality-fragment.staff.gql.types'
import { GET_MATCH_QUALITY_SECTION } from './get-match-quality-section.staff.gql'

export const createTalentMatchQualityFragment = (
  mock: Partial<TalentMatchQualityFragment>
): TalentMatchQualityFragment => ({
  label: mock.label || 'TEST_LABEL_TOOLTIP',
  labelTooltip: mock.labelTooltip || 'TEST_LABEL_TOOLTIP',
  name: mock.name || MatchQualityMetricName.EMPLOYMENT_ITEMS,
  value: mock.value || MatchQualityMetricValue.PASSED,
  labelLink: mock.labelLink || 'TEST_LINK',
  valueTooltip: mock.valueTooltip || 'TEST_TOOLTIP'
})

export type MetricMockParam = {
  [key in MatchQualityMetricName]?: Partial<TalentMatchQualityFragment>
}

export const createGetMatchQualitySectionMock = (
  variables: GetMatchQualitySectionQueryVariables,
  metricsMock?: MetricMockParam
) => {
  const names = [
    MatchQualityMetricName.PORTFOLIO_COUNT,
    MatchQualityMetricName.HIGH_QUALITY_PHOTO,
    MatchQualityMetricName.EXTERNAL_PROFILES,
    MatchQualityMetricName.EMPLOYMENT_ITEMS,
    MatchQualityMetricName.NO_YELLOW_FLAG,
    MatchQualityMetricName.FEEDBACK_SCORE,
    MatchQualityMetricName.NO_CONSECUTIVE_FAILED_ENGAGEMENTS,
    MatchQualityMetricName.FAILED_TRIALS_COUNT
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
      query: GET_MATCH_QUALITY_SECTION,
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
        }
      }
    }
  }
}

export const createGetMatchQualitySectionFailedMock = (
  variables: GetMatchQualitySectionQueryVariables,
  errorMessage = 'fake error message.'
) => ({
  request: { query: GET_MATCH_QUALITY_SECTION, variables },
  error: new Error(errorMessage)
})
