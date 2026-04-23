import { render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import HiredTalentRowContentLayout from './HiredTalentRowContentLayout'

const arrangeTest = () =>
  render(
    <TestWrapper>
      <HiredTalentRowContentLayout
        avatar={<div data-testid='hired-talent-avatar' />}
        publicProfile={<div data-testid='hired-talent-public-profile' />}
        list={<div data-testid='hired-talent-list' />}
        talentLink={<div data-testid='hired-talent-talent-link' />}
        data-testid='HiredTalentRowContentLayout'
      />
    </TestWrapper>
  )

describe('HiredTalentRowContentLayout', () => {
  it('renders default', () => {
    arrangeTest()

    expect(
      screen.getByTestId('HiredTalentRowContentLayout')
    ).toBeInTheDocument()

    expect(screen.getByTestId('hired-talent-avatar')).toBeInTheDocument()
    expect(
      screen.getByTestId('hired-talent-public-profile')
    ).toBeInTheDocument()
    expect(screen.getByTestId('hired-talent-list')).toBeInTheDocument()
    expect(screen.getByTestId('hired-talent-talent-link')).toBeInTheDocument()
  })
})
