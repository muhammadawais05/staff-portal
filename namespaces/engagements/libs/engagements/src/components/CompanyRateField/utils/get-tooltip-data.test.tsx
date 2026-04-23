import React, { ReactNode } from 'react'
import { render } from '@toptal/picasso/test-utils'
import {
  BillingMethodName,
  CommitmentRateAvailability
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import {
  getTooltipData,
  Props as GetTooltipDataProps
} from './get-tooltip-data'
import { createEngagementClientInTalentSectionMock } from '../mocks'

jest.mock('@toptal/picasso/Icon', () => ({
  QuestionMark16: () => <div data-testid='question-icon' />,
  Exclamation16: () => <div data-testid='exclamation-icon' />
}))

jest.mock('../components/TooltipContent', () => ({
  __esModule: true,
  default: () => <div data-testid='tooltip-content' />
}))

const arrangeTest = (children: ReactNode) => {
  return render(<TestWrapper>{children}</TestWrapper>)
}

describe('getTooltipData', () => {
  const defaultProps: GetTooltipDataProps = {
    rate: {
      value: '10.00',
      availability: CommitmentRateAvailability.HOUR
    },
    canBeDiscounted: true,
    discountMultiplier: '0.75',
    client: createEngagementClientInTalentSectionMock()
  }

  it('returns nothing if canBeDiscounted is false', () => {
    const data = getTooltipData({
      ...defaultProps,
      canBeDiscounted: false,
      client: createEngagementClientInTalentSectionMock({
        preferredBillingOption: {
          id: 'test-id',
          billingMethod: BillingMethodName.MANUAL_ACH,
          discountable: true
        }
      })
    })

    expect(data).toBeNull()
  })

  it('returns nothing if discountMultiplier is false', () => {
    const data = getTooltipData({
      ...defaultProps,
      discountMultiplier: null,
      client: createEngagementClientInTalentSectionMock({
        preferredBillingOption: {
          id: 'test-id',
          billingMethod: BillingMethodName.MANUAL_ACH,
          discountable: true
        }
      })
    })

    expect(data).toBeNull()
  })

  it('returns question mark icon for discountable billing option', () => {
    const data = getTooltipData({
      ...defaultProps,
      client: createEngagementClientInTalentSectionMock({
        preferredBillingOption: {
          id: 'test-id',
          billingMethod: BillingMethodName.MANUAL_ACH,
          discountable: true
        }
      })
    })
    const { getByTestId } = arrangeTest(data?.icon)

    expect(getByTestId('question-icon')).toBeInTheDocument()
  })

  it('returns exclamation icon for discountable billing option', () => {
    const data = getTooltipData({
      ...defaultProps,
      client: createEngagementClientInTalentSectionMock({
        preferredBillingOption: {
          id: 'test-id',
          billingMethod: BillingMethodName.MANUAL_ACH,
          discountable: false
        }
      })
    })
    const { getByTestId } = arrangeTest(data?.icon)

    expect(getByTestId('exclamation-icon')).toBeInTheDocument()
  })
})
