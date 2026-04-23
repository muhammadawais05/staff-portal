export const getOverviewInvoicesResponse = () => ({
  data: {
    overview: {
      invoicesOverview: {
        paid: '1425.9',
        disputed: '0.0',
        overdue: '0.0',
        outstanding: '3656941.96',
        __typename: 'InvoicesTotals'
      },
      invoicesDisputed: {
        nodes: [],
        __typename: 'InvoicesConnection'
      },
      invoicesOverdue: {
        nodes: [
          {
            id: 'VjEtSW52b2ljZS01OTA5MDk',
            subject: {
              contact: {
                webResource: {
                  text: 'Vanita Fritsch',
                  url: 'https://staging.toptal.net/platform/staff/company_representatives/1681058',
                  __typename: 'Link'
                },
                __typename: 'CompanyRepresentative'
              },
              netTerms: 60,
              webResource: {
                text: 'Fritsch-Labadie CL',
                url: 'https://staging.toptal.net/platform/staff/companies/1681057',
                __typename: 'Link'
              },
              __typename: 'Client'
            },
            job: {
              webResource: {
                text: 'Principal Web Developer (196056)',
                url: 'https://staging.toptal.net/platform/staff/jobs/196056',
                __typename: 'Link'
              },
              __typename: 'Job'
            },
            dueDate: '2021-11-26',
            issueDate: '2021-09-27',
            amount: '6400.0',
            __typename: 'Invoice'
          }
        ],
        __typename: 'InvoicesConnection'
      },
      purchaseOrdersExpiration: {
        nodes: [
          {
            id: 'VjEtUHVyY2hhc2VPcmRlci0yNTk2',
            client: {
              webResource: {
                text: 'Lockman, Collier and Little',
                url: 'https://staging.toptal.net/platform/staff/companies/2576323',
                __typename: 'Link'
              },
              __typename: 'Client'
            },
            expiryDate: '2021-12-30',
            totalAmount: '0',
            invoicedAmount: '0',
            budgetSpent: true,
            threshold: '75.0',
            webResource: {
              text: 'FAKEPO-2596',
              url: 'https://staging.toptal.net/platform/staff/purchase_orders/2596',
              __typename: 'Link'
            },
            __typename: 'PurchaseOrder'
          }
        ],
        __typename: 'PurchaseOrderConnection'
      },
      purchaseOrdersLimit: {
        nodes: [
          {
            id: 'VjEtUHVyY2hhc2VPcmRlci0xNTkx',
            client: {
              webResource: {
                text: 'Hahn, Miller and Douglas',
                url: 'https://staging.toptal.net/platform/staff/companies/1581333',
                __typename: 'Link'
              },
              __typename: 'Client'
            },
            expiryDate: null,
            totalAmount: '0',
            invoicedAmount: '0',
            budgetSpent: true,
            threshold: '85.0',
            webResource: {
              text: 'FAKEPO-1591',
              url: 'https://staging.toptal.net/platform/staff/purchase_orders/1591',
              __typename: 'Link'
            },
            __typename: 'PurchaseOrder'
          }
        ],
        __typename: 'PurchaseOrderConnection'
      },
      timesheets: {
        nodes: [
          {
            id: 'VjEtVGltZXNoZWV0LTY2NTA2NQ',
            dueDate: '2022-01-15',
            client: {
              webResource: {
                text: 'Lueilwitz-Turcotte LE',
                url: 'https://staging.toptal.net/platform/staff/companies/1745765',
                __typename: 'Link'
              },
              __typename: 'Client'
            },
            job: {
              webResource: {
                text: 'Supreme Chief Decentralized Information Asset Program Designer (213643)',
                url: 'https://staging.toptal.net/platform/staff/jobs/213643',
                __typename: 'Link'
              },
              __typename: 'Job'
            },
            talent: {
              webResource: {
                text: 'Levi Corwin',
                url: 'https://staging.toptal.net/platform/staff/talents/707565',
                __typename: 'Link'
              },
              __typename: 'Talent'
            },
            recruiter: {
              webResource: {
                text: 'Felipe Padilha Barcellos',
                url: 'https://staging.toptal.net/platform/staff/staff/552772',
                __typename: 'Link'
              },
              __typename: 'Staff'
            },
            __typename: 'Timesheet'
          }
        ],
        __typename: 'TimesheetsConnection'
      },
      __typename: 'Overview'
    }
  }
})
