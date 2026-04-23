import { getTalentPaymentsPath } from '@staff-portal/routes'
import { isNotNullish } from '@staff-portal/utils'
import { getRoleTypeText, ActionItemLink } from '@staff-portal/facilities'
import { TalentFragment } from '@staff-portal/talents'

import { linkActionItem } from './link-action-items'

export const paymentsActionItem = (
  talent: TalentFragment,
  talentLegacyId: string
): ActionItemLink => {
  const { payments, type } = talent

  return {
    ...linkActionItem('Payments', getTalentPaymentsPath(talentLegacyId)),
    disabled: !payments?.totalCount,
    visible: isNotNullish(payments),
    disabledText: `This ${getRoleTypeText(type)} does not have any payments`
  }
}
