import { InvestigationReason } from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'

import { Investigation } from '../types'

export const getInvestigationTitle = (reason: Investigation['reason']) => {
  if (reason === InvestigationReason.PAYMENT_PROBLEM) {
    return 'Payment problems'
  }

  return titleize(reason, { capitalizeAllWords: false })
}
