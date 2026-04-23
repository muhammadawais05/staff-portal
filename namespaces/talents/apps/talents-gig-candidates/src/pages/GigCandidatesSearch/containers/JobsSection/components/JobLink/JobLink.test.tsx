import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import JobLink from './JobLink'

describe('Claimer link', () => {
  it('renders link when url is provided', () => {
    render(
      <TestWrapper>
        <JobLink job={{ webResource: { url: '/test', text: 'test' } }} />
      </TestWrapper>
    )

    expect(screen.getByText('test').closest('a')).toHaveAttribute(
      'href',
      '/test'
    )
  })

  it('renders just text when NO url provided', () => {
    render(
      <TestWrapper>
        <JobLink job={{ webResource: { text: 'test' } }} />
      </TestWrapper>
    )

    const jobText = screen.getByText('test')

    expect(jobText).toBeInTheDocument()
    expect(jobText.closest('a')).not.toBeInTheDocument()
  })
})
