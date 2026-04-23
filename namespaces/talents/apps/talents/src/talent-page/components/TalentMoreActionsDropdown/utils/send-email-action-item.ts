import { TalentFragment } from '@staff-portal/talents'
import {
  ActionItemAction,
  ActionItemOperation,
  DropdownActionType
} from '@staff-portal/facilities'

export const sendEmailActionItem = (
  talent: TalentFragment,
  action: ActionItemAction
): ActionItemOperation => ({
  label: 'Send Email',
  type: DropdownActionType.OPERATION,
  operation: talent.emailMessaging?.operations?.sendEmailTo,
  action
})
