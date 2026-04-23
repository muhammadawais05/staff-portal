import { sumBy } from 'lodash-es'
import { useTranslation } from 'react-i18next'
import { formatAmount } from '@toptal/picasso/utils'
import {
  InvoiceKind,
  MemorandumBalance,
  Maybe
} from '@staff-portal/graphql/staff'

import { OriginalInvoicesFragment } from '../data'

export const sumByBalance = ({
  amount,
  balance
}: OriginalInvoicesFragment['nodes'][number]['associatedMemorandums']['nodes'][number]) =>
  balance === MemorandumBalance.CREDIT ? -Number(amount) : Number(amount)

export const getAdjustedInvoiceDueAmount = (
  associatedMemorandums: OriginalInvoicesFragment['nodes'][number]['associatedMemorandums']['nodes'],
  cleanOutstandingAmount?: string | null
) => {
  const totalMemosAmount: number = sumBy(associatedMemorandums, sumByBalance)

  return formatAmount({
    amount: Number(cleanOutstandingAmount || '0') + totalMemosAmount
  })
}

interface UseAdjustedOriginalInvoices {
  invoiceKind?: InvoiceKind
  originalInvoices?: Maybe<OriginalInvoicesFragment>
}

export const useAdjustedOriginalInvoices = ({
  invoiceKind,
  originalInvoices
}: UseAdjustedOriginalInvoices) => {
  const { t: translate } = useTranslation('memorandum')
  const isConsolidatedInvoice = invoiceKind === InvoiceKind.CONSOLIDATED

  if (!isConsolidatedInvoice || !originalInvoices?.nodes?.length) {
    return []
  }

  return originalInvoices?.nodes?.map(
    ({
      associatedMemorandums,
      cleanOutstandingAmount,
      documentNumber: originalDocumentNumber,
      id
    }) => ({
      text: translate('addModal.fields.originalInvoice.optionText', {
        adjustedDueAmount: getAdjustedInvoiceDueAmount(
          associatedMemorandums.nodes,
          cleanOutstandingAmount
        ),
        originalDocumentNumber
      }),
      value: id
    })
  )
}
