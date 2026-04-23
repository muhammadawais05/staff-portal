export default {
  node: {
    associatedMemorandums: {
      __typename: 'MemorandumConnection',
      nodes: [
        {
          __typename: 'Memorandum',
          allocated: true,
          amount: '998.4',
          amountDue: '0.0',
          balance: 'CREDIT',
          description:
            'Credit to Derron Blake for work with Dmitry Dyakonov during the billing period of April 5, 2019 to April 10, 2019 applied to invoice # 312813. (CX)',
          document: {
            __typename: 'Invoice',
            id: 'VjEtSW52b2ljZS0zNzcyNDk',
            invoiceKind: 'COMPANY_BILL'
          },
          id: 'VjEtTWVtb3JhbmR1bS0xMTI2ODM',
          number: 112683,
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
        },
        {
          __typename: 'Memorandum',
          allocated: true,
          amount: '998.4',
          amountDue: '0.0',
          balance: 'CREDIT',
          description:
            'Credit to Derron Blake for work with Dmitry Dyakonov during the billing period of April 5, 2019 to April 10, 2019 applied to invoice # 312813. (CX)',
          document: null,
          id: 'VjEtTWVtb3JhbmR1bS0xMTI1NDc',
          number: 112547,
          operations: {
            __typename: 'MemorandumOperations',
            revertInvoicePrepayments: {
              __typename: 'Operation',
              callable: 'HIDDEN',
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
          portions: [
            {
              __typename: 'Memorandum',
              document: {
                __typename: 'Invoice',
                id: 'VjEtSW52b2ljZS0zNzcyNDk',
                invoiceKind: 'COMPANY_BILL'
              },
              id: 'VjEtTWVtb3JhbmR1bS0xMTI1NDg',
              number: 112547
            },
            {
              __typename: 'Memorandum',
              document: {
                __typename: 'Invoice',
                id: 'VjEtSW52b2ljZS0zMTU5MjQ',
                invoiceKind: 'COMPANY_BILL'
              },
              id: 'VjEtTWVtb3JhbmR1bS0xMTMyMjI',
              number: 112547
            }
          ]
        }
      ]
    },
    memorandums: {
      __typename: 'MemorandumConnection',
      nodes: [
        {
          __typename: 'Memorandum',
          allocated: true,
          allocatedAt: '2020-06-08T09:03:23-04:00',
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
          depositCorrection: true,
          description: 'test',
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
          downloadHtmlUrl:
            'http://localhost:3000/platform/memos/165326/download',
          downloadPdfUrl:
            'http://localhost:3000/platform/memos/165326/download.pdf',
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
      ]
    }
  }
}
