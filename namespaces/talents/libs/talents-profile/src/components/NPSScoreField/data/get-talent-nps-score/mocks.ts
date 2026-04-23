import { GET_TALENT_NPS_SCORE } from './get-talent-nps-score.staff.gql'

export const createGetTalentNPSScoreMock = ({
  talentId,
  lastAnsweredPromotion,
  url
}: {
  talentId: string
  lastAnsweredPromotion?: {
    score: number
    updatedAt: string
  }
  url: string | null
}) => ({
  request: {
    query: GET_TALENT_NPS_SCORE,
    variables: { talentId }
  },
  result: {
    data: {
      node: {
        id: talentId,
        lastAnsweredPromotion: lastAnsweredPromotion
          ? {
              ...lastAnsweredPromotion,
              __typename: 'Promotion'
            }
          : null,
        promotions: {
          webResource: { text: 'Promotions', url, __typename: 'Link' },
          __typename: 'PromotionsConnection'
        },
        __typename: 'Talent'
      }
    }
  }
})
