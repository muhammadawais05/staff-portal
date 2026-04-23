import fixtures from '@staff-portal/billing/src/_fixtures'

import basePageQueries from './basePageQueries'

export default {
  ...basePageQueries,
  GetPaymentGroupDetailsTotals: {
    data: {
      node: {
        __typename: 'PaymentGroup',
        id: 'VjEtUGF5bWVudEdyb3VwLTE4NjM0NA',
        payments: {
          __typename: 'PaymentsConnection',
          totalCount: 3,
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
      }
    }
  },
  GetPaymentGroupPayModal: {
    data: {
      node: {
        ...fixtures.MockPaymentGroup,
        subject: {
          ...fixtures.MockPaymentGroup.subject,
          billingNotes: null,
          paymentOptions: {
            __typename: 'PaymentOptionsConnection',
            nodes: [
              {
                id: '12345',
                accountInfo: [
                  {
                    label: 'Payoneer',
                    value: '',
                    __typename: 'AccountInfo'
                  },
                  {
                    label: 'Name on account',
                    value: '',
                    __typename: 'AccountInfo'
                  },
                  {
                    label: 'Comment',
                    value: '',
                    __typename: 'AccountInfo'
                  }
                ],
                paymentMethod: 'PAYONEER',
                placeholder: false,
                preferred: true,
                __typename: 'PaymentOption'
              },
              {
                accountInfo: [],
                paymentMethod: 'TOPTAL_PAYMENTS',
                placeholder: false,
                preferred: false,
                __typename: 'PaymentOption'
              }
            ]
          }
        },
        payments: {
          groups: [
            {
              payments: [
                {
                  ...fixtures.MockPayment
                }
              ],
              __typename: 'PaymentsGroup'
            }
          ],
          __typename: 'PaymentsConnection'
        }
      }
    }
  },
  GetPaymentGroupDetailsSubject: {
    data: {
      node: {
        __typename: 'PaymentGroup',
        id: 'VjEtUGF5bWVudEdyb3VwLTE4NjM0NA',
        subject: {
          ...fixtures.MockPaymentGroup.subject,
          fullName: fixtures.MockPaymentGroup.subject.webResource.text
        }
      }
    }
  },
  GetPaymentGroupDetailsHeader: {
    data: {
      node: {
        ...fixtures.MockPaymentGroup,
        gid: 'gid://billing/PaymentGroup/187659'
      }
    }
  },
  GetPaymentGroupDetailsPayments: {
    data: {
      node: {
        __typename: 'PaymentGroup',
        id: 'VjEtUGF5bWVudEdyb3VwLTE4NjM0NA',
        payments: {
          totalCount: 2,
          alreadyDownloadedCount: null,
          groups: [
            {
              month: 2,
              year: 2021,
              payments: [
                {
                  ...fixtures.MockPayment,
                  amountWithCorrections: '720.0'
                }
              ],
              __typename: 'PaymentsGroup'
            }
          ],
          __typename: 'PaymentsConnection'
        }
      }
    }
  },
  GetPaymentGroupDetailsPaymentsTotals: {
    data: {
      node: {
        __typename: 'PaymentGroup',
        id: 'VjEtUGF5bWVudEdyb3VwLTE4NjM0NA',
        payments: {
          totalCount: 2,
          alreadyDownloadedCount: null,
          groups: [
            {
              month: 2,
              year: 2021,
              totals: {
                debited: '0.0',
                disputed: '0.0',
                due: '0.0',
                onHold: '0.0',
                outstanding: '0.0',
                overdue: '0.0',
                paid: '1440.0',
                __typename: 'PaymentsTotals'
              },
              __typename: 'PaymentsGroup'
            }
          ],
          __typename: 'PaymentsConnection'
        }
      }
    }
  }
}
