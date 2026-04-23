import { ProfileItemFragment } from '../../../data'
import { generateIndustryConnectionsSections } from './generate-industry-connections-sections'

const PROFILE_ITEMS: ProfileItemFragment[] = [
  {
    __typename: 'Employment',
    id: 'VjEtRW1wbG95bWVudC0xNjQ5MjU',
    company: 'Remi.ai',
    position: 'iOS and Mac App Developer',
    startDate: 2016,
    endDate: 2017
  },
  {
    __typename: 'PortfolioItem',
    id: 'VjEtUG9ydGZvbGlvSXRlbS0yMDkzNjg',
    title: 'Process Excellence Temple (PET)'
  },
  {
    __typename: 'Employment',
    id: 'VjEtRW1wbG95bWVudC0yMDcxNTI',
    company: 'Simplified Automation Inc.',
    position: 'Co-founder & Engineering Lead',
    startDate: 2018,
    endDate: 2020
  }
]

describe('generateIndustryConnectionsSections', () => {
  it('returns empty array', () => {
    expect(generateIndustryConnectionsSections([])).toStrictEqual([])
  })

  it('returns sections grouped and sorted by the type', () => {
    expect(generateIndustryConnectionsSections(PROFILE_ITEMS)).toStrictEqual([
      {
        name: 'Employment history',
        descriptions: [
          'iOS and Mac App Developer, Remi.ai · 2016 - 2017',
          'Co-founder & Engineering Lead, Simplified Automation Inc. · 2018 - 2020'
        ],
        amount: 2,
        type: 'Employment'
      },
      {
        name: 'Portfolio',
        descriptions: ['Process Excellence Temple (PET)'],
        amount: 1,
        type: 'PortfolioItem'
      }
    ])
  })
})
