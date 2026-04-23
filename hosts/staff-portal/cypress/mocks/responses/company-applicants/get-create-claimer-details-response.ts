import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getCreateClaimerDetailsResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      fullName: 'Company Name',
      companyLegacyId: 123,
      contact: null,
      obscureLead: false,
      pendingCallbackRequest: null,
      __typename: 'Client'
    }
  }
})
