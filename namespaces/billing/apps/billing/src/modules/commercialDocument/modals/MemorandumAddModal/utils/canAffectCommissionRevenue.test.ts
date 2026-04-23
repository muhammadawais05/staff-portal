import { InvoiceKind, PaymentKind } from '@staff-portal/graphql/staff'

import { canAffectCommissionRevenue } from './canAffectCommissionRevenue'

describe('canAffectCommissionRevenue', () => {
  it('return valid status of commissions affect ability', () => {
    expect(
      canAffectCommissionRevenue({
        nodeType: 'invoice',
        commissionable: true
      })
    ).toBeTruthy()

    expect(
      canAffectCommissionRevenue({
        nodeType: 'invoice',
        invoiceKind: InvoiceKind.CONSOLIDATED
      })
    ).toBeTruthy()

    expect(
      canAffectCommissionRevenue({
        nodeType: 'invoice',
        invoiceKind: InvoiceKind.COMPANY_DEPOSIT
      })
    ).toBeFalsy()

    expect(
      canAffectCommissionRevenue({
        nodeType: 'payment',
        paymentKind: PaymentKind.TALENT_PAYMENT
      })
    ).toBeTruthy()

    expect(
      canAffectCommissionRevenue({
        paymentKind: PaymentKind.TALENT_PAYMENT
      })
    ).toBeTruthy()

    expect(
      canAffectCommissionRevenue({
        roleType: 'Staff'
      })
    ).toBeTruthy()

    expect(
      canAffectCommissionRevenue({
        roleType: 'Company'
      })
    ).toBeTruthy()
  })
})
