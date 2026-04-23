export default {
  data: {
    node: {
      billCycle: 'SEMI_MONTHLY',
      billDay: null,
      id: 'VjEtRW5nYWdlbWVudC0xODk3MTY',
      commitment: 'FULL_TIME',
      canBeDiscounted: false,
      companyFullTimeRate: '3800.0',
      companyHourlyRate: '95.0',
      companyPartTimeRate: '1900.0',
      extraHoursEnabled: false,
      defaultFullTimeDiscount: '0',
      defaultMarkup: '25.0',
      defaultPartTimeDiscount: '0',
      defaultUpcharge: '0',
      discountMultiplier: '1',
      fullTimeDiscount: '0.0',
      markup: null,
      partTimeDiscount: '0.0',
      rateMethod: 'LEGACY',
      rateOverrideReason: null,
      talentFullTimeRate: '2360.0',
      talentHourlyRate: '59.0',
      talentPartTimeRate: '1180.0',
      talent: {
        id: 'VjEtVGFsZW50LTUxMjM4NA',
        fullName: 'Hye Stracke',
        __typename: 'Talent'
      },
      job: {
        autoConsolidationEnabled: true,
        title: 'Chief Solutions Developer (169386)',
        id: 'VjEtSm9iLTE2OTM4Ng',
        jobType: 'developer',
        client: {
          fullName: 'Jacobs, Nikolaus and Leuschke',
          contact: {
            fullName: 'Nick Heathcote',
            id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTEyMDIxMDM',
            __typename: 'CompanyRepresentative'
          },
          enterprise: true,
          id: 'VjEtQ2xpZW50LTI0OTc2OQ',
          netTerms: 60,
          purchaseOrders: {
            nodes: [
              {
                budgetLeft: null,
                budgetSpent: false,
                draftedAmount: '0',
                expiryDate: '2021-12-31',
                archived: false,
                id: 'VjEtUHVyY2hhc2VPcmRlci0yNDg5',
                invoicedAmount: '86400.0',
                poNumber: '4900024725',
                threshold: null,
                totalAmount: null,
                purchaseOrderLines: {
                  nodes: []
                },
                webResource: {
                  text: '4900024725',
                  url: 'https://staging.toptal.net/platform/staff/purchase_orders/2489',
                  __typename: 'Link'
                },
                __typename: 'PurchaseOrder'
              },
              {
                budgetLeft: null,
                budgetSpent: false,
                draftedAmount: '0',
                expiryDate: null,
                archived: false,
                id: 'VjEtUHVyY2hhc2VPcmRlci0yMjM5',
                invoicedAmount: '87166.0',
                poNumber: '4200223122',
                threshold: null,
                totalAmount: null,
                purchaseOrderLines: {
                  nodes: []
                },
                webResource: {
                  text: '4200223122',
                  url: 'https://staging.toptal.net/platform/staff/purchase_orders/2239',
                  __typename: 'Link'
                },
                __typename: 'PurchaseOrder'
              },
              {
                budgetLeft: null,
                budgetSpent: false,
                draftedAmount: '0',
                expiryDate: null,
                archived: false,
                id: 'VjEtUHVyY2hhc2VPcmRlci0xNTcw',
                invoicedAmount: '335200.0',
                poNumber: '4501152048',
                threshold: null,
                totalAmount: null,
                purchaseOrderLines: {
                  nodes: []
                },
                webResource: {
                  text: '4501152048',
                  url: 'https://staging.toptal.net/platform/staff/purchase_orders/1570',
                  __typename: 'Link'
                },
                __typename: 'PurchaseOrder'
              },
              {
                budgetLeft: null,
                budgetSpent: false,
                draftedAmount: '0',
                expiryDate: null,
                archived: false,
                id: 'VjEtUHVyY2hhc2VPcmRlci0xNTY5',
                invoicedAmount: '366092.0',
                poNumber: '4501152046',
                threshold: null,
                totalAmount: null,
                purchaseOrderLines: {
                  nodes: []
                },
                webResource: {
                  text: '4501152046',
                  url: 'https://staging.toptal.net/platform/staff/purchase_orders/1569',
                  __typename: 'Link'
                },
                __typename: 'PurchaseOrder'
              },
              {
                budgetLeft: null,
                budgetSpent: false,
                draftedAmount: '0',
                expiryDate: null,
                archived: false,
                id: 'VjEtUHVyY2hhc2VPcmRlci0xNTIz',
                invoicedAmount: '147560.0',
                poNumber: '4501144795',
                threshold: null,
                totalAmount: null,
                purchaseOrderLines: {
                  nodes: []
                },
                webResource: {
                  text: '4501144795',
                  url: 'https://staging.toptal.net/platform/staff/purchase_orders/1523',
                  __typename: 'Link'
                },
                __typename: 'PurchaseOrder'
              },
              {
                budgetLeft: null,
                budgetSpent: false,
                draftedAmount: '0',
                expiryDate: null,
                archived: false,
                id: 'VjEtUHVyY2hhc2VPcmRlci0xNTIy',
                invoicedAmount: '198574.46',
                poNumber: 'FAKEPO-0000',
                threshold: null,
                totalAmount: null,
                purchaseOrderLines: {
                  nodes: []
                },
                webResource: {
                  text: 'FAKEPO-0000',
                  url: 'https://staging.toptal.net/platform/staff/purchase_orders/1522',
                  __typename: 'Link'
                },
                __typename: 'PurchaseOrder'
              }
            ],
            __typename: 'PurchaseOrderConnection'
          },
          __typename: 'Client'
        },
        __typename: 'Job'
      },
      semiMonthlyPaymentTalentAgreement: true,
      operations: {
        changeProductBillingFrequency: {
          callable: 'DISABLED',
          messages: [
            'Cannot change billing frequency when the engagement is not active.'
          ],
          __typename: 'Operation'
        },
        changeEngagementCommitment: {
          callable: 'HIDDEN',
          messages: ['You cannot change a working commitment.'],
          __typename: 'Operation'
        },
        __typename: 'EngagementOperations'
      },
      __typename: 'Engagement'
    }
  },
  extensions: {
    tracing: {
      version: 1,
      startTime: '2021-07-06T12:03:12.989Z',
      endTime: '2021-07-06T12:03:15.406Z',
      duration: 2417167227,
      execution: {
        resolvers: []
      }
    }
  }
}
