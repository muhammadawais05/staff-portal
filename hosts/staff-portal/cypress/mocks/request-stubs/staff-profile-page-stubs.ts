import { Staff } from '@staff-portal/graphql/staff'

import { OperationValue } from '~integration/types'
import {
  getPendoVisitorResponse,
  getStaffProfileMessagesResponse,
  getStaffProfileResponse,
  getStaffProfileRoleFlagsResponse,
  getStaffOfacStatusResponse,
  getStaffOfacStatusMessagesResponse,
  getDayOffResponse
} from '../responses'

export const staffProfilePageStubs = (
  staff?: Partial<Staff>
): { [key: string]: OperationValue } => ({
  GetStaffProfile: getStaffProfileResponse(staff),
  GetStaffProfileMessages: getStaffProfileMessagesResponse(),
  GetPendoVisitor: getPendoVisitorResponse(),
  GetRoleFlags: getStaffProfileRoleFlagsResponse(),
  GetOfacStatusData: getStaffOfacStatusResponse(),
  GetNodeStatusMessages: getStaffOfacStatusMessagesResponse(),
  GetDayOffs: getDayOffResponse()
})
