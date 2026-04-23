import {
  CommercialDocument,
  Invoice,
  DocumentStatus
} from '@staff-portal/graphql/staff'
import i18n from '@staff-portal/billing/src/utils/i18n'

type InvoiceDocumentTill = Pick<Invoice, 'actionDueOn' | 'processingDate'>
type CommercialDocumentTillInput = Pick<CommercialDocument, 'status'> &
  InvoiceDocumentTill

const baseTextKey = 'commercialDocument:table.row'

export const useCommercialDocumentTillMessage = (
  args: CommercialDocumentTillInput
): string | undefined => {
  const { status } = args

  switch (status) {
    case DocumentStatus.DISPUTED:
      return (args as InvoiceDocumentTill).actionDueOn
        ? i18n.t(`${baseTextKey}.tillDate`, {
            tillDate: (args as InvoiceDocumentTill).actionDueOn
          })
        : undefined

    case DocumentStatus.PENDING_RECEIPT:
      return (args as InvoiceDocumentTill).processingDate
        ? i18n.t(`${baseTextKey}.tillDate`, {
            tillDate: (args as InvoiceDocumentTill).processingDate
          })
        : undefined
  }
}
