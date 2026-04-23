import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import RoleFlagTooltipContent from './RoleFlagTooltipContent'

describe('RoleFlagTooltipContent', () => {
  it('renders the given content', () => {
    const { container } = render(
      <TestWrapper>
        <RoleFlagTooltipContent
          title='Hello World'
          comment='This is me'
          formattedFlaggedByCopy='Here must be a formatted copy'
        />
      </TestWrapper>
    )

    expect(container.textContent).toContain('Hello World')
    expect(container.textContent).toContain('This is me')
    expect(container.textContent).toContain('Here must be a formatted copy')
  })
})
