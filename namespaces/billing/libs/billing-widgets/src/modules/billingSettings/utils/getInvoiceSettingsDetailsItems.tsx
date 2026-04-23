import i18n from '@staff-portal/billing/src/utils/i18n'

const baseKey = 'billingSettings:invoice.fields'

const InvoiceSettingsDetailsItems = () => {
  return [
    {
      label: i18n.t(`${baseKey}.nextPurchaseOrder.label`),
      value: ''
    },
    {
      label: i18n.t(`${baseKey}.addTimesheetToInvoice.label`),
      value: ''
    }
  ]
}

export default InvoiceSettingsDetailsItems
