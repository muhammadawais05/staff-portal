import { StaffCumulativeStatus } from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'

const getStaffStatusOptions = () => [
  {
    value: StaffCumulativeStatus.APPLIED,
    label: titleize(StaffCumulativeStatus.APPLIED)
  },
  {
    value: StaffCumulativeStatus.ACTIVE,
    label: titleize(StaffCumulativeStatus.ACTIVE)
  },
  {
    value: StaffCumulativeStatus.REJECTED,
    label: titleize(StaffCumulativeStatus.REJECTED)
  },
  {
    value: StaffCumulativeStatus.REMOVED,
    label: 'Deleted'
  }
]

export default getStaffStatusOptions
