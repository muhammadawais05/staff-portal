export default {
  id: 'VjEtQ2xpZW50LTUxMTg2MA',
  commissions: {
    commissionsPot: 5,
    referralCommission: null,
    __typename: 'ClientCommissions'
  },
  referrer: null,
  canIssueSourcingCommission: true,
  claimer: {
    id: 'VjEtU3RhZmYtMTIwOTYyNA',
    fullName: 'Michal Raček',
    webResource: {
      text: 'Michal Raček',
      url: 'https://staging.toptal.net/platform/staff/staff/1209624',
      __typename: 'Link'
    },
    __typename: 'Staff'
  },
  commissionReceiver: {
    id: 'VjEtU3RhZmYtMTIwOTYyNA',
    fullName: 'Michal Raček',
    webResource: {
      text: 'Michal Raček',
      url: 'https://staging.toptal.net/platform/staff/staff/1209624',
      __typename: 'Link'
    },
    __typename: 'Staff'
  },
  operations: {
    changeRoleReferrer: {
      callable: 'ENABLED',
      messages: [],
      __typename: 'Operation'
    },
    updateClientClaimer: {
      callable: 'ENABLED',
      messages: [],
      __typename: 'Operation'
    },
    __typename: 'ClientOperations'
  },
  __typename: 'Client'
}
