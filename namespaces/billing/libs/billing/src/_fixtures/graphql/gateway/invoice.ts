import Memorandum from './memorandum'
import mockTransfers from './getTransfers'
import mockClient from './client'
import mockMemorandumCategories from './memorandumCategories'

export default {
  __typename: 'Invoice',
  actionDueOn: null,
  amount: '2295.0',
  amountWithCorrections: '2295.0',
  associatedMemorandums: {
    __typename: 'MemorandumConnection',
    nodes: [Memorandum]
  },
  balanceDue: '2295.0',
  billingCycleGid: 'gid://platform/Billing::Cycle/398725',
  billingCycle: {
    __typename: 'BillingCycle',
    startDate: '2020-07-21',
    endDate: '2021-07-21',
    hours: '10',
    originalCommitment: {
      __typename: 'Commitment',
      availability: 'full_time'
    },
    actualCommitment: {
      __typename: 'Commitment',
      availability: 'full_time'
    }
  },
  cleanAmountToPay: '2295.0',
  historyLink: {
    __typename: 'Link',
    url: 'example'
  },
  cleanOutstandingAmount: '2295.0',
  expectedClearanceDateForNewPendingReceipt: '2020-03-30',
  listedAmount: '2295.0',
  hasPendingCharges: false,
  longDescription: 'Long description',
  processingDate: '2020-12-04',
  statusComment: 'test comment',
  range: {
    __typename: 'BigDecimalRange',
    from: '2015-05-05',
    till: '2015-06-06'
  },
  client: {
    __typename: 'Client',
    billingNotes: '',
    billingOptions: {
      __typename: 'BillingOptionInterfaceConnection',
      nodes: [],
      totalCount: 0
    },
    fullName: 'Some company',
    preferredBillingOption: null
  },
  transfers: mockTransfers,
  commissionable: true,
  consolidatedDocument: {
    __typename: 'Invoice',
    amount: '25627.5',
    billingCycleGid: null,
    createdOn: '2020-01-20',
    creditedAmount: '0',
    debitedAmount: '0',
    description: 'Consolidated invoice from Dec 1 - Jan 4',
    documentNumber: 380600,
    dueDate: '2020-02-19',
    id: 'VjEtSW52b2ljZS0zODA2MDA',
    paidAmount: '0',
    status: 'DISPUTED',
    transfers: { __typename: 'TransferConnection', nodes: [] },
    url: 'http://localhost:3000/platform/staff/invoices/380600',
    webResource: {
      __typename: 'Link',
      text: 'Invoice #380600',
      url: 'http://localhost:3000/platform/staff/invoices/380600'
    }
  },
  consolidatedInvoice: {
    __typename: 'Invoice',
    id: 'VjEtSW52b2ljZS0zODA2MDA',
    webResource: {
      __typename: 'Link',
      text: 'Invoice #380600',
      url: 'http://localhost:3000/platform/staff/invoices/380600'
    }
  },
  createdOn: '2020-01-07',
  creditedAmount: '0',
  debitedAmount: '0',
  description:
    'Hourly services from Hugh Wimberly for [Enterprise] Data Engineering Architect from December 29, 2019 to January 4, 2020. 15 hours of work billed.',
  discountApplied: false,
  discountedAmount: '2295.0',
  discountedAmountToPay: '2295.0',
  documentNote: null,
  documentNumber: 377249,
  downloadHtmlUrl:
    'http://localhost:3000/platform/staff/invoices/430334/download',
  downloadPdfUrl:
    'http://localhost:3000/platform/staff/invoices/430334/download.pdf',
  dueDate: '2020-02-06',
  duePeriod: 30,
  exceedsPurchaseOrderBalance: false,
  gid: 'gid://platform/Invoice/377249',
  id: 'VjEtSW52b2ljZS0zNzcyNDk',
  issueDate: '2020-01-07',
  reason: {
    __typename: 'Engagement',
    id: 'VjEtRW5nYWdlbWVudC0zNzcyNDk=',
    endDate: '2020-02-06',
    placementFees: null,
    purchaseOrder: null
  },
  job: {
    __typename: 'Job',
    cumulativeStatus: 'ACTIVE',
    currentEngagement: null,
    currentInvestigation: null, // { __typename: 'Investigation', startedAt: '2020-02-13' },
    engagementEndedFeedbackReason: {
      __typename: 'FeedbackReason',
      id: '123456',
      identifier: 'abcd',
      name: 'engagement ended feedback reason name'
    },
    hiredCount: 1,
    id: 'VjEtSm9iLTE0NTU0NA',
    matcherCallScheduled: false,
    purchaseOrders: {
      __typename: 'PurchaseOrderConnection',
      nodes: [
        {
          __typename: 'PurchaseOrder',
          draftedAmount: '0.0',
          archived: false,
          budgetSpent: false,
          client: mockClient,
          expiryDate: '2020-02-27',
          id: 'VyY2hhc2VPcmRlci0xNzIyVjEtUH',
          invoicedAmount: '0',
          notes: null,
          number: 1722,
          operations: {
            __typename: 'PurchaseOrderOperations',
            assignPurchaseOrderLine: {
              __typename: 'Operation',
              callable: 'ENABLED',
              messages: []
            },
            archivePurchaseOrder: {
              __typename: 'Operation',
              callable: 'ENABLED',
              messages: []
            },
            createPurchaseOrder: {
              __typename: 'Operation',
              callable: 'ENABLED',
              messages: []
            },
            unarchivePurchaseOrder: {
              __typename: 'Operation',
              callable: 'ENABLED',
              messages: []
            },
            updatePurchaseOrder: {
              __typename: 'Operation',
              callable: 'ENABLED',
              messages: []
            }
          },
          totalAmount: '5555.0',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #380600',
            url: 'http://localhost:3000/platform/staff/invoices/380600'
          }
        },
        {
          __typename: 'PurchaseOrder',
          draftedAmount: '0.0',
          archived: false,
          budgetSpent: true,
          client: mockClient,
          expiryDate: '2020-02-27',
          id: 'lci0xNzIyVjEtUHVyY2hhc2VPcmR',
          invoicedAmount: '1400',
          notes: null,
          number: 1722,
          operations: {
            __typename: 'PurchaseOrderOperations',
            archivePurchaseOrder: {
              __typename: 'Operation',
              callable: 'ENABLED',
              messages: []
            },
            createPurchaseOrder: {
              __typename: 'Operation',
              callable: 'ENABLED',
              messages: []
            },
            unarchivePurchaseOrder: {
              __typename: 'Operation',
              callable: 'ENABLED',
              messages: []
            },
            updatePurchaseOrder: {
              __typename: 'Operation',
              callable: 'ENABLED',
              messages: []
            }
          },
          totalAmount: '1400',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #380600',
            url: 'http://localhost:3000/platform/staff/invoices/380600'
          }
        }
      ]
    },
    purchaseOrder: null,
    purchaseOrderLine: null,
    nextPurchaseOrder: null,
    status: 'ACTIVE',
    talentCount: 0,
    title: 'Job title',
    webResource: {
      __typename: 'Link',
      text: 'Job title link text',
      url: 'http://localhost:3000/platform/staff/jobs/196075'
    }
  },
  invoiceKind: 'COMPANY_BILL',
  unconsolidated: false,
  lastStatusChangeAt: '2020-01-07T16:28:01-05:00',
  memorandumCategories: mockMemorandumCategories,
  memorandums: {
    __typename: 'MemorandumConnection',
    nodes: [Memorandum]
  },
  notes: {
    __typename: 'NoteConnection',
    nodes: [
      {
        __typename: 'Note',
        answers: { __typename: 'NoteAnswerConnection', nodes: [] },
        attachment: {
          __typename: 'NoteAttachment',
          identifier: 'example text document',
          url: 'example.com/index.tsx',
          webResource: {
            text: 'example text document',
            url: 'example.com/index.tsx',
            __typename: 'Link'
          }
        },
        comment: 'Awesome comment',
        createdAt: '2020-04-21T05:47:01-04:00',
        creator: {
          __typename: 'Staff',
          email: 'example@example.com',
          fullName: 'Thad Walter',
          id: 'VjEtU3RhZmYtMTMxMTU2Nw',
          webResource: {
            text: 'Thad Walter',
            url: 'https://staging.toptal.net/platform/staff/staff/1649121',
            __typename: 'Link'
          }
        },
        id: 'VjEtTm90ZS0xMDUzODU0',
        newSalesCall: false,
        checklistSalesCall: false,
        operations: {
          __typename: 'NoteOperations',
          removeNote: {
            __typename: 'Operation',
            callable: 'ENABLED',
            messages: []
          },
          removeNoteAttachment: {
            __typename: 'Operation',
            callable: 'ENABLED',
            messages: []
          },
          updateNote: {
            __typename: 'Operation',
            callable: 'ENABLED',
            messages: []
          }
        },
        screeningCall: false,
        title: 'Awesome title',
        updatedAt: '2020-04-21T05:47:01-04:00'
      },
      {
        __typename: 'Note',
        answers: { __typename: 'NoteAnswerConnection', nodes: [] },
        attachment: null,
        comment: 'asdfdsafdsafadssdf',
        createdAt: '2020-04-21T02:43:44-04:00',
        creator: {
          __typename: 'Staff',
          fullName: 'Thad Walter',
          id: 'VjEtU3RhZmYtMTMxMTU2Nw',
          webResource: {
            text: 'Thad Walter',
            url: 'https://staging.toptal.net/platform/staff/staff/1649121',
            __typename: 'Link'
          }
        },
        id: 'VjEtTm90ZS0xMDUzODQ5',
        newSalesCall: false,
        checklistSalesCall: false,
        operations: {
          __typename: 'NoteOperations',
          removeNote: {
            __typename: 'Operation',
            callable: 'ENABLED',
            messages: []
          },
          removeNoteAttachment: {
            __typename: 'Operation',
            callable: 'ENABLED',
            messages: []
          },
          updateNote: {
            __typename: 'Operation',
            callable: 'ENABLED',
            messages: []
          }
        },
        screeningCall: false,
        title: 'safasdfdsafdasfa',
        updatedAt: '2020-04-21T02:43:44-04:00'
      },
      {
        __typename: 'Note',
        answers: { __typename: 'NoteAnswerConnection', nodes: [] },
        attachment: null,
        comment: 'dsfgsdgdgdsgdsg',
        createdAt: '2020-04-20T02:19:01-04:00',
        creator: {
          __typename: 'Staff',
          fullName: 'Thad Walter',
          id: 'VjEtU3RhZmYtMTMxMTU2Nw',
          webResource: {
            text: 'Thad Walter',
            url: 'https://staging.toptal.net/platform/staff/staff/1649121',
            __typename: 'Link'
          }
        },
        id: 'VjEtTm90ZS0xMDUzODQz',
        newSalesCall: false,
        checklistSalesCall: false,
        operations: {
          __typename: 'NoteOperations',
          removeNote: {
            __typename: 'Operation',
            callable: 'ENABLED',
            messages: []
          },
          removeNoteAttachment: {
            __typename: 'Operation',
            callable: 'ENABLED',
            messages: []
          },
          updateNote: {
            __typename: 'Operation',
            callable: 'ENABLED',
            messages: []
          }
        },
        screeningCall: false,
        title: 'dsfgdsfgdsfg',
        updatedAt: '2020-04-20T02:19:01-04:00'
      },
      {
        __typename: 'Note',
        answers: { __typename: 'NoteAnswerConnection', nodes: [] },
        attachment: null,
        comment: '123445 dasdsasassssss',
        createdAt: '2020-04-20T01:30:21-04:00',
        creator: {
          __typename: 'Staff',
          fullName: 'Thad Walter',
          id: 'VjEtU3RhZmYtMTMxMTU2Nw',
          webResource: {
            text: 'Thad Walter',
            url: 'https://staging.toptal.net/platform/staff/staff/1649121',
            __typename: 'Link'
          }
        },
        id: 'VjEtTm90ZS0xMDUzODQx',
        newSalesCall: false,
        checklistSalesCall: false,
        operations: {
          __typename: 'NoteOperations',
          removeNote: {
            __typename: 'Operation',
            callable: 'ENABLED',
            messages: []
          },
          removeNoteAttachment: {
            __typename: 'Operation',
            callable: 'ENABLED',
            messages: []
          },
          updateNote: {
            __typename: 'Operation',
            callable: 'ENABLED',
            messages: []
          }
        },
        screeningCall: false,
        title: 'vbbbbbbb',
        updatedAt: '2020-04-21T05:52:46-04:00'
      }
    ],
    operations: {
      __typename: 'NoteConnectionOperations',
      createNote: { __typename: 'Operation', callable: 'ENABLED', messages: [] }
    }
  },
  operations: {
    __typename: 'InvoiceOperations',
    addDocumentNote: {
      __typename: 'Operation',
      callable: 'ENABLED',
      messages: []
    },
    editDocumentNote: {
      __typename: 'Operation',
      callable: 'HIDDEN',
      messages: []
    },
    addMemorandumToCommercialDocument: {
      __typename: 'Operation',
      callable: 'DISABLED',
      messages: [
        'A memorandum cannot be issued for an original invoice. Do this through the consolidate invoice.'
      ]
    },
    applyPrepayments: {
      __typename: 'Operation',
      callable: 'ENABLED',
      messages: []
    },
    applyPromotions: {
      __typename: 'Operation',
      callable: 'HIDDEN',
      messages: []
    },
    applyUnallocatedMemorandumsToCommercialDocument: {
      __typename: 'Operation',
      callable: 'HIDDEN',
      messages: []
    },
    assignPurchaseOrder: {
      __typename: 'Operation',
      callable: 'ENABLED',
      messages: []
    },
    assignPurchaseOrderLine: {
      __typename: 'Operation',
      callable: 'ENABLED',
      messages: []
    },
    cancelTransfer: {
      __typename: 'Operation',
      callable: 'ENABLED',
      messages: []
    },
    collectBadDebtInvoice: {
      __typename: 'Operation',
      callable: 'HIDDEN',
      messages: []
    },
    createTransferInvoice: {
      __typename: 'Operation',
      callable: 'ENABLED',
      messages: []
    },
    disputeTalentPayments: {
      __typename: 'Operation',
      callable: 'ENABLED',
      messages: []
    },
    recordBadDebt: {
      __typename: 'Operation',
      callable: 'HIDDEN',
      messages: []
    },
    disputeCommercialDocument: {
      __typename: 'Operation',
      callable: 'ENABLED',
      messages: []
    },
    resolveDisputeOfCommercialDocument: {
      __typename: 'Operation',
      callable: 'ENABLED',
      messages: []
    },
    unconsolidate: {
      __typename: 'Operation',
      callable: 'ENABLED',
      messages: []
    },
    updateDispute: {
      __typename: 'Operation',
      callable: 'ENABLED',
      messages: []
    },
    updateCommercialDocumentDueDate: {
      __typename: 'Operation',
      callable: 'ENABLED',
      messages: []
    },
    updateIssueDate: {
      __typename: 'Operation',
      callable: 'ENABLED',
      messages: []
    },
    writeOff: {
      __typename: 'Operation',
      callable: 'ENABLED',
      messages: []
    }
  },
  originalAmount: '2295.0',
  originalBillingCycle: {
    __typename: 'OriginalBillingCycle',
    availability: 'HOURLY',
    breaks: {
      __typename: 'OriginalBillingCycleBreak',
      breaksPeriod: [],
      totalCount: 0
    },
    endDate: '2020-01-04',
    hours: '15.0',
    startDate: '2019-12-29'
  },
  originalInvoices: { __typename: 'InvoiceConnection', nodes: [] },
  paidAmount: '0',
  paidAt: null,
  partiallyPaid: false,
  pendingTalentPayments: true,
  purchaseOrder: {
    __typename: 'PurchaseOrder',
    draftedAmount: '0.0',
    archived: false,
    budgetLeft: '100.0',
    budgetSpent: false,
    client: mockClient,
    expiryDate: '2020-02-23',
    id: 'HVyY2hhc2VPcmRlci0xNzIyVjEtU',
    invoicedAmount: '0',
    notes: null,
    number: 1724,
    operations: {
      __typename: 'PurchaseOrderOperations',
      archivePurchaseOrder: {
        __typename: 'Operation',
        callable: 'ENABLED',
        messages: []
      },
      createPurchaseOrder: {
        __typename: 'Operation',
        callable: 'ENABLED',
        messages: []
      },
      unarchivePurchaseOrder: {
        __typename: 'Operation',
        callable: 'ENABLED',
        messages: []
      },
      updatePurchaseOrder: {
        __typename: 'Operation',
        callable: 'ENABLED',
        messages: []
      }
    },
    poNumber: 'PO-1724',
    threshold: '200.0',
    totalAmount: '35555.0',
    webResource: {
      __typename: 'Link',
      text: 'Invoice #380600',
      url: 'http://localhost:3000/platform/staff/invoices/380600'
    }
  },
  purchaseOrderLine: null,
  status: 'DISPUTED',
  subjectObject: {
    __typename: 'Client',
    availablePrepaymentBalance: '0.0',
    hierarchy: {
      __typename: 'ClientHierarchy',
      clients: {
        __typename: 'ClientHierarchyClientsConnection',
        nodes: [
          {
            __typename: 'Client',
            id: 'VjEtQ2xpZW50LTk3NTA4',
            _companyId: 451207,
            fullName: 'Keeling-Emard SH',
            unappliedCashBalance: '0',
            unappliedCashEntries: {
              totalCount: 0,
              nodes: []
            }
          },
          {
            __typename: 'Client',
            id: 'VjEtQ2xpZW50LTQ5Mjk3OA',
            _companyId: 2325393,
            fullName: 'Runolfsson, Heaney and Mraz',
            unappliedCashBalance: '350.0',
            unappliedCashEntries: {
              nodes: [
                {
                  __typename: 'UnappliedCash',
                  id: 'VjEtVW5hcHBsaWVkQ2FzaC0xMjQ',
                  effectiveDate: '2022-04-21',
                  availableAmount: '100.0'
                },
                {
                  __typename: 'UnappliedCash',
                  id: 'VjEtVW5hcHBsaWVkQ2FzaC0xMjY',
                  effectiveDate: '2022-04-21',
                  availableAmount: '250.0'
                }
              ]
            }
          },
          {
            __typename: 'Client',
            id: 'VjEtQ2xpZW50LTk5NTIx',
            _companyId: 486828,
            fullName: 'Jewess, Corkery and Carroll',
            unappliedCashBalance: '15000.0',
            unappliedCashEntries: {
              totalCount: 1,
              nodes: [
                {
                  __typename: 'UnappliedCash',
                  id: 'VjEtVW5hcHBsaWVkQ2FzaC0xMjU',
                  effectiveDate: '2022-04-21',
                  availableAmount: '15000.0'
                }
              ]
            }
          },
          {
            __typename: 'Client',
            id: 'VjEtQ2xpZW50LTE3NzQ3OQ',
            _companyId: 723859,
            fullName: 'Carter-Schinner PB',
            unappliedCashBalance: '0',
            unappliedCashEntries: {
              totalCount: 0,
              nodes: []
            }
          }
        ]
      }
    },
    billingNotes: 'Billing notes example',
    billingOptions: {
      __typename: 'BillingOptionInterfaceConnection',
      nodes: [],
      totalCount: 0
    },
    claimer: {
      __typename: 'Staff',
      fullName: 'Michael Savva',
      id: 'VjEtU3RhZmYtMTcxNzY1Nw',
      webResource: {
        __typename: 'Link',
        text: 'Michael Savva',
        url: 'http://localhost:3000/platform/staff/staff/1717657'
      }
    },
    country: {
      __typename: 'Country',
      id: 'VjEtQ291bnRyeS0yMzQ',
      name: 'United States'
    },
    financeTeamMember: {
      __typename: 'Staff',
      id: 'financeTeamMemberId',
      webResource: {
        __typename: 'Link',
        text: 'Gaby Woolf',
        url: 'http://localhost:3000/platform/staff/staff/763558' // if null, then 'text' should be 'Unassigned'
      }
    },
    fullName: 'Thad Walter',
    id: 'VjEtQ2xpZW50LTM0NTI0Mw',
    matchers: {
      __typename: 'ClientMatcherConnection',
      nodes: [
        {
          __typename: 'ClientMatcher',
          id: 'VjEtQ2xpZW50TWF0Y2hlci02MzkwMA',
          role: {
            __typename: 'Staff',
            fullName: 'Raymond Sharma',
            id: 'VjEtU3RhZmYtMTQzOTcxOQ',
            webResource: {
              __typename: 'Link',
              text: 'Raymond Sharma',
              url: 'http://localhost:3000/platform/staff/staff/1439719'
            }
          },
          vertical: {
            __typename: 'Vertical',
            id: 'VjEtVmVydGljYWwtMg',
            talentType: 'designer'
          }
        },
        {
          __typename: 'ClientMatcher',
          id: 'VjEtQ2xpZW50TWF0Y2hlci02NDIxNQ',
          role: {
            __typename: 'Staff',
            fullName: 'Ramiro Agustin Palacios',
            id: 'VjEtU3RhZmYtMTUzNDA2',
            webResource: {
              __typename: 'Link',
              text: 'Ramiro Agustin Palacios',
              url: 'http://localhost:3000/platform/staff/staff/153406'
            }
          },
          vertical: {
            __typename: 'Vertical',
            id: 'VjEtVmVydGljYWwtMQ',
            talentType: 'developer'
          }
        },
        {
          __typename: 'ClientMatcher',
          id: 'VjEtQ2xpZW50TWF0Y2hlci02MzQ5Ng',
          role: {
            __typename: 'Staff',
            fullName: 'Carolina Della Corte',
            id: 'VjEtU3RhZmYtMTY2NDI4OA',
            webResource: {
              __typename: 'Link',
              text: 'Carolina Della Corte',
              url: 'http://localhost:3000/platform/staff/staff/1664288'
            }
          },
          vertical: {
            __typename: 'Vertical',
            id: 'VjEtVmVydGljYWwtOQ',
            talentType: 'product_manager'
          }
        },
        {
          __typename: 'ClientMatcher',
          id: 'VjEtQ2xpZW50TWF0Y2hlci02MzQ5NQ',
          role: {
            __typename: 'Staff',
            fullName: 'Carolina Della Corte',
            id: 'VjEtU3RhZmYtMTY2NDI4OA',
            webResource: {
              __typename: 'Link',
              text: 'Carolina Della Corte',
              url: 'http://localhost:3000/platform/staff/staff/1664288'
            }
          },
          vertical: {
            __typename: 'Vertical',
            id: 'VjEtVmVydGljYWwtOA',
            talentType: 'project_manager'
          }
        }
      ]
    },
    preferredBillingOption: null,
    purchaseOrders: {
      __typename: 'PurchaseOrderConnection',
      nodes: [
        {
          __typename: 'PurchaseOrder',
          draftedAmount: '0.0',
          archived: false,
          budgetLeft: '100.0',
          budgetSpent: false,
          client: mockClient,
          expiryDate: '2020-02-23',
          id: 'VjEtUHVyY2hhc2VPcmRlci0xNzI0',
          invoicedAmount: '0',
          notes: null,
          number: 1724,
          operations: {
            __typename: 'PurchaseOrderOperations',
            archivePurchaseOrder: {
              __typename: 'Operation',
              callable: 'ENABLED',
              messages: []
            },
            createPurchaseOrder: {
              __typename: 'Operation',
              callable: 'ENABLED',
              messages: []
            },
            unarchivePurchaseOrder: {
              __typename: 'Operation',
              callable: 'ENABLED',
              messages: []
            },
            updatePurchaseOrder: {
              __typename: 'Operation',
              callable: 'ENABLED',
              messages: []
            }
          },
          poNumber: 'PO-1724',
          threshold: '200.0',
          totalAmount: '35555.0',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #380600',
            url: 'http://localhost:3000/platform/staff/invoices/380600'
          }
        }
      ]
    },
    unallocatedMemorandums: {
      __typename: 'MemorandumConnection',
      nodes: [Memorandum]
    },
    purchaseOrdersNullable: {
      __typename: 'PurchaseOrdersNullableConnection',
      nodes: [
        {
          __typename: 'PurchaseOrder',
          draftedAmount: '0.0',
          archived: false,
          budgetLeft: '100.0',
          budgetSpent: false,
          client: mockClient,
          expiryDate: '2020-02-23',
          id: 'VjEtUHVyY2hhc2VPcmRlci0xNzI0',
          invoicedAmount: '0',
          notes: null,
          number: 1724,
          operations: {
            __typename: 'PurchaseOrderOperations',
            archivePurchaseOrder: {
              __typename: 'Operation',
              callable: 'ENABLED',
              messages: []
            },
            createPurchaseOrder: {
              __typename: 'Operation',
              callable: 'ENABLED',
              messages: []
            },
            unarchivePurchaseOrder: {
              __typename: 'Operation',
              callable: 'ENABLED',
              messages: []
            },
            updatePurchaseOrder: {
              __typename: 'Operation',
              callable: 'ENABLED',
              messages: []
            }
          },
          poNumber: 'PO-1724',
          threshold: '200.0',
          totalAmount: '35555.0',
          webResource: {
            __typename: 'Link',
            text: 'Invoice #380600',
            url: 'http://localhost:3000/platform/staff/invoices/380600'
          }
        }
      ]
    },
    webResource: {
      __typename: 'Link',
      text: 'Wolf, Rath and Effertz',
      url: 'http://localhost:3000/platform/staff/companies/1575810'
    }
  },
  talent: {
    __typename: 'Talent',
    fullName: 'Bertie Davis',
    id: 'MISSING',
    webResource: {
      __typename: 'Link',
      text: 'Bertie Davis',
      url: 'http://localhost:3000/platform/staff/talents/829381'
    }
  },
  webResource: {
    __typename: 'Link',
    text: 'Invoice #377249',
    url: 'http://localhost:3000/platform/staff/invoices/377249'
  }
}
