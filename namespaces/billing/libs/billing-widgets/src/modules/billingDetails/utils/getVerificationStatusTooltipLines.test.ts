import {
  BillingMethodName,
  BillingOptionVerificationStatus
} from '@staff-portal/graphql/staff'

import getVerificationStatusTooltipLines from './getVerificationStatusTooltipLines'

describe('getVerificationStatusTooltipLines', () => {
  describe('when billing method is credit card', () => {
    describe.each`
      status                                               | text
      ${BillingOptionVerificationStatus.CANNOT_BE_CHARGED} | ${'Verification transaction failed'}
      ${BillingOptionVerificationStatus.CAN_BE_CHARGED}    | ${'Verification transaction was successful'}
      ${BillingOptionVerificationStatus.CARD_DECLINED}     | ${'Card declined'}
      ${BillingOptionVerificationStatus.CVC_FAIL}          | ${'CVC check failed'}
      ${BillingOptionVerificationStatus.CVC_PASS}          | ${'CVC check passed'}
      ${BillingOptionVerificationStatus.CVC_UNCHECKED}     | ${'CVC unchecked'}
      ${BillingOptionVerificationStatus.EXPIRED_CARD}      | ${'Card expired'}
      ${BillingOptionVerificationStatus.INCORRECT_CVC}     | ${'Security code incorrect'}
      ${BillingOptionVerificationStatus.MISSING}           | ${'Card declined'}
      ${BillingOptionVerificationStatus.PENDING}           | ${'Verification transaction is in progress'}
      ${BillingOptionVerificationStatus.PROCESSING_ERROR}  | ${'Processing error'}
    `('when status is $status', ({ status, text }) => {
      it(`returns value "${text}"`, () => {
        expect(
          getVerificationStatusTooltipLines({
            billingMethod: BillingMethodName.CREDIT_CARD,
            verificationStatuses: [status]
          })
        ).toContain(text)
      })
    })

    describe('when an unknown status is passed', () => {
      it('returns empty array', () => {
        expect(
          getVerificationStatusTooltipLines({
            billingMethod: BillingMethodName.CREDIT_CARD,
            // @ts-expect-error value is unknown for testing purposes
            verificationStatuses: ['unknown status']
          })
        ).toEqual([])
      })
    })

    describe('when multiple statuses are passed', () => {
      it('return an array with multiple statuses', () => {
        const lines = getVerificationStatusTooltipLines({
          billingMethod: BillingMethodName.CREDIT_CARD,
          verificationStatuses: [
            BillingOptionVerificationStatus.CANNOT_BE_CHARGED,
            BillingOptionVerificationStatus.CVC_FAIL,
            BillingOptionVerificationStatus.PENDING,
            // @ts-expect-error value is unknown for testing purposes
            'unknown'
          ]
        })

        expect(lines).toHaveLength(3)
        expect(lines).toContain('Verification transaction failed')
        expect(lines).toContain('CVC check failed')
        expect(lines).toContain('Verification transaction is in progress')
      })
    })
  })

  describe('when billing method is other than credit card', () => {
    describe.each([
      BillingMethodName.PAYPAL,
      BillingMethodName.WIRE,
      BillingMethodName.ACH,
      BillingMethodName.AUTOMATIC_ACH,
      BillingMethodName.MANUAL_ACH
    ])('and it is %s', billingMethod => {
      describe('and there is a comment', () => {
        it('return an array with this comment', () => {
          const lines = getVerificationStatusTooltipLines({
            billingMethod,
            comment: 'This is a comment'
          })

          expect(lines).toHaveLength(1)
          expect(lines).toContain('This is a comment')
        })
      })

      describe('and there is no comment', () => {
        it('return an empty array', () => {
          const lines = getVerificationStatusTooltipLines({
            billingMethod
          })

          expect(lines).toHaveLength(0)
        })
      })
    })
  })
})
