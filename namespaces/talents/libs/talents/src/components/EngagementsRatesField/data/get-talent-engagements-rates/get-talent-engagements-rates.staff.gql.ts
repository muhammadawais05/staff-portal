import { gql, useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'

import { GetTalentEngagementsRatesDocument } from './get-talent-engagements-rates.staff.gql.types'
import { TALENT_ENGAGEMENT_RATES_FRAGMENT } from '../../../../data/talent-engament-rates-fragment'

export const GET_TALENT_ENGAGEMENTS_RATES: typeof GetTalentEngagementsRatesDocument = gql`
  query GetTalentEngagementsRates($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        ...TalentEngagementRatesFragment
      }
    }
  }

  ${TALENT_ENGAGEMENT_RATES_FRAGMENT}
`

export const useGetTalentEngagementsRates = ({
  talentId,
  batchKey,
  onError
}: {
  talentId: string
  batchKey?: string
  onError: () => void
}) =>
  useQuery(GET_TALENT_ENGAGEMENTS_RATES, {
    onError,
    variables: { talentId },
    context: { [BATCH_KEY]: batchKey }
  })
