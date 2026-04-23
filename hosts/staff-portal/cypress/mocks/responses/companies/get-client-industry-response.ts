import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getClientIndustryResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      industry: 'Travel, Transportation & Logistics',
      __typename: 'Client'
    }
  }
})
