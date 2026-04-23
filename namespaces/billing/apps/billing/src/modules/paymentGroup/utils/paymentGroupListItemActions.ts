import { PaymentGroupOperations } from '@staff-portal/graphql/staff'

export const paymentGroupListItemActions: (
  | keyof PaymentGroupOperations
  | 'details'
)[] = ['details', 'cancelPaymentGroup']
