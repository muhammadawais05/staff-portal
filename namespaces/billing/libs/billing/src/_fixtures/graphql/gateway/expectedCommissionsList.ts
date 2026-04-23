export default {
  expectedCommissions: {
    totalCount: 3,
    groups: [
      {
        expectedCommissions: [
          {
            id: 'VjEtRXhwZWN0ZWRDb21taXNzaW9uLTgzNDkyNw',
            amount: '120.0',
            expectedDate: '2021-05-24',
            status: 'PENDING',
            reason: {
              __typename: 'Engagement'
            },
            subject: {
              __typename: 'Staff',
              webResource: {
                text: 'Prashanth Modi',
                url: 'https://staging.toptal.net/platform/staff/staff/1619763'
              }
            },
            kind: 'ENTERPRISE_CLIENT_PARTNER_COMMISSION'
          },
          {
            id: 'VjEtRXhwZWN0ZWRDb21taXNzaW9uLTgzNDkyNg',
            amount: '120.0',
            expectedDate: '2021-05-24',
            status: 'PENDING',
            reason: {
              __typename: 'Engagement'
            },
            subject: {
              __typename: 'Staff',
              webResource: {
                text: 'Yafim Strauss',
                url: 'https://staging.toptal.net/platform/staff/staff/732374'
              }
            },
            kind: 'ENTERPRISE_COMPANY_CLAIMING_COMMISSION'
          }
        ],
        totals: {
          amount: '1560.0'
        },
        year: 2021,
        month: 5
      },
      {
        expectedCommissions: [
          {
            id: 'VjEtRXhwZWN0ZWRDb21taXNzaW9uLTgzNTQ5Nw',
            amount: '5.75',
            expectedDate: '2021-04-27',
            status: 'PENDING',
            reason: {
              __typename: 'Engagement'
            },
            subject: {
              __typename: 'Staff',
              webResource: {
                text: 'Andy Anderson',
                url: 'https://staging.toptal.net/platform/staff/staff/763567'
              }
            },
            kind: 'ENTERPRISE_CLIENT_PARTNER_COMMISSION'
          },
          {
            id: 'VjEtRXhwZWN0ZWRDb21taXNzaW9uLTgzNTQ5Ng',
            amount: '5.75',
            expectedDate: '2021-04-27',
            status: 'PENDING',
            reason: {
              __typename: 'Engagement'
            },
            subject: {
              __typename: 'Staff',
              webResource: {
                text: 'Dennis Chang',
                url: 'https://staging.toptal.net/platform/staff/staff/715571'
              }
            },
            kind: 'ENTERPRISE_COMPANY_CLAIMING_COMMISSION'
          }
        ],
        totals: {
          amount: '46144.55'
        },
        year: 2021,
        month: 4
      }
    ]
  }
}
