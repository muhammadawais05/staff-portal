import { gql, useQuery } from '@staff-portal/data-layer-service'

import { TALENT_PORTFOLIO_ITEM_FRAGMENT } from '../../../../../../data/talent-portfolio-item-fragment'
import { GetTalentPortfolioItemsDocument } from './get-talent-portfolio-items.staff.gql.types'

export const GET_TALENT_PORTFOLIO_ITEMS: typeof GetTalentPortfolioItemsDocument = gql`
  query GetTalentPortfolioItems($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        type
        profile: profileV2 {
          id
          portfolioItems {
            nodes {
              ...TalentPortfolioItemFragment
            }
          }
        }
      }
    }
  }

  ${TALENT_PORTFOLIO_ITEM_FRAGMENT}
`

export const useGetTalentPortfolioItems = ({
  talentId,
  onError,
  skip
}: {
  talentId: string
  onError: () => void
  skip?: boolean
}) => {
  const { data, loading, error } = useQuery(GET_TALENT_PORTFOLIO_ITEMS, {
    onError,
    fetchPolicy: 'cache-first',
    variables: {
      talentId
    },
    skip
  })

  return {
    data: data?.node?.profile?.portfolioItems.nodes,
    talentType: data?.node?.type as string,
    loading: loading && !data,
    error
  }
}
