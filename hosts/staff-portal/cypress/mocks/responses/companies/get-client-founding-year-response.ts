import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getClientFoundingYearResponse = () => ({
  data: {
    node: {
      foundingYear: null,
      id: encodeEntityId('123', 'Client'),
      __typename: 'Client'
    }
  }
})
