import { ProfileItemFragment } from '../../../data'
import { generateSectionDescription } from './generate-section-description'

const EMPLOYMENT_ITEM: ProfileItemFragment = {
  __typename: 'Employment',
  id: 'VjEtRW1wbG95bWVudC0xNjQ5MjU',
  company: 'Remi.ai',
  position: 'iOS and Mac App Developer',
  startDate: 2016,
  endDate: 2017
}

const PORTFOLIO_ITEM: ProfileItemFragment = {
  __typename: 'PortfolioItem',
  id: 'VjEtUG9ydGZvbGlvSXRlbS0yMDkzNjg',
  title: 'Process Excellence Temple (PET)'
}

describe('generateSectionDescription', () => {
  it('returns employment description', () => {
    expect(generateSectionDescription(EMPLOYMENT_ITEM)).toBe(
      'iOS and Mac App Developer, Remi.ai · 2016 - 2017'
    )
  })

  it('returns portfolio item description', () => {
    expect(generateSectionDescription(PORTFOLIO_ITEM)).toBe(
      'Process Excellence Temple (PET)'
    )
  })
})
