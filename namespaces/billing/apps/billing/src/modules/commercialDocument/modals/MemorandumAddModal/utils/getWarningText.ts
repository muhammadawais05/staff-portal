import { InvoiceKind, DocumentStatus } from '@staff-portal/graphql/staff'
import { decodeRawIdAndType } from '@staff-portal/billing/src/_lib/helpers/apollo'

import { PENDING_TO_PAY_STATUSES } from '../../../../invoice/utils'

interface Props {
  status: DocumentStatus
  id: string
  invoiceKind?: InvoiceKind
}

export const getWarningText = ({
  status,
  id,
  invoiceKind
}: Partial<Props> = {}) => {
  if (!id) {
    return null
  }
  const { type } = decodeRawIdAndType(id)
  const invoiceIsNotPending =
    type === 'invoice' && (!status || !PENDING_TO_PAY_STATUSES.includes(status))
  const paymentIsPaid = type === 'payment' && status === DocumentStatus.PAID

  if (invoiceKind === InvoiceKind.COMPANY_DEPOSIT) {
    return 'depositCorrection'
  }

  if (invoiceKind === InvoiceKind.CONSOLIDATED && !invoiceIsNotPending) {
    return 'willBeAllocatedToConsolidatedInvoice'
  }

  if (invoiceIsNotPending) {
    return `willNotBeAllocatedInvoice`
  }

  if (paymentIsPaid) {
    return `willNotBeAllocatedPayment`
  }

  return undefined
}
