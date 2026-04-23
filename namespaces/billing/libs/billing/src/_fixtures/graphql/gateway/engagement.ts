import { BillCycle } from '@staff-portal/graphql/staff'

import extraExpenses from './extraExpenses'

export default {
  __typename: 'Engagement',
  billCycle: BillCycle.BI_WEEKLY,
  billDay: 'WEDNESDAY',
  extraExpenses,
  canBeDiscounted: true,
  commitment: 'HOURLY',
  companyFullTimeRate: 100,
  companyHourlyRate: 30,
  companyPartTimeRate: 20,
  defaultFullTimeDiscount: 20,
  defaultMarkup: 10,
  defaultPartTimeDiscount: 10,
  defaultUpcharge: 20,
  discountMultiplier: 1,
  extraHoursEnabled: false,
  id: 'VjEtRW5nYWdlbWVudC0xNzE2MDg',
  job: {
    __typename: 'Job',
    autoConsolidationEnabled: true,
    client: {
      __typename: 'Client',
      billingNotes: '',
      billingOptions: {
        __typename: 'BillingOptionInterfaceConnection',
        nodes: []
      },
      contact: {
        __typename: 'CompanyRepresentative',
        fullName: 'Erik Grady',
        id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTEwNjkwNjU'
      },
      enterprise: true,
      fullName: 'Leuschke-Berge ZN',
      id: 'VjEtQ2xpZW50LTIxNzM4OQ',
      netTerms: 30,

      preferredBillingOption: null,
      purchaseOrders: {
        __typename: 'PurchaseOrderConnection',
        nodes: [
          {
            __typename: 'PurchaseOrder',
            archived: false,
            draftedAmount: '0.0',
            budgetLeft: '450',
            budgetSpent: false,
            expiryDate: '2020-02-27',
            id: 'VjEtUHVyY2hhc2VPcmRlci0xNzIy',
            invoicedAmount: '0',
            poNumber: 'testExample1',
            threshold: '200',
            totalAmount: '5555.0',
            purchaseOrderLines: {
              nodes: []
            },
            webResource: {
              __typename: 'Link',
              text: 'Invoice #380600',
              url: 'http://localhost:3000/platform/staff/invoices/380600'
            }
          },
          {
            __typename: 'PurchaseOrder',
            draftedAmount: '0.0',
            archived: false,
            budgetLeft: '0',
            budgetSpent: true,
            expiryDate: '2020-02-27',
            id: 'xxxxxxxx',
            invoicedAmount: '1400',
            poNumber: 'testExample2',
            threshold: '0',
            totalAmount: '1400',
            purchaseOrderLines: {
              nodes: []
            },
            webResource: {
              __typename: 'Link',
              text: 'Invoice #380600',
              url: 'http://localhost:3000/platform/staff/invoices/380600'
            }
          },
          {
            __typename: 'PurchaseOrder',
            draftedAmount: '0.0',
            archived: false,
            budgetLeft: '450',
            budgetSpent: false,
            expiryDate: '2020-02-27',
            id: 'xxxxxxxx',
            invoicedAmount: '1400',
            poNumber: 'testExample1722',
            threshold: '200',
            totalAmount: '1400',
            purchaseOrderLines: {
              nodes: []
            },
            webResource: {
              __typename: 'Link',
              text: 'Invoice #380600',
              url: 'http://localhost:3000/platform/staff/invoices/380600'
            }
          }
        ]
      }
    },
    id: 'VjEtSm9iLTE0NTU0NA',
    jobType: 'Developer',
    title: 'Facemoji Keyboard Designer'
  },
  operations: {
    __typename: 'EngagementOperations',
    changeEngagementCommitment: {
      __typename: 'Operation',
      callable: 'ENABLED',
      messages: []
    },
    changeProductBillingFrequency: {
      __typename: 'Operation',
      callable: 'ENABLED',
      messages: []
    }
  },
  fullTimeDiscount: 0.2,
  markup: 1,
  partTimeDiscount: 0.1,
  rateMethod: 'DEFAULT',
  rateOverrideReason: '',
  semiMonthlyPaymentTalentAgreement: false,
  talent: { __typename: 'Talent', fullName: 'Rich Grimes', id: '123456' },
  talentFullTimeRate: 200,
  talentHourlyRate: 5,
  talentPartTimeRate: 100,
  webResource: {
    text: 'Exemplary engagement webResource text',
    url: 'https://staging.toptal.net/platform/staff/engagements/235107',
    __typename: 'Link'
  }
}
