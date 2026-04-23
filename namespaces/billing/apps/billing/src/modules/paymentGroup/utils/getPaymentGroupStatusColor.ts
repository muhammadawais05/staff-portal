import { ColorType } from '@toptal/picasso'
import { PaymentGroupStatus } from '@staff-portal/graphql/staff'

/**
 * https://github.com/toptal/platform/blob/master/app/decorators/payment_group_decorator.rb#L14-L19
 */
export const getPaymentGroupStatusColor = (
  status: PaymentGroupStatus
): ColorType | undefined => {
  switch (status) {
    case PaymentGroupStatus.OUTSTANDING:
      return 'red'
    case PaymentGroupStatus.PAID:
      return 'green'
    case PaymentGroupStatus.PENDING_CANCEL:
      return 'yellow'
    case PaymentGroupStatus.PENDING_PAYMENT:
      return 'yellow'
  }
}
