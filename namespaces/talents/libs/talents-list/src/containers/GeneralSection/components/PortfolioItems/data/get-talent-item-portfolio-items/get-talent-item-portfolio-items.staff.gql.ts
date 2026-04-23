import { gql, useGetNode } from '@staff-portal/data-layer-service'
import { TALENT_LIST_PORTFOLIO_ITEM_FRAGMENT } from '@staff-portal/talents'

import { GetTalentItemPortfolioItemsDocument } from './get-talent-item-portfolio-items.staff.gql.types'

export default gql`
  query GetTalentItemPortfolioItems($talentId: ID!) {
    node(id: $talentId) {
      ...TalentPortfolioProfileFragment
    }
  }

  fragment TalentPortfolioProfileFragment on Talent {
    id
    profile: profileV2 {
      id
      portfolioItems {
        nodes {
          ...TalentListPortfolioItemFragment
        }
      }
    }
  }

  ${TALENT_LIST_PORTFOLIO_ITEM_FRAGMENT}
`

export const useGetTalentItemPortfolioItems = ({
  talentId
}: {
  talentId: string
}) => {
  const { data, loading, ...restOptions } = useGetNode(
    GetTalentItemPortfolioItemsDocument
  )({ talentId })

  return {
    data: data?.profile?.portfolioItems.nodes,
    loading: loading && !data,
    ...restOptions
  }
}
