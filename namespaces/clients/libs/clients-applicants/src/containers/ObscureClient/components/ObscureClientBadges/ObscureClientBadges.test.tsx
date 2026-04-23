import { render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { ClientFragment } from '@staff-portal/clients'

import ObscureClientBadges from './ObscureClientBadges'

const arrangeTest = (company: Partial<ClientFragment>) =>
  render(
    <TestWrapper>
      <ObscureClientBadges company={company as ClientFragment} />
    </TestWrapper>
  )

describe('ObscureClientBadges', () => {
  it('the new flag should not be visible', () => {
    arrangeTest({ isNew: false })

    expect(screen.queryByText('New')).not.toBeInTheDocument()
  })

  it('the new flag should be visible', () => {
    arrangeTest({ isNew: true })

    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('the Not claimed yet flag should NOT be visible when there is a claimer', () => {
    arrangeTest({
      claimer: { id: '1', fullName: 'fullName', webResource: { text: 'text' } }
    })

    expect(screen.queryByText('Not claimed yet')).not.toBeInTheDocument()
  })

  it('the Not claimed yet flag should be visible when there is NO claimer', () => {
    arrangeTest({ claimer: null })

    expect(screen.getByText('Not claimed yet')).toBeInTheDocument()
  })
})
