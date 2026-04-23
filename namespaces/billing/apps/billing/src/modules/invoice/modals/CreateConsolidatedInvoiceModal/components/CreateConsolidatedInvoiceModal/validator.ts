import { AnyObject, FORM_ERROR } from '@toptal/picasso-forms'
import { ConsolidateInvoicesInput } from '@staff-portal/graphql/staff'
import i18n from '@staff-portal/billing/src/utils/i18n'

const validator = (values: AnyObject) => {
  const { invoiceIds } = values as ConsolidateInvoicesInput

  return invoiceIds?.length > 1
    ? {}
    : {
        [FORM_ERROR]: i18n.t(
          'invoiceList:modals.createConsolidatedInvoice.error.invoices'
        )
      }
}

export default validator
