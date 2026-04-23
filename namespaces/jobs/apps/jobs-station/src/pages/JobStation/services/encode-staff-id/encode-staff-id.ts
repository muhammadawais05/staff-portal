import { encodeEntityId } from '@staff-portal/data-layer-service'

export const encodeStaffId = (staffId: string) => {
  if (staffId === 'me' || staffId === 'none') {
    return staffId.toUpperCase()
  }

  return staffId && encodeEntityId(staffId, 'Staff')
}
