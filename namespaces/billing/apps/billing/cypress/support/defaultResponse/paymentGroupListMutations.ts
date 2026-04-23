import { pick } from 'lodash-es'
import fixtures from '@staff-portal/billing/src/_fixtures'

const MockPaymentGroup = fixtures.MockPaymentGroup

const successResponse = {
  errors: [],
  success: true,
  notice: ''
}

export default {
  SetPayPaymentGroups: {
    data: {
      payPaymentGroups: {
        __typename: 'PayPaymentGroupsPayload',
        ...successResponse
      }
    }
  },
  CancelPaymentGroup: {
    data: {
      cancelPaymentGroup: {
        __typename: 'CancelPaymentGroupPayload',
        paymentGroup: {
          ...pick(MockPaymentGroup, [
            '__typename',
            'id',
            'amount',
            'createdOn',
            'number',
            'status',
            'operations'
          ]),
          // we are using another id, because same id conflicts
          // with previously cache data during cypress form submission mutation test
          id: 'VjEtUGF5bWVudEdyb3VwLTEyMzQ1Ng',
          operations: {
            __typename: 'PaymentGroupOperations',
            cancelPaymentGroup: {
              callable: 'ENABLED',
              messages: [],
              __typename: 'Operation'
            }
          }
        },
        ...successResponse
      }
    }
  },
  SetPayPaymentGroup: {
    data: {
      payPaymentGroup: {
        success: true,
        errors: [],
        paymentGroup: {
          id: 'VjEtUGF5bWVudEdyb3VwLTE4NzAzMg',
          number: 187032,
          amount: '3240.0',
          status: 'PENDING_PAYMENT',
          subject: {
            billingNotes: null,
            paymentOptions: {
              nodes: [
                {
                  accountInfo: [],
                  paymentMethod: 'TOPTAL_PAYMENTS',
                  placeholder: false,
                  preferred: true,
                  __typename: 'PaymentOption'
                }
              ],
              __typename: 'PaymentOptionsConnection'
            },
            id: 'VjEtVGFsZW50LTE0MjkzNDI',
            webResource: {
              text: 'Everett Haley',
              url: 'https://staging.toptal.net/platform/staff/talents/1429342',
              __typename: 'Link'
            },
            __typename: 'Talent'
          },
          __typename: 'PaymentGroup'
        },
        __typename: 'PayPaymentGroupPayload'
      }
    }
  },
  SetApplyUnallocatedMemorandumsToPaymentGroup: {
    data: {
      applyUnallocatedMemorandumsToPaymentGroup: {
        errors: [],
        success: true,
        notice: null,
        paymentGroup: {
          ...MockPaymentGroup,
          status: 'OUTSTANDING'
        },
        __typename: 'ApplyUnallocatedMemorandumsToPaymentGroupPayload'
      }
    }
  }
}
