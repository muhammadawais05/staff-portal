import { RoleStatus } from '@staff-portal/graphql/staff'
import { ColorType } from '@toptal/picasso'

export const STAFF_STATUS_MAPPING: Record<
  string,
  { text: string; color: ColorType }
> = {
  [RoleStatus.ACTIVE]: { text: 'Active', color: 'green' },
  [RoleStatus.REMOVED]: {
    text: 'Deleted',
    color: 'dark-grey'
  },
  [RoleStatus.APPLIED]: { text: 'Applied', color: 'dark-grey' },
  [RoleStatus.REJECTED]: { text: 'Rejected', color: 'dark-grey' }
}
