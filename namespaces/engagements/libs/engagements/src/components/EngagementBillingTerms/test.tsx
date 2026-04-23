import { render, screen } from '@toptal/picasso/test-utils'
import React, { ComponentProps } from 'react'
import { BillCycle } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import EngagementBillingTerms from './EngagementBillingTerms'

const arrangeTest = (props: ComponentProps<typeof EngagementBillingTerms>) =>
  render(
    <TestWrapper>
      <EngagementBillingTerms {...props} />
    </TestWrapper>
  )

describe('EngagementBillingTerms', () => {
  describe('when netTerms equals 0', () => {
    it('renders proper text', () => {
      arrangeTest({
        billCycle: BillCycle.WEEKLY,
        netTerms: 0
      })

      expect(screen.getByText('Weekly, Upon Receipt')).toBeInTheDocument()
    })
  })

  describe('when netTerms is not equal to 0', () => {
    it('renders proper text', () => {
      arrangeTest({
        billCycle: BillCycle.MONTHLY,
        netTerms: 10
      })

      expect(screen.getByText('Monthly, Net 10')).toBeInTheDocument()
    })
  })
})
