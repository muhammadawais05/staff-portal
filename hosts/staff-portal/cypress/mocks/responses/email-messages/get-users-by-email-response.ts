import { Maybe, Staff } from '@staff-portal/graphql/staff'

export const getUsersByEmailResponse = (
  users: Maybe<Partial<Staff>>[] = []
) => ({
  data: {
    communicationTrackingRoles: {
      nodes: users,
      __typename: 'RoleOrClientNullableSimpleConnection'
    }
  }
})
