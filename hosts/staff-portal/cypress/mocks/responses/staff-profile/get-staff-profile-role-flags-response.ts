import { RoleFlag } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getStaffProfileRoleFlagsResponse = (
  roleFlags: RoleFlag[] | undefined = []
) => ({
  data: {
    staffNode: {
      id: encodeEntityId('123', 'Staff'),
      roleFlags: {
        nodes: [...roleFlags]
      },
      __typename: 'Staff'
    }
  }
})
