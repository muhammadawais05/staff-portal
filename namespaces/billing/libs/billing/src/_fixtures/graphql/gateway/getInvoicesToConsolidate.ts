import InvoiceList from './invoiceList'

export default {
  invoices: {
    __typename: 'InvoicesConnection',
    downloadXlsxUrl:
      'http://localhost:3000/platform/staff/invoices/download_from_search?company_ids%5B%5D=1897991&logic=and',
    groups: [
      {
        __typename: 'InvoiceGroup',
        invoices: InvoiceList.invoices.groups[0].invoices
      }
    ]
  },
  availableBillingTerms: {
    __typename: 'Client',
    id: 'VjEtQ2xpZW50LTQxNjQ0Mw',
    netTerms: 45,
    fullName: 'Schinner, Heller and Romaguera',
    availableNetTerms: [0, 10, 15, 30, 45, 60]
  }
}
