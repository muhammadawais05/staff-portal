import { PaymentGroupStatus } from '@staff-portal/graphql/staff'

import { getPaymentGroupStatusColor } from './getPaymentGroupStatusColor'

describe('#getPaymentGroupStatusColor', () => {
  it('return proper colors', () => {
    expect(getPaymentGroupStatusColor(PaymentGroupStatus.OUTSTANDING)).toBe(
      'red'
    )
    expect(getPaymentGroupStatusColor(PaymentGroupStatus.PAID)).toBe('green')
    expect(getPaymentGroupStatusColor(PaymentGroupStatus.PENDING_CANCEL)).toBe(
      'yellow'
    )
    expect(getPaymentGroupStatusColor(PaymentGroupStatus.PENDING_PAYMENT)).toBe(
      'yellow'
    )
  })
})
