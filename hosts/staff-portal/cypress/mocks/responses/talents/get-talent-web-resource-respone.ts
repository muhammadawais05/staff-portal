import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentWebResourceResponse = (talent?: Partial<Talent>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      webResource: {
        url: 'https://staging.toptal.net/platform/staff/talents/123',
        __typename: 'Link'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
