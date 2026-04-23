import { encodeEntityId } from '@staff-portal/data-layer-service'

export const GetChangeEngagementStartDateDataResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Engagement'),
      timeZone: {
        name: 'Europe/London',
        value: 'Europe/London',
        __typename: 'TimeZone'
      },
      __typename: 'Engagement'
    }
  }
})
