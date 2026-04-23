import { omit } from 'lodash-es'
import fixtures from '@staff-portal/billing/src/_fixtures'

import basePageQueries from './basePageQueries'

export default {
  ...basePageQueries,
  GetReceivedPaymentsListHeader: {
    data: {
      viewer: {
        me: {
          operations: {
            downloadRolePaymentHistory: {
              callable: 'ENABLED',
              messages: [],
              __typename: 'Operation'
            },
            __typename: 'StaffOperations'
          },
          __typename: 'Staff'
        },
        operations: {
          downloadCommissions: {
            callable: 'ENABLED',
            messages: [],
            __typename: 'Operation'
          },
          __typename: 'ViewerOperations'
        },
        projectedCommissions: {
          available: true
        },
        __typename: 'Viewer'
      }
    }
  },
  GetPaymentsGrandTotals: {
    data: {
      payments: {
        ...omit(fixtures.MockPaymentList.payments, 'groups'),
        totalCount: 50
      }
    }
  },
  GetReceivedPaymentsList: {
    data: fixtures.MockPaymentList
  },
  GetPaymentsMonthlyTotals: {
    data: {
      payments: {
        __typename: 'PaymentsConnection',
        operations:
          fixtures.MockGetPaymentListHeaderActions.payments.operations,
        groups: [
          {
            __typename: 'PaymentsGroup',
            month: 10,
            year: 2020,
            totals: {
              __typename: 'PaymentsTotals',
              debited: '177502.39',
              disputed: '6614.4',
              due: '107863.74',
              onHold: '0.0',
              outstanding: '13837253.09',
              overdue: '282720.39',
              paid: '1994375.09'
            }
          }
        ]
      }
    }
  },
  DownloadCommissions: {
    data: {
      downloadCommissions: {
        __typename: 'DownloadCommissionsPayload',
        downloadUrl: '#',
        errors: [],
        notice: null,
        success: true
      }
    }
  },
  DownloadRolePaymentHistory: {
    data: {
      downloadRolePaymentHistory: {
        __typename: 'DownloadRolePaymentHistoryPayload',
        clientMutationId: null,
        downloadUrl: '#',
        role: {
          __typename: 'Staff',
          id: 'VjEtU3RhZmYtNzI1MzI1'
        },
        errors: [],
        notice: null,
        success: true
      }
    },
    extensions: {
      tracing: {
        version: 1,
        startTime: '2021-08-06T07:46:25.824Z',
        endTime: '2021-08-06T07:46:26.018Z',
        duration: 194740463,
        execution: {
          resolvers: []
        }
      }
    }
  },
  TouchCounter: {
    data: {
      touchCounter: {
        success: true,
        errors: [],
        __typename: 'TouchCounterPayload',
        counter: {
          name: 'payments',
          total: 0,
          unread: 0,
          __typename: 'Counter'
        }
      }
    }
  }
}
