import {
  BillingMethodName,
  BillingOptionStatus
} from '@staff-portal/graphql/staff'

import getVerificationStatusLabel from './getVerificationStatusLabel'

describe('getVerificationStatusLabel', () => {
  describe.each`
    method                             | status                                       | label
    ${BillingMethodName.CREDIT_CARD}   | ${BillingOptionStatus.FAILED}                | ${'Charge failed'}
    ${BillingMethodName.CREDIT_CARD}   | ${BillingOptionStatus.REQUIRES_VERIFICATION} | ${'Pending verification'}
    ${BillingMethodName.CREDIT_CARD}   | ${BillingOptionStatus.VERIFIED}              | ${'Verified'}
    ${BillingMethodName.PAYPAL}        | ${BillingOptionStatus.FAILED}                | ${'Failed'}
    ${BillingMethodName.PAYPAL}        | ${BillingOptionStatus.REQUIRES_VERIFICATION} | ${'Pending verification'}
    ${BillingMethodName.PAYPAL}        | ${BillingOptionStatus.VERIFIED}              | ${'Verified'}
    ${BillingMethodName.WIRE}          | ${BillingOptionStatus.FAILED}                | ${'Failed'}
    ${BillingMethodName.WIRE}          | ${BillingOptionStatus.REQUIRES_VERIFICATION} | ${'Pending verification'}
    ${BillingMethodName.WIRE}          | ${BillingOptionStatus.VERIFIED}              | ${'Verified'}
    ${BillingMethodName.ACH}           | ${BillingOptionStatus.FAILED}                | ${'Failed'}
    ${BillingMethodName.ACH}           | ${BillingOptionStatus.REQUIRES_VERIFICATION} | ${'Pending verification'}
    ${BillingMethodName.ACH}           | ${BillingOptionStatus.VERIFIED}              | ${'Verified'}
    ${BillingMethodName.AUTOMATIC_ACH} | ${BillingOptionStatus.FAILED}                | ${'Failed'}
    ${BillingMethodName.AUTOMATIC_ACH} | ${BillingOptionStatus.REQUIRES_VERIFICATION} | ${'Pending verification'}
    ${BillingMethodName.AUTOMATIC_ACH} | ${BillingOptionStatus.VERIFIED}              | ${'Verified'}
    ${BillingMethodName.MANUAL_ACH}    | ${BillingOptionStatus.FAILED}                | ${'Failed'}
    ${BillingMethodName.MANUAL_ACH}    | ${BillingOptionStatus.REQUIRES_VERIFICATION} | ${'Pending verification'}
    ${BillingMethodName.MANUAL_ACH}    | ${BillingOptionStatus.VERIFIED}              | ${'Verified'}
  `(
    'when method is $method and status is $status',
    ({ method, status, label }) => {
      it(`label should be ${label}`, () => {
        expect(getVerificationStatusLabel(method, status)).toEqual(label)
      })
    }
  )
})
