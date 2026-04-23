export default {
  __typename: 'PurchaseOrderJobConnection',
  nodes: [
    {
      __typename: 'Job',
      id: 'VjEtSm9iLTIyMzk0NA',
      status: 'ACTIVE',
      title: 'Chief Research Developer (223944)',
      hiredCount: 1,
      matcherCallScheduled: false,
      talentCount: 1,
      cumulativeStatus: 'ACTIVE',
      webResource: {
        text: 'Chief Research Developer (223944)',
        url: 'https://staging.toptal.net/platform/staff/jobs/223944',
        __typename: 'Link'
      },
      engagements: {
        totalCount: 1,
        nodes: [
          {
            id: 'VjEtRW5nYWdlbWVudC0yMjA3NDU',
            purchaseOrder: {
              id: 'VjEtUHVyY2hhc2VPcmRlci0xOTMy',
              __typename: 'PurchaseOrder'
            },
            webResource: {
              text: 'Senior Solutions Developer (207367) → Venice Jast',
              url: 'http://localhost:3000/platform/staff/engagements/220745',
              __typename: 'Link'
            },
            __typename: 'Engagement'
          }
        ]
      }
    },
    {
      __typename: 'Job',
      id: 'MS1Kb2ItMjIzOTQ1',
      status: 'CLOSED',
      title: 'Chief Research Developer (223944)',
      hiredCount: 1,
      matcherCallScheduled: false,
      talentCount: 1,
      cumulativeStatus: 'CLOSED',
      webResource: {
        text: 'Chief Research Developer (223944)',
        url: 'https://staging.toptal.net/platform/staff/jobs/223944',
        __typename: 'Link'
      },
      engagements: {
        totalCount: 0,
        nodes: []
      }
    },
    {
      __typename: 'Job',
      id: 'MS1Kb2ItMjIzOTQ2',
      status: 'PENDING_ENGINEER',
      title: 'Chief Research Developer (223944)',
      hiredCount: 1,
      matcherCallScheduled: false,
      talentCount: 1,
      cumulativeStatus: 'PENDING_ENGINEER',
      webResource: {
        text: 'Chief Research Developer (223944)',
        url: 'https://staging.toptal.net/platform/staff/jobs/223944',
        __typename: 'Link'
      },
      engagements: {
        totalCount: 0,
        nodes: []
      }
    }
  ]
}
