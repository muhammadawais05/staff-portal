/* eslint-disable max-lines */
import fixtures from '@staff-portal/billing/src/_fixtures'

import staffPortalComponentsDefault from './staffPortalComponentsDefault'
import basePageQueries from './basePageQueries'

export default {
  ...basePageQueries,
  ...staffPortalComponentsDefault,
  // Queries
  GetDocumentNote: {
    data: {
      node: {
        __typename: 'Payment',
        documentNumber: 189716,
        id: 'VjEtUGF5bWVudC0xODk3MTY',
        documentNote: 'Example note'
      }
    },
    extensions: {
      tracing: {
        version: 1,
        startTime: '2020-09-03T07:18:48.413Z',
        endTime: '2020-09-03T07:18:50.488Z',
        duration: 2075035969,
        execution: { resolvers: [] }
      }
    }
  },
  GetAddMemorandum: {
    data: {
      node: {
        __typename: 'Memorandum',
        id: 'VjEtTWVtb3JhbmR1bS0xODM0NDU',
        balance: 'CREDIT',
        amount: '31.56',
        number: 183445,
        document: {
          __typename: 'Payment',
          id: 'VjEtSW52b2ljZS00NDczODM',
          documentNumber: 447383
        }
      }
    }
  },
  GetRevertMemorandum: {
    data: {
      node: {
        __typename: 'Memorandum',
        id: 'VjEtTWVtb3JhbmR1bS0xODM0NDU',
        balance: 'CREDIT',
        amount: '31.56',
        number: 183445,
        receiver: {
          __typename: 'Client',
          id: 'abc123456',
          fullName: 'Jack Jones Junior'
        },
        document: {
          __typename: 'Payment',
          id: 'VjEtSW52b2ljZS00NDczODM',
          documentNumber: 447383
        }
      }
    }
  },
  GetPaymentDetailsTable: {
    data: {
      node: {
        amount: '7.71',
        balanceDue: '0',
        billingCycleGid: 'gid://platform/Billing::Cycle/447531',
        documentNote: null,
        client: {
          id: 'VjEtQ2xpZW50LTMzNDA3OQ',
          webResource: {
            text: 'Terry, Monahan and Rice',
            url: 'https://staging.toptal.net/platform/staff/companies/1528979',
            __typename: 'Link'
          },
          __typename: 'Client'
        },
        createdOn: '2020-07-21',
        description:
          'Commission for screening Technical 2 Core step of Martijn Meijer for his/her services on Python Developer for Rental Platform: June 21, 2020 to July 4, 2020.',
        dueDate: '2020-07-21',
        id: 'VjEtUGF5bWVudC0xMTA0NDI4',
        job: {
          id: 'VjEtSm9iLTE4NDc2NA',
          webResource: {
            text: 'Junior Web Developer (184764)',
            url: 'https://staging.toptal.net/platform/staff/jobs/184764',
            __typename: 'Link'
          },
          __typename: 'Job'
        },
        paymentKind: 'ROLE_STEP_COMMISSION',
        paymentGroup: {
          id: 'VjEtUGF5bWVudEdyb3VwLTE3OTM3NA',
          number: 179374,
          webResource: {
            text: 'Payment Group 179374',
            url: 'https://staging.toptal.net/platform/staff/payment_groups/179374',
            __typename: 'Link'
          },
          __typename: 'PaymentGroup'
        },
        paymentMethod: 'TOPTAL_PAYMENTS',
        status: 'PAID',
        subjectObject: {
          unallocatedMemorandums: {
            __typename: 'MemorandumConnection',
            nodes: []
          },
          id: 'VjEtU3RhZmYtMTQ1NTA4Mg',
          fullName: 'José Silva',
          webResource: {
            text: 'José Silva',
            url: 'https://staging.toptal.net/platform/staff/staff/1455082',
            __typename: 'Link'
          },
          __typename: 'Staff'
        },
        __typename: 'Payment'
      }
    },
    extensions: {
      tracing: {
        version: 1,
        startTime: '2020-10-06T16:32:54.148Z',
        endTime: '2020-10-06T16:32:54.877Z',
        duration: 729421299,
        execution: {
          resolvers: []
        }
      }
    }
  },
  GetApplyUnallocatedMemorandumsToCommercialDocument: {
    data: {
      node: {
        ...fixtures.MockPayment,
        operations: {
          ...fixtures.MockPayment.operations,
          applyUnallocatedMemorandumsToCommercialDocument: {
            __typename: 'Operation',
            callable: 'ENABLED',
            messages: []
          }
        },
        status: 'OVERDUE',
        subjectObject: {
          ...fixtures.MockPayment.subjectObject,
          availablePrepaymentBalance: '1500.0'
        }
      }
    }
  },
  GetPayModalPayment: {
    data: {
      node: {
        balanceDue: '100.0',
        documentNumber: 1104428,
        eligibleForPay: true,
        historyLink: {
          text: '',
          url: 'example'
        },
        id: 'VjEtUGF5bWVudC0xMTA0NDI4',
        gid: 'gid://platform/Payment/1104428',
        operations: {
          applyUnallocatedMemorandumsToCommercialDocument: {
            callable: 'ENABLED',
            messages: [],
            __typename: 'Operation'
          },
          payPayment: {
            callable: 'ENABLED',
            messages: [],
            __typename: 'Operation'
          },
          __typename: 'PaymentOperations'
        },
        paymentGroup: null,
        status: 'DUE',
        subject: {
          __typename: 'Client',
          billingNotes: 'Billing Notes test',
          paymentOptions: {
            nodes: [
              {
                accountInfo: [
                  {
                    __typename: 'AccountInfo',
                    label: 'testLabel1',
                    value: 'test value 1'
                  }
                ],
                paymentMethod: 'PAYPAL',
                placeholder: false,
                preferred: false,
                __typename: 'PaymentOption'
              },
              {
                accountInfo: [
                  {
                    __typename: 'AccountInfo',
                    label: 'testLabel2',
                    value: 'test value 2'
                  }
                ],
                paymentMethod: 'ULTIPRO',
                placeholder: false,
                preferred: true,
                __typename: 'PaymentOption'
              },
              {
                accountInfo: [
                  {
                    __typename: 'AccountInfo',
                    label: 'testLabel3',
                    value: 'test value 3'
                  }
                ],
                paymentMethod: 'BANK_WIRE',
                placeholder: false,
                preferred: true,
                __typename: 'PaymentOption'
              }
            ],
            __typename: 'PaymentOptionsConnection'
          },
          id: 'VjEtU3RhZmYtMTQ1NTA4Mg',
          unallocatedMemorandums: {
            __typename: 'MemorandumConnection',
            nodes: []
          },
          webResource: {
            text: 'José Silva',
            url: 'https://staging.toptal.net/platform/staff/staff/1455082',
            __typename: 'Link'
          }
        },
        __typename: 'Payment'
      }
    }
  },
  GetPaymentDetailsHeader: {
    data: {
      node: {
        documentNumber: 1104428,
        historyLink: {
          __typename: 'Link',
          url: 'example'
        },
        status: 'DUE',
        downloadHtmlUrl:
          'https://staging.toptal.net/platform/staff/payments/1104428/download',
        downloadPdfUrl:
          'https://staging.toptal.net/platform/staff/payments/1104428/download.pdf',
        id: 'VjEtUGF5bWVudC0xMTA0NDI4',
        gid: 'gid://platform/Payment/1104428',
        operations: {
          addDocumentNote: {
            callable: 'ENABLED',
            messages: [],
            __typename: 'Operation'
          },
          addMemorandumToCommercialDocument: {
            callable: 'ENABLED',
            messages: [],
            __typename: 'Operation'
          },
          applyUnallocatedMemorandumsToCommercialDocument: {
            callable: 'HIDDEN',
            messages: [],
            __typename: 'Operation'
          },
          cancelPayment: {
            callable: 'HIDDEN',
            messages: [],
            __typename: 'Operation'
          },
          convertPaymentIntoCreditMemorandum: {
            callable: 'HIDDEN',
            messages: [],
            __typename: 'Operation'
          },
          disputeCommercialDocument: {
            callable: 'HIDDEN',
            messages: [],
            __typename: 'Operation'
          },
          editDocumentNote: {
            callable: 'ENABLED',
            messages: [],
            __typename: 'Operation'
          },
          payPayment: {
            callable: 'DISABLED',
            messages: [
              "Can't pay payment from a group. Either exclude it from group or pay the whole group instead.",
              'Can only pay outstanding, due or overdue payments'
            ],
            __typename: 'Operation'
          },
          resolveDisputeOfCommercialDocument: {
            callable: 'HIDDEN',
            messages: [],
            __typename: 'Operation'
          },
          updateCommercialDocumentDueDate: {
            callable: 'DISABLED',
            messages: [
              'This action is only available for outstanding and overdue payments.'
            ],
            __typename: 'Operation'
          },
          __typename: 'PaymentOperations'
        },
        paymentGroup: null,
        __typename: 'Payment',
        webResource: {
          text: 'Notice of Payment #1104428',
          url: 'https://staging.toptal.net/platform/staff/payments/1104428',
          __typename: 'Link'
        }
      }
    },
    extensions: {
      tracing: {
        version: 1,
        startTime: '2020-10-06T16:32:54.148Z',
        endTime: '2020-10-06T16:32:55.210Z',
        duration: 1062109566,
        execution: {
          resolvers: []
        }
      }
    }
  },
  GetNotification: {
    data: {
      node: {
        id: fixtures.MockPayment.id,
        __typename: 'Payment',
        ...fixtures.MockNotifications
      }
    }
  },
  GetNote: {
    data: {
      node: fixtures.MockNotes.notes.nodes[0]
    }
  },
  GetNotes: {
    data: {
      node: {
        ...fixtures.MockNotes,
        id: fixtures.MockPayment.id,
        __typename: 'Payment'
      }
    },
    extensions: {
      tracing: {
        version: 1,
        startTime: '2020-09-03T07:18:48.413Z',
        endTime: '2020-09-03T07:18:50.488Z',
        duration: 2075035969,
        execution: { resolvers: [] }
      }
    }
  },
  Note: {
    data: {
      nodes: []
    }
  },
  GetCommercialDocumentMemorandums: {
    data: {
      node: {
        __typename: 'Payment',
        id: fixtures.MockPayment.id,
        // use same memorandums due to fields missmatch
        // i.e.associatedMemorandums does not include downloadPdfUrl but cypress will complain that is missing
        associatedMemorandums:
          fixtures.MockGetCommercialDocumentMemorandums.node.memorandums,
        memorandums:
          fixtures.MockGetCommercialDocumentMemorandums.node.memorandums
      }
    }
  },
  GetTransfer: {
    data: {
      node: fixtures.MockTransfer
    }
  },

  GetTransfers: {
    data: {
      node: {
        __typename: 'Payment',
        transfers: fixtures.MockTransfers,
        id: fixtures.MockPayment.id
      }
    }
  },

  // Mutations
  EditDocumentNoteInput: {
    data: {
      editDocumentNote: {
        __typename: 'EditDocumentNotePayload',
        errors: [],
        commercialDocument: {
          __typename: 'Payment',
          documentNumber: 189716,
          id: 'VjEtUGF5bWVudC0xODk3MTY',
          documentNote: 'Example note'
        },
        notice: '',
        success: true
      }
    }
  },
  RevertCommercialDocumentMemorandum: {
    data: {
      revertCommercialDocumentMemorandum: {
        __typename: 'RevertCommercialDocumentMemorandumPayload',
        commercialDocument: {
          __typename: 'Payment',
          id: 'VjEtUGF5bWVudC0xMTU1MjUw',
          memorandums: {
            __typename: 'MemorandumConnection',
            nodes: [
              {
                id: 'VjEtTWVtb3JhbmR1bS0xODM0MDc',
                __typename: 'Memorandum',
                balance: 'CREDIT',
                amount: '36.48',
                operations: {
                  revertCommercialDocumentMemorandum: {
                    callable: 'DISABLED',
                    messages: ['The memorandum has already been reverted.'],
                    __typename: 'Operation'
                  },
                  __typename: 'MemorandumOperations'
                }
              }
            ]
          }
        },
        notice: null,
        success: true,
        errors: []
      }
    }
  },
  RevertRoleMemorandum: {
    data: {
      revertRoleMemorandum: {
        __typename: 'RevertRoleMemorandumPayload',
        commercialDocument: {
          __typename: 'Payment',
          id: 'VjEtUGF5bWVudC0xMTU1MjUw',
          memorandums: {
            __typename: 'MemorandumConnection',
            nodes: [
              {
                id: 'VjEtTWVtb3JhbmR1bS0xODM0MDc',
                __typename: 'Memorandum',
                balance: 'CREDIT',
                amount: '36.48',
                operations: {
                  revertRoleMemorandum: {
                    callable: 'DISABLED',
                    messages: ['The memorandum has already been reverted.'],
                    __typename: 'Operation'
                  },
                  __typename: 'MemorandumOperations'
                }
              }
            ]
          }
        },
        notice: null,
        success: true,
        errors: []
      }
    }
  },
  SetPayPayment: {
    data: {
      payPayment: {
        __typename: 'PayPaymentPayload',
        payment: {
          id: 'VjEtUGF5bWVudC0xMjIzNTk3',
          balanceDue: '0',
          documentNumber: 1223597,
          status: 'PAID',
          operations: {
            applyUnallocatedMemorandumsToCommercialDocument: {
              callable: 'HIDDEN',
              messages: [],
              __typename: 'Operation'
            },
            payPayment: {
              callable: 'DISABLED',
              messages: ['Can only pay outstanding, due or overdue payments'],
              __typename: 'Operation'
            },
            __typename: 'PaymentOperations'
          },
          __typename: 'Payment'
        },
        notice: '',
        success: true,
        errors: []
      }
    }
  }
}
