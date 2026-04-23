import React, { ComponentProps } from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import OpportunityTimelineContent from '.'
import { opportunityTimelineFragmentMock } from '../../data/opportunity-timeline-fragment.mock'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/ui/src/components/DetailedList')

jest.mock('../../utils/use-opportunity-timeline-items', () => ({
  useOpportunityTimelineItems: () => ['a', 'b']
}))

const renderComponent = (
  props: ComponentProps<typeof OpportunityTimelineContent>
) =>
  render(
    <TestWrapper>
      <OpportunityTimelineContent {...props} />
    </TestWrapper>
  )

describe('OpportunityTimelineContent', () => {
  it('renders list of opportunity timeline fields', () => {
    renderComponent({
      opportunityTimeline: opportunityTimelineFragmentMock
    })

    expect(screen.getByTestId('DetailedList')).toBeInTheDocument()
  })
})
