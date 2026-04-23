import { gql, useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'

import { GetTalentPortfolioUrlDocument } from './get-talent-portfolio-url.staff.gql.types'
import { TALENT_PORTFOLIO_URL_FRAGMENT } from '../talent-portfolio-url-fragment'

export const GET_TALENT_PORTFOLIO_URL: typeof GetTalentPortfolioUrlDocument = gql`
  query GetTalentPortfolioUrl($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        ...TalentPortfolioUrlFragment
      }
    }
  }
  ${TALENT_PORTFOLIO_URL_FRAGMENT}
`

export const useGetTalentPortfolioUrl = ({
  talentId,
  batchKey,
  onError
}: {
  talentId: string
  batchKey?: string
  onError?: (error: Error) => void
}) => {
  const { data, ...restOptions } = useQuery(GET_TALENT_PORTFOLIO_URL, {
    variables: { talentId },
    onError,
    context: { [BATCH_KEY]: batchKey }
  })

  return { ...restOptions, portfolioUrlData: data?.node?.portfolio }
}
