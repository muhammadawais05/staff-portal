import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { EnableTopscreenFeatureDocument } from './enable-topscreen-feature.staff.gql.types'

export const ENABLE_TOPSCREEN_FEATURE: typeof EnableTopscreenFeatureDocument = gql`
  mutation EnableTopscreenFeature($input: EnableTopscreenFeatureInput!) {
    enableTopscreenFeature(input: $input) {
      ...MutationResultFragment
      clientMutationId
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
