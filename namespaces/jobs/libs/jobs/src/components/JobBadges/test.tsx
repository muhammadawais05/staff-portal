import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import JobBadges, { Props } from './JobBadges'

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <JobBadges {...props} />
    </TestWrapper>
  )

describe('JobBadges', () => {
  it('renders Enterprise tag', () => {
    arrangeTest({
      rehire: false,
      enterprise: true
    })

    expect(screen.getByTestId('enterprise-tag')).toBeInTheDocument()
    expect(screen.getByTestId('enterprise-tag').textContent).toBe(
      'Enterprise'
    )
  })

  it('renders Rehire tag', () => {
    arrangeTest({
      rehire: true,
      enterprise: false
    })

    expect(screen.getByTestId('rehire-tag')).toBeInTheDocument()
    expect(screen.getByTestId('rehire-tag').textContent).toBe('Rehire')
  })

  it('renders auto tag', () => {
    arrangeTest({
      rehire: false,
      enterprise: false,
      automatedAvailabilityRequests: true
    })

    expect(screen.getByTestId('auto-tag')).toBeInTheDocument()
    expect(screen.getByTestId('auto-tag').textContent).toBe('Auto')
  })
})
