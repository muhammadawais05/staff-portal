import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentBillingNotes = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      billingNotes: null,
      __typename: 'Talent'
    }
  }
})
