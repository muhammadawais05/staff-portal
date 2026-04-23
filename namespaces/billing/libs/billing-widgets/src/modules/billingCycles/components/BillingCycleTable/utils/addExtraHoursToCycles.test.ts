import fixtures from '@staff-portal/billing/src/_fixtures'

import { addExtraHoursToCycles } from './addExtraHoursToCycles'

describe('#addExtraHoursToCycles', () => {
  it('given an array of consolidated billing cycles, it mutates the array to add a child cycle to each cycle that contains extraHours > 0', () => {
    const mockConsolidatedBillingCycles = fixtures.MockConsolidatedBillingCycles

    const actual = [
      mockConsolidatedBillingCycles[0],
      mockConsolidatedBillingCycles[1]
    ]

    addExtraHoursToCycles(actual)

    const expected = [
      {
        __typename: 'BillingCycle',
        actualCommitment: {
          __typename: 'Commitment',
          availability: 'full_time',
          availabilityHours: 40,
          companyRate: '3800.0',
          startDate: '2020-03-12',
          talentRate: '2360.0'
        },
        endDate: '2020-05-31',
        gid: 'gid://platform/Billing::Cycle/436655',
        hours: '80.0',
        chargedHours: '80.0',
        extraHours: '0.0',
        kind: 'development',
        originalCommitment: {
          __typename: 'Commitment',
          availability: 'full_time',
          availabilityHours: 40,
          companyRate: '3800.0',
          startDate: '2020-03-12',
          talentRate: '2360.0'
        },
        startDate: '2020-05-16',
        childrenCycles: [],
        invoices: [],
        payments: [],
        commissions: []
      },
      {
        __typename: 'BillingCycle',
        actualCommitment: {
          __typename: 'Commitment',
          availability: 'full_time',
          availabilityHours: 40,
          companyRate: '3800.0',
          startDate: '2020-03-12',
          talentRate: '2360.0'
        },
        endDate: '2020-05-15',
        gid: 'gid://platform/Billing::Cycle/432684',
        hours: '88.0',
        chargedHours: '88.0',
        extraHours: '22.0',
        kind: 'development',
        originalCommitment: {
          __typename: 'Commitment',
          availability: 'full_time',
          availabilityHours: 40,
          companyRate: '3800.0',
          startDate: '2020-03-12',
          talentRate: '2360.0'
        },
        startDate: '2020-05-01',
        status: 'PAID',
        childrenCycles: [
          {
            __typename: 'BillingCycle',
            actualCommitment: {
              __typename: 'Commitment',
              availability: 'extra_hours',
              availabilityHours: 40,
              companyRate: '3800.0',
              startDate: '2020-03-12',
              talentRate: '2360.0'
            },
            endDate: '2020-05-15',
            gid: 'gid://platform/Billing::Cycle/432684',
            hours: '88.0',
            chargedHours: '22.0',
            extraHours: '22.0',
            kind: 'development',
            originalCommitment: {
              __typename: 'Commitment',
              availability: 'extra_hours',
              availabilityHours: 40,
              companyRate: '3800.0',
              startDate: '2020-03-12',
              talentRate: '2360.0'
            },
            startDate: '2020-05-01',
            status: 'PAID',
            childrenCycles: [],
            hasChildAdjustments: false,
            invoices: [
              {
                __typename: 'Invoice',
                amount: '420.0',
                billingCycleGid: 'gid://platform/Billing::Cycle/432684',
                consolidatedDocument: null,
                creditedAmount: '0',
                debitedAmount: '0',
                documentNumber: 415963,
                gid: 'gid://platform/Invoice/415963',
                kind: 'EXTRA_HOURS',
                paidAmount: '0',
                status: 'OUTSTANDING',
                subjectObject: {
                  __typename: 'Client',
                  fullName: 'Jacobs, Nikolaus and Leuschke'
                },
                url: 'http://localhost:3000/platform/staff/invoices/415963'
              }
            ],
            payments: [
              {
                __typename: 'Payment',
                extraHours: true,
                amount: '5192.0',
                billingCycleGid: 'gid://platform/Billing::Cycle/432684',
                creditedAmount: '0',
                debitedAmount: '0',
                documentNumber: 1155847,
                gid: 'gid://platform/Payment/1155847',
                paidAmount: '0',
                status: 'OUTSTANDING',
                subjectObject: {
                  __typename: 'Talent',
                  fullName: 'Hye Stracke'
                },
                url: 'http://localhost:3000/platform/staff/payments/1155847'
              }
            ],
            commissions: []
          }
        ],
        hasChildAdjustments: false,
        invoices: [
          {
            __typename: 'Invoice',
            amount: '8360.0',
            billingCycleGid: 'gid://platform/Billing::Cycle/432684',
            consolidatedDocument: null,
            creditedAmount: '0',
            debitedAmount: '0',
            documentNumber: 411187,
            gid: 'gid://platform/Invoice/411187',
            kind: 'COMPANY_BILL',
            paidAmount: '0',
            status: 'OUTSTANDING',
            subjectObject: {
              __typename: 'Client',
              fullName: 'Jacobs, Nikolaus and Leuschke'
            },
            url: 'http://localhost:3000/platform/staff/invoices/411187'
          }
        ],
        payments: [
          {
            __typename: 'Payment',
            extraHours: false,
            amount: '5192.0',
            billingCycleGid: 'gid://platform/Billing::Cycle/432684',
            creditedAmount: '0',
            debitedAmount: '0',
            documentNumber: 1044847,
            gid: 'gid://platform/Payment/1044847',
            paidAmount: '0',
            status: 'OUTSTANDING',
            subjectObject: { __typename: 'Talent', fullName: 'Hye Stracke' },
            url: 'http://localhost:3000/platform/staff/payments/1044847'
          }
        ],
        commissions: []
      }
    ]

    expect(actual).toMatchObject(expected)
  })
})
