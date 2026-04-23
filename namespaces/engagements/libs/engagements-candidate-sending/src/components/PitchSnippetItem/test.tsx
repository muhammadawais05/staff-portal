import React, { ReactNode } from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { createEngagementPitchSnippet } from '../../mocks'
import PitchSnippetItem, { Props } from './PitchSnippetItem'

jest.mock('../constants', () => ({
  NON_BREAKING_DASH_SYMBOL: '-',
  NON_BREAKING_SPACE_SYMBOL: ' '
}))

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Container: ({ children }: { children: ReactNode }) => (
    <div data-testid='item'>{children}</div>
  )
}))

const arrangeTest = (props: Props) => {
  render(
    <TestWrapper>
      <PitchSnippetItem {...props} />
    </TestWrapper>
  )
}

describe('PitchSnippetItem', () => {
  describe('when talent is empty', () => {
    beforeEach(() => {
      arrangeTest({ talent: undefined, hourlyRate: undefined })
    })

    it('does not display snippet item', () => {
      expect(screen.queryByTestId('item')).not.toBeInTheDocument()
    })
  })

  describe('when talent exists', () => {
    beforeEach(() => {
      const engagement = createEngagementPitchSnippet()

      arrangeTest({
        talent: engagement.talent,
        hourlyRate: engagement.talentHourlyRate
      })
    })

    it('displays snippet item', () => {
      expect(screen.queryByTestId('item')).toBeInTheDocument()
    })

    it('displays talent name', () => {
      expect(screen.queryByText('Domenic Koss')).toBeInTheDocument()
    })

    it('displays talent resume url', () => {
      expect(screen.queryByText('https//example.com')).toBeInTheDocument()
      expect(screen.getByText('Profile:')).toBeInTheDocument()
    })

    it('displays talent hourly rate', () => {
      expect(screen.queryByText('$50.00/h')).toBeInTheDocument()
    })

    it('displays talent availability', () => {
      expect(screen.queryByText('FT (5/20)')).toBeInTheDocument()
    })

    it('displays talent location', () => {
      expect(
        screen.queryByText('City Name, State Name, Country Name')
      ).toBeInTheDocument()
    })
  })

  describe('when engagement has a particular url', () => {
    const engagementUrl = 'https://new-example.com'
    const engagement = createEngagementPitchSnippet({
      resumeUrl: engagementUrl
    })

    beforeEach(() => {
      arrangeTest({
        talent: engagement.talent,
        hourlyRate: engagement.talentHourlyRate,
        engagementUrl: engagement.resumeUrl
      })
    })

    it("uses the the talent url in the talent's fullName", () => {
      expect(
        screen.getByRole('link', { name: engagement.talent!.fullName })
      ).toHaveAttribute('href', engagement.talent!.webResource.url)
    })
  })
})
