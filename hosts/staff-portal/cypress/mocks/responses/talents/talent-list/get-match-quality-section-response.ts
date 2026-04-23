import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Talent } from '@staff-portal/graphql/staff'

export const getMatchQualitySectionResponse = (talent?: Partial<Talent>) => ({
  data: {
    metrics: {
      id: encodeEntityId('123', 'Talent'),
      matchQualityMetrics: {
        nodes: [
          {
            label: 'Portfolio Items',
            labelLink: 'https://demo.com',
            labelTooltip: 'Talent meets minimum count of portfolio',
            name: 'PORTFOLIO_COUNT',
            value: 'PASSED',
            valueTooltip:
              'Talent has 3 portfolio items.\n3 are required for Developers.',
            __typename: 'MatchQualityMetric'
          }
        ],
        __typename: 'MatchQualityMetricConnection'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
