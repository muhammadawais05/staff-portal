import fixtures from '@staff-portal/billing/src/_fixtures'

import billingPermitsQueries from './billingPermitsQueries'

export default {
  // Queries
  ...billingPermitsQueries,
  GetJob: fixtures.MockBillingSettingsJob,
  GetBillingCycles: fixtures.MockGetBillingCycles,
  GetJobHeader: fixtures.MockBillingSettingsJob,
  GetEngagement: {
    data: {
      node: {
        ...fixtures.MockGetEngagement.data.node,
        operations: {
          changeProductBillingFrequency: {
            callable: 'ENABLED',
            messages: [],
            __typename: 'Operation'
          },
          changeEngagementCommitment: {
            callable: 'HIDDEN',
            messages: ['You cannot change a working commitment.'],
            __typename: 'Operation'
          },
          __typename: 'EngagementOperations'
        }
      }
    }
  },
  GetPlacementFees: fixtures.MockGetPlacementFees,
  GetBillingCyclesWithTimesheets: {
    data: {
      billingCyclesWithTimesheets: fixtures.MockBillingCyclesWithTimesheet
    }
  },
  GetExperiments: {
    data: {
      experiments: {
        poLines: {
          enabled: false
        }
      }
    }
  },
  GetPurchaseOrdersOptions: fixtures.MockBillingSettingsJob,
  EditJobInvoiceNote: {
    data: {
      editJobInvoiceNote: {
        job: {
          id: 'VjEtSm9iLTE2OTM4Ng',
          invoiceNote: 'Test'
        },
        errors: [],
        notice: null,
        success: true
      }
    }
  },
  SetCreateEngagementExtraExpenses: {
    data: {
      createEngagementExtraExpenses: {
        extraExpense: {
          commissions: {
            nodes: [],
            __typename: 'CommissionConnection'
          },
          invoice: {
            gid: 'gid://platform/Invoice/556488',
            id: 'VjEtSW52b2ljZS01NTY0ODg',
            paidAmount: '0',
            amount: '46.0',
            __typename: 'Invoice'
          },
          payments: {
            nodes: [
              {
                gid: 'gid://platform/Payment/1360567',
                id: 'VjEtUGF5bWVudC0xMzYwNTY3',
                amount: '12.0',
                paidAmount: '0',
                __typename: 'Payment'
              }
            ],
            __typename: 'CommercialDocumentConnection'
          },
          __typename: 'ExtraExpense'
        },
        success: true,
        errors: [],
        __typename: 'CreateEngagementExtraExpensesPayload'
      }
    }
  },
  GetExtraExpenses: {
    error: null,
    loading: false,
    data: {
      node: {
        extraExpenses: fixtures.MockExtraExpenses,
        id: 'VjEtRW5nYWdlbWVudC0xODk3MTY',
        __typename: 'Engagement'
      }
    }
  },
  SetCreateEngagementPlacementFee: {
    data: {
      createEngagementPlacementFee: {
        __typename: 'CreateEngagementPlacementFeePayload',
        placementFees: fixtures.MockPlacementFees,
        errors: [],
        notice: '',
        success: true
      }
    }
  }
}
