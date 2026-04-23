import MockPaymentGroup from './getPaymentGroup'

export default {
  paymentGroupsNullable: {
    totalCount: 3,
    nodes: [
      {
        ...MockPaymentGroup
      },
      {
        amount: '4286.83',
        createdOn: '2021-01-29',
        id: 'VjEtUGF5bWVudEdyb3VwLTE4NjM0Mw',
        number: 186343,
        status: 'PAID',
        operations: {
          payPaymentGroup: {
            callable: 'DISABLED',
            messages: ['You may pay outstanding groups only.'],
            __typename: 'Operation'
          },
          __typename: 'PaymentGroupOperations'
        },
        subject: {
          id: 'VjEtVGFsZW50LTI3NDg5OQ',
          webResource: {
            text: 'Pearle Mitchell',
            url: 'https://staging.toptal.net/platform/staff/talents/274899',
            __typename: 'Link'
          },
          __typename: 'Talent'
        },
        webResource: {
          text: 'Payment Group #186343',
          url: 'https://staging.toptal.net/platform/staff/payment_groups/186343',
          __typename: 'Link'
        },
        historyLink: {
          url: '/platform/staff/payment_groups/186343/performed_actions/recent',
          __typename: 'Link'
        },
        __typename: 'PaymentGroup'
      },
      {
        amount: '2480.0',
        createdOn: '2021-01-29',
        id: 'VjEtUGF5bWVudEdyb3VwLTE4NjM0Mg',
        number: 186342,
        status: 'PAID',
        operations: {
          payPaymentGroup: {
            callable: 'DISABLED',
            messages: ['You may pay outstanding groups only.'],
            __typename: 'Operation'
          },
          __typename: 'PaymentGroupOperations'
        },
        subject: {
          id: 'VjEtVGFsZW50LTEyOTU5Mjk',
          webResource: {
            text: 'Dayna Kulas',
            url: 'https://staging.toptal.net/platform/staff/talents/1295929',
            __typename: 'Link'
          },
          __typename: 'Talent'
        },
        webResource: {
          text: 'Payment Group #186342',
          url: 'https://staging.toptal.net/platform/staff/payment_groups/186342',
          __typename: 'Link'
        },
        historyLink: {
          url: '/platform/staff/payment_groups/186342/performed_actions/recent',
          __typename: 'Link'
        },
        __typename: 'PaymentGroup'
      }
    ],
    __typename: 'PaymentGroupsConnection'
  }
}
