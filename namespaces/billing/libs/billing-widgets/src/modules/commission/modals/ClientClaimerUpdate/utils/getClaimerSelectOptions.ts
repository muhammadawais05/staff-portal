import { Staff } from '@staff-portal/graphql/staff'

const getClaimerSelectOptions = (
  roles: Pick<Staff, 'id' | 'fullName' | 'type'>[]
) =>
  roles.map(role => ({
    text: `${role.fullName} (${role.type})`,
    value: role.id
  }))

export default getClaimerSelectOptions
