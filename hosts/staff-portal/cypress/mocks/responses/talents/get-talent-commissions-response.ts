import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentCommissionsResponse = (talent?: Partial<Talent>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      referrer: null,
      commissions: {
        commissionsPot: 5,
        referralCommission: null,
        __typename: 'TalentCommissions'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
