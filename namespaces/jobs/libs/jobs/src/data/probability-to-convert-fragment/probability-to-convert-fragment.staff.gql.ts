import { gql } from '@staff-portal/data-layer-service'

export const PROBABILITY_TO_CONVERT_FRAGMENT = gql`
  fragment ProbabilityToConvertFragment on JobProbabilityToConvertScore {
    category
    score
    negativeFeatures {
      name
      position
      value
    }
    positiveFeatures {
      name
      position
      value
    }
  }
`
