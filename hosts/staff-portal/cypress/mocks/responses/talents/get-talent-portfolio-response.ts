import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentPortfolioResponse = (talent?: Partial<Talent>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      fullName: 'Euna Conroy',
      portfolio: null,
      ...talent,
      __typename: 'Talent'
    }
  }
})
