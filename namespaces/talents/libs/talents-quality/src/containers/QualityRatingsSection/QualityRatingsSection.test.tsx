import React from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import QualityRatingsSection from './QualityRatingsSection'

jest.mock('@staff-portal/talents-soft-skills', () => ({
  TalentSoftSkillsSection: () => (
    <div data-testid='talent-soft-skills-section' />
  )
}))

jest.mock('../MatchQualitySection/MatchQualitySection', () => ({
  __esModule: true,
  default: () => <div data-testid='match-quality-section' />
}))

describe('QualityRatingsSection', () => {
  it('renders TalentSoftSkillsSection', () => {
    render(
      <TestWrapper>
        <QualityRatingsSection talentId='test-talent' />
      </TestWrapper>
    )

    expect(screen.getByTestId('talent-soft-skills-section')).toBeInTheDocument()
  })

  it('renders MatchQualitySection', () => {
    render(
      <TestWrapper>
        <QualityRatingsSection talentId='test-talent' />
      </TestWrapper>
    )

    expect(screen.getByTestId('match-quality-section')).toBeInTheDocument()
  })
})
