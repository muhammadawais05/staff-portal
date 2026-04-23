export default {
  amount: '1800.0',
  createdOn: '2021-01-29',
  eligibleForPay: true,
  id: 'VjEtUGF5bWVudEdyb3VwLTE4NjM0NA',
  number: 186344,
  status: 'PAID',
  operations: {
    applyUnallocatedMemorandums: {
      callable: 'HIDDEN',
      messages: [],
      __typename: 'Operation'
    },
    cancelPaymentGroup: {
      callable: 'ENABLED',
      messages: [],
      __typename: 'Operation'
    },
    payPaymentGroup: {
      callable: 'ENABLED',
      messages: [],
      __typename: 'Operation'
    },
    __typename: 'PaymentGroupOperations'
  },
  subject: {
    id: 'VjEtVGFsZW50LTU3OTg5OA',
    webResource: {
      text: 'Annamaria Strosin',
      url: 'https://staging.toptal.net/platform/staff/talents/579898',
      __typename: 'Link'
    },
    __typename: 'Talent'
  },
  webResource: {
    text: 'Payment Group #186344',
    url: 'https://staging.toptal.net/platform/staff/payment_groups/186344',
    __typename: 'Link'
  },
  historyLink: {
    url: '/platform/staff/payment_groups/186344/performed_actions/recent',
    __typename: 'Link'
  },
  __typename: 'PaymentGroup'
}
