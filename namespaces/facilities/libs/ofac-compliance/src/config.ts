import { OfacStatus } from '@staff-portal/graphql/staff'

export const OFAC_STATUS_OPTIONS = [
  { label: 'Normal', value: OfacStatus.NORMAL.toLowerCase() },
  { label: 'Investigation', value: OfacStatus.INVESTIGATION.toLowerCase() },
  { label: 'Restricted', value: OfacStatus.RESTRICTED.toLowerCase() }
]
