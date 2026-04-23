import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import ExpandButton, { Props } from './ExpandButton'

const renderComponent = (props?: Partial<Props>) =>
  render(
    <TestWrapper>
      <ExpandButton expanded onClick={() => {}} {...props} />
    </TestWrapper>
  )

describe('ExpandButton', () => {
  it('default render', () => {
    renderComponent({
      expanded: true,
      onClick: () => {}
    })

    expect(screen.getByTestId('expand-button')).toBeInTheDocument()
  })
})
