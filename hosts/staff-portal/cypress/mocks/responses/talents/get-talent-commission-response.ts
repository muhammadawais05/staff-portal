import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentCommissionResponse = (talent?: Partial<Talent>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      commissions: {
        commissionsPot: 5,
        referralCommission: null,
        __typename: 'TalentCommissions'
      },
      canIssueSourcingCommission: false,
      referrer: null,
      ...talent,
      __typename: 'Talent'
    }
  }
})
