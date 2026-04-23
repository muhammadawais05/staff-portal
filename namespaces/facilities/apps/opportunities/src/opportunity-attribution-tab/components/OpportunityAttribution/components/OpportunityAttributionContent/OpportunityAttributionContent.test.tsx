import React, { ComponentProps } from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import OpportunityAttributionContent from '.'
import { opportunityAttributionFragmentMock } from '../../data/opportunity-attribution-fragment.mock'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/ui/src/components/DetailedList')

jest.mock('../../utils/use-opportunity-attribution-items', () => ({
  useOpportunityAttributionItems: () => ['a', 'b']
}))

const renderComponent = (
  props: ComponentProps<typeof OpportunityAttributionContent>
) =>
  render(
    <TestWrapper>
      <OpportunityAttributionContent {...props} />
    </TestWrapper>
  )

describe('OpportunityAttributionContent', () => {
  it('renders list of opportunity attribution fields', () => {
    renderComponent({
      opportunityAttribution: opportunityAttributionFragmentMock
    })

    expect(screen.getByTestId('DetailedList')).toBeInTheDocument()
  })
})
