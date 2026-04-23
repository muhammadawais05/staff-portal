export default {
  __typename: 'Memorandum',
  allocated: true,
  allocatedAt: '2020-06-08T09:03:23-04:00',
  createdOn: '2020-06-08T09:03:23-04:00',
  amount: '250.0',
  amountDue: '250.0',
  balance: 'CREDIT',
  category: {
    __typename: 'MemorandumCategory',
    credit:
      'The {weekly_or_hourly} rate on the engagement with {client} on {job} was updated from {old_rate} to {new_rate}. This resulted in a credit of {working_period} during the period from {date_from} to {date_to}',
    debit:
      'The {weekly_or_hourly} rate on the engagement with {client} on {job} was updated from {old_rate} to {new_rate}. This resulted in a debit of {working_period} during the period from {date_from} to {date_to}.',
    id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTE4',
    name: 'Talent rate'
  },
  receiver: {
    __typename: 'Talent',
    webResource: {
      __typename: 'Link',
      text: 'Samella Smitham',
      url: 'http://localhost:3000/platform/staff/talents/844490'
    }
  },
  depositCorrection: true,
  description: 'test',
  documentNumber: '44557898',
  document: {
    __typename: 'Invoice',
    documentNumber: 414280,
    id: 'VjEtSW52b2ljZS00MTQyODA',
    invoiceKind: 'COMPANY_DEPOSIT',
    subjectObject: {
      __typename: 'Client',
      fullName: 'John Doe',
      id: 'some_id'
    },
    webResource: {
      __typename: 'Link',
      text: 'Invoice #414280',
      url: 'http://localhost:3000/platform/staff/invoices/414280'
    }
  },
  downloadHtmlUrl: 'http://localhost:3000/platform/memos/165326/download',
  downloadPdfUrl: 'http://localhost:3000/platform/memos/165326/download.pdf',
  id: 'VjEtTWVtb3JhbmR1bS0xNjUzMjY',
  number: 165326,
  operations: {
    __typename: 'MemorandumOperations',
    revertInvoicePrepayments: {
      __typename: 'Operation',
      callable: 'ENABLED',
      messages: []
    },
    revertCommercialDocumentMemorandum: {
      __typename: 'Operation',
      callable: 'ENABLED',
      messages: []
    },
    revertRoleMemorandum: {
      __typename: 'Operation',
      callable: 'ENABLED',
      messages: []
    }
  },
  portions: []
}
