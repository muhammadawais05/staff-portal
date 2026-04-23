import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getApplicationInfoResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      applicationInfo: {
        id: encodeEntityId('123', 'ApplicationInfo'),
        attributes: [
          {
            key: 'utm_medium',
            value: 'organic',
            __typename: 'KeyValueStrings'
          }
        ],
        __typename: 'ApplicationInfo'
      },
      __typename: 'Client'
    }
  }
})
