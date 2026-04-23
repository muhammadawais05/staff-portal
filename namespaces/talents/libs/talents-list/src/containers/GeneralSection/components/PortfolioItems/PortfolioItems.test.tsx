import React from 'react'
import { render, screen } from '@testing-library/react'
import { TalentPortfolioKind } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import PortfolioItems from './PortfolioItems'
import { useGetTalentItemPortfolioItems } from './data/get-talent-item-portfolio-items/get-talent-item-portfolio-items.staff.gql'

jest.mock(
  './data/get-talent-item-portfolio-items/get-talent-item-portfolio-items.staff.gql',
  () => ({
    useGetTalentItemPortfolioItems: jest.fn()
  })
)

const PortfolioItemsDataWithCoverImage = [
  {
    id: '12343434343',
    kindEnum: TalentPortfolioKind.BASIC,
    title: 'portfolio-title',
    description: 'portfolio-description',
    coverPhoto: {
      originalUrl: 'cover-original-url',
      coverUrl: 'cover-url'
    },
    skills: {
      nodes: []
    }
  }
]

const PortfolioItemsDataWithoutCoverImage = [
  {
    id: '12343434343',
    kindEnum: TalentPortfolioKind.BASIC,
    title: 'portfolio-title',
    description: 'portfolio-description',
    coverPhoto: null,
    skills: {
      nodes: []
    }
  }
]

const mockUseGetTalentItemPortfolioItems =
  useGetTalentItemPortfolioItems as jest.Mock

const arrangeTest = () => {
  render(
    <TestWrapper>
      <PortfolioItems talentName='talent-name' talentId='abc' />
    </TestWrapper>
  )
}

describe('PortfolioItems', () => {
  it('renders portfolio item with cover image', () => {
    mockUseGetTalentItemPortfolioItems.mockReturnValueOnce({
      data: PortfolioItemsDataWithCoverImage
    })
    arrangeTest()

    expect(
      screen.getByTestId('portfolio-image-general-section')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('portfolio-image-general-section')
    ).toHaveAttribute('src')
  })

  it('does not render portfolio item with cover image', () => {
    mockUseGetTalentItemPortfolioItems.mockReturnValueOnce({
      data: PortfolioItemsDataWithoutCoverImage
    })
    arrangeTest()

    expect(
      screen.queryByTestId('portfolio-image-general-section')
    ).not.toBeInTheDocument()
  })
})
