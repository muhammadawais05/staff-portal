import { DocumentStatus } from '@staff-portal/graphql/staff'
import i18n from '@staff-portal/billing/src/utils/i18n'

import { PaymentListItemFragment } from '../../__fragments__/paymentListItemFragment.graphql.types'
import { InvoiceListItemFragment } from '../../__fragments__/invoiceListItemFragment.graphql.types'
import { isPaymentCommission } from '../../payment/utils'

type PaymentDueInput = Pick<
  PaymentListItemFragment,
  'paymentKind' | 'status' | 'paymentKind' | 'dueDate'
>
type InvoiceDueInput = Pick<
  InvoiceListItemFragment,
  'status' | 'processingDate' | 'paidAt' | 'hasPendingCharges' | 'dueDate'
>

type Input = PaymentDueInput | InvoiceDueInput

const baseTextKey = 'commercialDocument:table.row'

export const useCommercialDocumentDueMessage = (
  input: Input
): string | undefined => {
  const { dueDate, status } = input

  switch (status) {
    case DocumentStatus.PENDING_RECEIPT:
      return (input as InvoiceListItemFragment).hasPendingCharges &&
        (input as InvoiceListItemFragment).processingDate
        ? i18n.t(`${baseTextKey}.dueDate`, {
            dueDate: (input as InvoiceListItemFragment).processingDate
          })
        : undefined

    case DocumentStatus.OUTSTANDING:
      return dueDate &&
        !isPaymentCommission((input as PaymentListItemFragment).paymentKind)
        ? i18n.t(`${baseTextKey}.dueDate`, {
            dueDate: dueDate
          })
        : undefined

    case DocumentStatus.PAID:
      return (input as InvoiceListItemFragment).paidAt
        ? i18n.t(`${baseTextKey}.paidDate`, {
            dueDate: (input as InvoiceListItemFragment).paidAt
          })
        : undefined
  }
}
