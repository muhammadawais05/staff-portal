import React, { ComponentProps } from 'react'
import { within } from '@testing-library/react'
import {
  BillingMethodName,
  BillingOptionStatus,
  BillingOptionVerificationStatus
} from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import VerificationStatus from '.'

const { displayName } = VerificationStatus

const render = (props: ComponentProps<typeof VerificationStatus>) =>
  renderComponent(<VerificationStatus {...props} />)

describe('VerificationStatus', () => {
  it('default render', () => {
    const { getByTestId } = render({
      billingMethod: BillingMethodName.PAYPAL,
      status: BillingOptionStatus.VERIFIED,
      comment: 'This is a comment'
    })

    expect(getByTestId(`${displayName}-label`)).toHaveTextContent('Verified')
    expect(getByTestId(`${displayName}-icon`)).toBeInTheDocument()
  })

  describe('when a method is different than credit card', () => {
    describe('and a comment is present', () => {
      it('display a tooltip, that is wrapping a label', () => {
        const { getByTestId } = render({
          billingMethod: BillingMethodName.PAYPAL,
          status: BillingOptionStatus.VERIFIED,
          comment: 'This is a comment'
        })

        expect(getByTestId('Tooltip-content')).toHaveTextContent(
          'This is a comment'
        )
        expect(
          within(getByTestId('Tooltip-children')).getByTestId(
            `${displayName}-label`
          )
        ).toHaveTextContent('Verified')
      })
    })

    describe('and there is no comment', () => {
      it('do not display a tooltip, just display a label', () => {
        const { queryByTestId, getByTestId } = render({
          billingMethod: BillingMethodName.PAYPAL,
          status: BillingOptionStatus.FAILED
        })

        expect(queryByTestId('Tooltip')).not.toBeInTheDocument()
        expect(getByTestId(`${displayName}-label`)).toHaveTextContent('Failed')
      })
    })
  })

  describe('when a method is credit card', () => {
    describe('and verification statuses are present', () => {
      it('display a tooltip, that is wrapping a label', () => {
        const { getByTestId } = render({
          billingMethod: BillingMethodName.CREDIT_CARD,
          status: BillingOptionStatus.VERIFIED,
          verificationStatuses: [
            BillingOptionVerificationStatus.CARD_DECLINED,
            BillingOptionVerificationStatus.CVC_FAIL
          ]
        })

        expect(getByTestId('Tooltip-content')).toHaveTextContent(
          'Card declined'
        )
        expect(getByTestId('Tooltip-content')).toHaveTextContent(
          'CVC check failed'
        )
        expect(
          within(getByTestId('Tooltip-children')).getByTestId(
            `${displayName}-label`
          )
        ).toHaveTextContent('Verified')
      })
    })

    describe('when there are no verification statuses', () => {
      it('do not display a tooltip, just display a label', () => {
        const { queryByTestId, getByTestId } = render({
          billingMethod: BillingMethodName.CREDIT_CARD,
          status: BillingOptionStatus.REQUIRES_VERIFICATION
        })

        expect(queryByTestId('Tooltip')).not.toBeInTheDocument()
        expect(getByTestId(`${displayName}-label`)).toHaveTextContent(
          'Pending verification'
        )
      })
    })
  })
})
