import { paymentTotalSortOrder } from '@staff-portal/billing-widgets/src/modules/payment/utils'

export const receivedPaymentSortOrder = paymentTotalSortOrder.filter(
  val => val !== 'debited'
)
