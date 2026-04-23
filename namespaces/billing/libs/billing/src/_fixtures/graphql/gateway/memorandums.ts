export default {
  __typename: 'MemorandumsConnection',
  totalCount: 199412,
  nodes: [
    {
      allocated: false,
      allocatedAt: null,
      amount: '123.0',
      amountDue: '123.0',
      balance: 'CREDIT',
      category: {
        credit: null,
        debit: null,
        id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTQ4',
        name: 'End date',
        __typename: 'MemorandumCategory'
      },
      portions: [],
      depositCorrection: false,
      description: 'Revert debit memorandum #203951.',
      document: null,
      downloadHtmlUrl:
        'https://staging.toptal.net/platform/memos/203963/download',
      downloadPdfUrl:
        'https://staging.toptal.net/platform/memos/203963/download.pdf',
      id: 'VjEtTWVtb3JhbmR1bS0yMDM5NjM',
      number: 203963,
      operations: {
        revertInvoicePrepayments: {
          callable: 'HIDDEN',
          messages: [],
          __typename: 'Operation'
        },
        revertCommercialDocumentMemorandum: {
          callable: 'HIDDEN',
          messages: [],
          __typename: 'Operation'
        },
        revertRoleMemorandum: {
          callable: 'DISABLED',
          messages: ['The memorandum is reverting another memo.'],
          __typename: 'Operation'
        },
        __typename: 'MemorandumOperations'
      },
      __typename: 'Memorandum',
      createdOn: '2020-12-07T11:08:15+03:00',
      receiver: {
        __typename: 'Client',
        id: 'VjEtQ2xpZW50LTMzODEyOA',
        fullName: 'Prohaska, Abbott and Hoppe',
        webResource: {
          text: 'Prohaska, Abbott and Hoppe',
          url: 'https://staging.toptal.net/platform/staff/companies/1545223',
          __typename: 'Link'
        }
      }
    },
    {
      allocated: true,
      allocatedAt: '2020-12-07T10:47:47+03:00',
      amount: '2816.0',
      amountDue: '2816.0',
      balance: 'CREDIT',
      category: {
        credit: null,
        debit: null,
        id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTgw',
        name: 'Prepayment credit',
        __typename: 'MemorandumCategory'
      },
      portions: [],
      depositCorrection: false,
      description: 'Credit from deposit',
      document: {
        id: 'VjEtSW52b2ljZS00NzQwMTE',
        documentNumber: 474011,
        invoiceKind: 'COMPANY_BILL',
        subjectObject: {
          fullName: 'Kreiger, Dare and Johns',
          id: 'VjEtQ2xpZW50LTE1NDI4MQ',
          __typename: 'Client'
        },
        webResource: {
          text: 'Invoice #474011',
          url: 'https://staging.toptal.net/platform/staff/invoices/474011',
          __typename: 'Link'
        },
        __typename: 'Invoice'
      },
      downloadHtmlUrl:
        'https://staging.toptal.net/platform/memos/203962/download',
      downloadPdfUrl:
        'https://staging.toptal.net/platform/memos/203962/download.pdf',
      id: 'VjEtTWVtb3JhbmR1bS0yMDM5NjI',
      number: 203962,
      operations: {
        revertInvoicePrepayments: {
          callable: 'ENABLED',
          messages: [],
          __typename: 'Operation'
        },
        revertCommercialDocumentMemorandum: {
          callable: 'DISABLED',
          messages: ['This kind of memorandum cannot be reverted.'],
          __typename: 'Operation'
        },
        revertRoleMemorandum: {
          callable: 'DISABLED',
          messages: [
            'This kind of memorandum cannot be reverted.',
            'Allocated memorandum cannot be reverted by this action.'
          ],
          __typename: 'Operation'
        },
        __typename: 'MemorandumOperations'
      },
      __typename: 'Memorandum',
      createdOn: '2020-12-07T10:47:47+03:00',
      receiver: {
        __typename: 'Client',
        id: 'VjEtQ2xpZW50LTE1NDI4MQ',
        fullName: 'Kreiger, Dare and Johns',
        webResource: {
          text: 'Kreiger, Dare and Johns',
          url: 'https://staging.toptal.net/platform/staff/companies/654871',
          __typename: 'Link'
        }
      }
    },
    {
      allocated: true,
      allocatedAt: '2020-12-07T10:46:16+03:00',
      amount: '1489.92',
      amountDue: '1489.92',
      balance: 'CREDIT',
      category: {
        credit: null,
        debit: null,
        id: 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTgw',
        name: 'Prepayment credit',
        __typename: 'MemorandumCategory'
      },
      portions: [],
      depositCorrection: false,
      description: 'Credit from deposit',
      document: {
        id: 'VjEtSW52b2ljZS00NzM4OTA',
        documentNumber: 473890,
        invoiceKind: 'COMPANY_BILL',
        subjectObject: {
          fullName: 'White, Considine and Gleason',
          id: 'VjEtQ2xpZW50LTQ1MTU5',
          __typename: 'Client'
        },
        webResource: {
          text: 'Invoice #473890',
          url: 'https://staging.toptal.net/platform/staff/invoices/473890',
          __typename: 'Link'
        },
        __typename: 'Invoice'
      },
      downloadHtmlUrl:
        'https://staging.toptal.net/platform/memos/203960/download',
      downloadPdfUrl:
        'https://staging.toptal.net/platform/memos/203960/download.pdf',
      id: 'VjEtTWVtb3JhbmR1bS0yMDM5NjA',
      number: 203960,
      operations: {
        revertInvoicePrepayments: {
          callable: 'ENABLED',
          messages: [],
          __typename: 'Operation'
        },
        revertCommercialDocumentMemorandum: {
          callable: 'DISABLED',
          messages: ['This kind of memorandum cannot be reverted.'],
          __typename: 'Operation'
        },
        revertRoleMemorandum: {
          callable: 'DISABLED',
          messages: [
            'This kind of memorandum cannot be reverted.',
            'Allocated memorandum cannot be reverted by this action.'
          ],
          __typename: 'Operation'
        },
        __typename: 'MemorandumOperations'
      },
      __typename: 'Memorandum',
      createdOn: '2020-12-07T10:46:16+03:00',
      receiver: {
        __typename: 'Client',
        id: 'VjEtQ2xpZW50LTQ1MTU5',
        fullName: 'White, Considine and Gleason',
        webResource: {
          text: 'White, Considine and Gleason',
          url: 'https://staging.toptal.net/platform/staff/companies/301641',
          __typename: 'Link'
        }
      }
    }
  ]
}
