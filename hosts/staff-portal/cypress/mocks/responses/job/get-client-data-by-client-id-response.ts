import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getClientDataByClientIdResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      jobContactsEnabled: true,
      enterprise: false,
      webResource: {
        text: 'Prosacco, Collier and Klein',
        url: 'url.to',
        __typename: 'Link'
      },
      billingDefaults: {
        id: encodeEntityId('123', 'ClientBillingDefaults'),
        billCycle: null,
        __typename: 'ClientBillingDefaults'
      },
      timeZone: {
        name: '(UTC-07:00) America - Los Angeles',
        value: 'America/Los_Angeles',
        __typename: 'TimeZone'
      },
      __typename: 'Client'
    }
  }
})
