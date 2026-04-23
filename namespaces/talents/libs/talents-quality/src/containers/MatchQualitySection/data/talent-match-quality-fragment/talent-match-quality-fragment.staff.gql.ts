import { gql } from '@staff-portal/data-layer-service'

export const TALENT_MATCH_QUALITY_FRAGMENT = gql`
  fragment TalentMatchQualityFragment on MatchQualityMetric {
    label
    labelLink
    labelTooltip
    name
    value
    valueTooltip
  }
`
