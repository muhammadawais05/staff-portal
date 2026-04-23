import React from 'react'
import { render, screen } from '@testing-library/react'
import { assertOnTooltip, TestWrapper } from '@staff-portal/test-utils'

import BlogPostAuthorBadge from './BlogPostAuthorBadge'

const arrangeTest = (fullName: string, url: string) =>
  render(
    <TestWrapper>
      <BlogPostAuthorBadge fullName={fullName} url={url} />
    </TestWrapper>
  )

describe('Blog Post Badge', () => {
  it('renders badge correctly', () => {
    arrangeTest('John Smith', 'someurl')
    assertOnTooltip(screen.getByTestId('author-icon'), tooltip => {
      expect(tooltip).toHaveTextContent('Toptal Product Blog Author')
      expect(screen.getByText('Toptal Product Blog Author')).toBeInTheDocument()
      expect(screen.getByText('John’s latest post.')).toHaveAttribute(
        'href',
        'someurl'
      )
    })
  })
})
