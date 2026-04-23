import { camelCase } from 'lodash-es'
import { DocumentStatus, Client, Invoice } from '@staff-portal/graphql/staff'
import i18n from '@staff-portal/billing/src/utils/i18n'

const INVOICE_AMOUNT_TOOLTIP_STATUSES = [
  DocumentStatus.OUTSTANDING,
  DocumentStatus.OVERDUE,
  DocumentStatus.PENDING_RECEIPT
]

interface GetInvoiceAmountTooltipText
  extends Pick<
    Invoice,
    'discountedAmount' | 'partiallyPaid' | 'discountApplied' | 'status'
  > {
  subjectObject?: Pick<Client, 'preferredBillingOption' | 'webResource'>
}

export const getInvoiceAmountTooltipText = ({
  discountApplied,
  discountedAmount = '0',
  status,
  subjectObject,
  partiallyPaid
}: GetInvoiceAmountTooltipText) => {
  if (!subjectObject) {
    return null
  }

  const { preferredBillingOption } = subjectObject

  const shouldDisplayInvoiceTooltip =
    discountApplied &&
    preferredBillingOption &&
    INVOICE_AMOUNT_TOOLTIP_STATUSES.includes(status)

  if (!shouldDisplayInvoiceTooltip || !preferredBillingOption) {
    return null
  }

  const { discountable, discountValue, billingMethod } = preferredBillingOption

  const translationVars = {
    discount: discountValue,
    preferredBillingOption: i18n.t(`paymentMethod:${camelCase(billingMethod)}`),
    rate: Number(discountedAmount).toFixed(2)
  }

  return i18n.t(
    `invoice:invoiceDetails.tooltips.${
      partiallyPaid ? 'partialAmount' : 'fullAmount'
    }.${discountable ? 'discountedPreferred' : 'undiscountedPreferred'}`,
    translationVars
  )
}
