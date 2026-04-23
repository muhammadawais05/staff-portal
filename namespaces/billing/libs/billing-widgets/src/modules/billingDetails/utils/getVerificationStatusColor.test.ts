import {
  BillingMethodName,
  BillingOptionStatus
} from '@staff-portal/graphql/staff'

import getVerificationStatusColor from './getVerificationStatusColor'

describe('getVerificationStatusColor', () => {
  describe.each`
    method                             | status                                       | color
    ${BillingMethodName.CREDIT_CARD}   | ${BillingOptionStatus.VERIFIED}              | ${'green'}
    ${BillingMethodName.CREDIT_CARD}   | ${BillingOptionStatus.FAILED}                | ${'red'}
    ${BillingMethodName.CREDIT_CARD}   | ${BillingOptionStatus.REQUIRES_VERIFICATION} | ${'red'}
    ${BillingMethodName.PAYPAL}        | ${BillingOptionStatus.VERIFIED}              | ${'green'}
    ${BillingMethodName.PAYPAL}        | ${BillingOptionStatus.FAILED}                | ${'red'}
    ${BillingMethodName.PAYPAL}        | ${BillingOptionStatus.REQUIRES_VERIFICATION} | ${'red'}
    ${BillingMethodName.WIRE}          | ${BillingOptionStatus.VERIFIED}              | ${'black'}
    ${BillingMethodName.WIRE}          | ${BillingOptionStatus.FAILED}                | ${'black'}
    ${BillingMethodName.WIRE}          | ${BillingOptionStatus.REQUIRES_VERIFICATION} | ${'black'}
    ${BillingMethodName.ACH}           | ${BillingOptionStatus.VERIFIED}              | ${'black'}
    ${BillingMethodName.ACH}           | ${BillingOptionStatus.FAILED}                | ${'black'}
    ${BillingMethodName.ACH}           | ${BillingOptionStatus.REQUIRES_VERIFICATION} | ${'black'}
    ${BillingMethodName.AUTOMATIC_ACH} | ${BillingOptionStatus.VERIFIED}              | ${'black'}
    ${BillingMethodName.AUTOMATIC_ACH} | ${BillingOptionStatus.FAILED}                | ${'black'}
    ${BillingMethodName.AUTOMATIC_ACH} | ${BillingOptionStatus.REQUIRES_VERIFICATION} | ${'black'}
    ${BillingMethodName.MANUAL_ACH}    | ${BillingOptionStatus.VERIFIED}              | ${'black'}
    ${BillingMethodName.MANUAL_ACH}    | ${BillingOptionStatus.FAILED}                | ${'black'}
    ${BillingMethodName.MANUAL_ACH}    | ${BillingOptionStatus.REQUIRES_VERIFICATION} | ${'black'}
  `(
    'when billing method is $method and status is $status',
    ({ method, status, color }) => {
      it(`color should be ${color}`, () => {
        expect(getVerificationStatusColor(method, status)).toEqual(color)
      })
    }
  )
})
