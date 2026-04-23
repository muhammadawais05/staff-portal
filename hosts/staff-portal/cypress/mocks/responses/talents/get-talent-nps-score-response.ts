import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentNPSScoreResponse = (talent?: Partial<Talent>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      lastAnsweredPromotion: null,
      promotions: {
        webResource: {
          text: 'Promotions',
          url: 'https://staging.toptal.net/platform/staff/talents/3012798/promotions',
          __typename: 'Link'
        },
        __typename: 'PromotionsConnection'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
