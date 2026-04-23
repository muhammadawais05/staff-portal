import { formatAmount } from '@toptal/picasso/utils'
import { Hold } from '@staff-portal/graphql/staff'

import { formatDateMed } from '../../dateTime'
import i18n from '../../../utils/i18n'

export const getPaymentOnHold = ({ amountThreshold, dateThreshold }: Hold) => {
  if (dateThreshold) {
    return i18n.t('payment:paymentOnHold.date', {
      date: formatDateMed(dateThreshold)
    })
  } else if (amountThreshold) {
    return i18n.t('payment:paymentOnHold.amount', {
      amount: formatAmount({ amount: amountThreshold })
    })
  }

  return i18n.t('payment:paymentOnHold.requested')
}
