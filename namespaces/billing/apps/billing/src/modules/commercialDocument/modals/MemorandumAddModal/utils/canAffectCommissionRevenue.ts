import { InvoiceKind, PaymentKind } from '@staff-portal/graphql/staff'

export const canAffectCommissionRevenue = ({
  nodeType,
  commissionable,
  invoiceKind,
  paymentKind
}: {
  nodeType?: 'invoice' | 'payment'
  roleType?: string
  commissionable?: boolean
  invoiceKind?: InvoiceKind
  paymentKind?: PaymentKind
}) => {
  switch (nodeType) {
    case 'invoice':
      return commissionable || invoiceKind === InvoiceKind.CONSOLIDATED
    case 'payment':
      return paymentKind === PaymentKind.TALENT_PAYMENT
    default:
      // Minor notice: There is some logic on Platform,
      // that only users with role type `Staff` can affect commission revenue,
      // but at the same time creation of unallocated memorandums is disabled for the staff members.
      // So it's impossible to have a staff as a receiver role.
      // Because of that we stick that any memorandum that is not associated with a document could affect commissions.
      // return roleType === 'Staff'

      return true
  }
}
