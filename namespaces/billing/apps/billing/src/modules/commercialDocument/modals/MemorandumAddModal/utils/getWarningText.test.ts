import { DocumentStatus, InvoiceKind } from '@staff-portal/graphql/staff'

import { getWarningText } from './getWarningText'

describe.each([
  [
    {
      id: 'VjEtSW52b2ljZS00NTUzNzk',
      invoiceKind: InvoiceKind.COMPANY_BILL,
      status: DocumentStatus.OUTSTANDING
    },
    undefined
  ],
  [
    {
      id: 'VjEtSW52b2ljZS00NTUzNzk',
      invoiceKind: InvoiceKind.COMPANY_BILL,
      status: DocumentStatus.OVERDUE
    },
    undefined
  ],
  [
    {
      id: 'VjEtSW52b2ljZS00NTUzNzk',
      invoiceKind: InvoiceKind.COMPANY_BILL,
      status: DocumentStatus.PAID
    },
    'willNotBeAllocatedInvoice'
  ],

  [
    {
      id: 'VjEtSW52b2ljZS00NTUzNzk',
      invoiceKind: InvoiceKind.COMPANY_FINE,
      status: DocumentStatus.PAID
    },
    'willNotBeAllocatedInvoice'
  ],

  [
    {
      id: 'VjEtSW52b2ljZS00NTUzNzk',
      invoiceKind: InvoiceKind.COMPANY_DEPOSIT,
      status: DocumentStatus.OUTSTANDING
    },
    'depositCorrection'
  ],
  [
    {
      id: 'VjEtSW52b2ljZS00NTUzNzk',
      invoiceKind: InvoiceKind.COMPANY_DEPOSIT,
      status: DocumentStatus.OVERDUE
    },
    'depositCorrection'
  ],

  [
    {
      id: 'VjEtSW52b2ljZS00NTUzNzk',
      invoiceKind: InvoiceKind.PLACEMENT_FEE,
      status: DocumentStatus.OUTSTANDING
    },
    undefined
  ],
  [
    {
      id: 'VjEtSW52b2ljZS00NTUzNzk',
      invoiceKind: InvoiceKind.PLACEMENT_FEE,
      status: DocumentStatus.PAID
    },
    'willNotBeAllocatedInvoice'
  ],

  [
    {
      id: 'VjEtSW52b2ljZS00NTUzNzk',
      invoiceKind: InvoiceKind.CONSOLIDATED,
      status: DocumentStatus.OUTSTANDING
    },
    'willBeAllocatedToConsolidatedInvoice'
  ],
  [
    {
      id: 'VjEtSW52b2ljZS00NTUzNzk',
      invoiceKind: InvoiceKind.CONSOLIDATED,
      status: DocumentStatus.OVERDUE
    },
    'willBeAllocatedToConsolidatedInvoice'
  ],
  [
    {
      id: 'VjEtSW52b2ljZS00NTUzNzk',
      invoiceKind: InvoiceKind.CONSOLIDATED,
      status: DocumentStatus.PAID
    },
    'willNotBeAllocatedInvoice'
  ],

  [
    {
      id: 'VjEtSW52b2ljZS00NTUzNzk',
      invoiceKind: InvoiceKind.TOPTAL_SERVICES_BILL,
      status: DocumentStatus.OUTSTANDING
    },
    undefined
  ],
  [
    {
      id: 'VjEtSW52b2ljZS00NTUzNzk',
      invoiceKind: InvoiceKind.TOPTAL_SERVICES_BILL,
      status: DocumentStatus.PAID
    },
    'willNotBeAllocatedInvoice'
  ],

  [
    {
      id: 'VjEtSW52b2ljZS00NTUzNzk',
      invoiceKind: InvoiceKind.EXTRA_EXPENSES,
      status: DocumentStatus.OUTSTANDING
    },
    undefined
  ],
  [
    {
      id: 'VjEtSW52b2ljZS00NTUzNzk',
      invoiceKind: InvoiceKind.EXTRA_EXPENSES,
      status: DocumentStatus.OVERDUE
    },
    undefined
  ],
  [
    {
      id: 'VjEtSW52b2ljZS00NTUzNzk',
      invoiceKind: InvoiceKind.EXTRA_EXPENSES,
      status: DocumentStatus.PAID
    },
    'willNotBeAllocatedInvoice'
  ],
  [
    { id: 'VjEtUGF5bWVudC0xMjEyNjA1', status: DocumentStatus.PAID },
    'willNotBeAllocatedPayment',
    'which means is of payment type and PAID'
  ],
  [
    { id: 'VjEtSW52b2ljZS00NTUzNzk', status: DocumentStatus.PAID },
    'willNotBeAllocatedInvoice',
    'which means is of invoice type and PAID'
  ]
] as [{ invoiceKind: InvoiceKind; status: DocumentStatus; id: string }, string][])(
  '#getWarningText',
  (mockInvoice, result, message = '') => {
    describe(`when document is ${JSON.stringify(
      mockInvoice
    )} ${message}`, () => {
      it(`returns '${result}'`, () => {
        expect(getWarningText(mockInvoice)).toEqual(result)
      })
    })
  }
)
