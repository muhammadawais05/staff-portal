import { gql, useQuery } from '@staff-portal/data-layer-service'
import { TALENT_WORK_EXPERIENCE_PORTFOLIO_ITEM_FRAGMENT } from '@staff-portal/talents'

import { GetTalentWorkExperiencePortfolioItemsDocument } from './get-talent-work-experience-portfolio-items.staff.gql.types'

export default gql`
  query GetTalentWorkExperiencePortfolioItems($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        type
        profile: profileV2 {
          id
          portfolioItems {
            nodes {
              ...TalentWorkExperiencePortfolioItemFragment
            }
          }
        }
      }
    }
  }

  ${TALENT_WORK_EXPERIENCE_PORTFOLIO_ITEM_FRAGMENT}
`

export const useGetTalentWorkExperiencePortfolioItems = ({
  talentId,
  onError,
  skip
}: {
  talentId: string
  onError: () => void
  skip?: boolean
}) => {
  const { data, loading, error } = useQuery(
    GetTalentWorkExperiencePortfolioItemsDocument,
    {
      onError,
      variables: {
        talentId
      },
      skip
    }
  )

  return {
    data: data?.node?.profile?.portfolioItems.nodes,
    talentType: data?.node?.type as string,
    loading: loading && !data,
    error
  }
}
