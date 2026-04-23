import { render } from '@toptal/picasso/test-utils'
import React from 'react'
import {
  BillingMethodName,
  CommitmentRateAvailability
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import TooltipContent, { Props as TooltipContentProps } from './TooltipContent'
import { createEngagementClientInTalentSectionMock } from '../../mocks'

const arrangeTest = (props?: Partial<TooltipContentProps>) => {
  const defaultProps: TooltipContentProps = {
    rate: {
      value: '50.50',
      availability: CommitmentRateAvailability.HOUR
    },
    discountMultiplier: '0.95',
    canBeDiscounted: false,
    client: null
  }

  return render(
    <TestWrapper>
      <TooltipContent {...defaultProps} {...props} />
    </TestWrapper>
  )
}

describe('TooltipContent', () => {
  describe('displays', () => {
    it('discountable content', () => {
      const { container } = arrangeTest({
        isDiscountable: true,
        rate: {
          value: '20.00',
          availability: CommitmentRateAvailability.HOUR
        },
        discountMultiplier: '0.80',
        client: createEngagementClientInTalentSectionMock({
          preferredBillingOption: {
            id: 'test-id',
            billingMethod: BillingMethodName.CREDIT_CARD,
            discountable: false
          }
        })
      })

      expect(container.textContent).toBe(
        `The company will pay a rate of $16.00/hour (3% discount) if they use their primary payment method, which is Credit Card.`
      )
    })

    it('not discountable content', () => {
      const { container } = arrangeTest({
        isDiscountable: false,
        rate: {
          value: '15.00',
          availability: CommitmentRateAvailability.HOUR
        },
        discountMultiplier: '0.80',
        client: createEngagementClientInTalentSectionMock({
          preferredBillingOption: {
            id: 'test-id',
            billingMethod: BillingMethodName.MANUAL_ACH,
            discountable: false
          }
        })
      })

      expect(container.textContent).toBe(
        `The company has selected Manual Ach as their primary payment method. They can receive a 3% discount by switching to ACH or Wire and pay a rate of $12.00/hour.`
      )
    })
  })

  describe('returns empty string', () => {
    it('if there is no billing method', () => {
      const { container } = arrangeTest()

      expect(container.textContent).toBe('')
    })
  })
})
