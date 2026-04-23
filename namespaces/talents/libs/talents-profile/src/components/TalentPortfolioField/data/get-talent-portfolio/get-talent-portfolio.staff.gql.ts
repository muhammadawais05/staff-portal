import { gql, useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'

import { GetTalentPortfolioDocument } from './get-talent-portfolio.staff.gql.types'
import { TALENT_PORTFOLIO_FRAGMENT } from '../talent-portfolio-fragment'

export const GET_TALENT_PORTFOLIO: typeof GetTalentPortfolioDocument = gql`
  query GetTalentPortfolio($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        fullName
        ...TalentPortfolioFragment
      }
    }
  }

  ${TALENT_PORTFOLIO_FRAGMENT}
`

export const useGetTalentPortfolio = ({
  talentId,
  batchKey,
  onError
}: {
  talentId: string
  batchKey?: string
  onError?: (error: Error) => void
}) => {
  const { data, ...restOptions } = useQuery(GET_TALENT_PORTFOLIO, {
    variables: { talentId },
    onError,
    context: { [BATCH_KEY]: batchKey }
  })

  return { ...restOptions, portfolioData: data?.node }
}
