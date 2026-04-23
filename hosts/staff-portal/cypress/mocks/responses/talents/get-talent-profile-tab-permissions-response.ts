import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentProfileTabPermissionsResponse = (
  talent?: Partial<Talent>
) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      commentsAccessible: true,
      ...talent,
      __typename: 'Talent'
    }
  }
})
