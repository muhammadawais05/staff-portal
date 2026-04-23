import React from 'react'
import { render, screen } from '@testing-library/react'
import { PortfolioItemKindEnum } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { TalentPortfolioItemFragment } from '@staff-portal/talents'

import PortfolioItem from './PortfolioItem'

const createPortfolioItem = ({
  link
}: {
  link?: TalentPortfolioItemFragment['link']
} = {}): TalentPortfolioItemFragment => ({
  id: '123',
  description: 'TEST_DESCRIPTION',
  kindEnum: PortfolioItemKindEnum.BASIC,
  link,
  title: 'TEST_TITLE',
  position: 0,
  files: { nodes: [] },
  skills: { nodes: [] }
})

const arrangeTest = (portfolioItem: TalentPortfolioItemFragment) =>
  render(
    <TestWrapper>
      <PortfolioItem item={portfolioItem} />
    </TestWrapper>
  )

describe('PortfolioItem', () => {
  it('renders the portfolio item', () => {
    const portfolioItem = createPortfolioItem()

    arrangeTest(portfolioItem)

    expect(
      screen.getByText(portfolioItem.title, { exact: false })
    ).toBeInTheDocument()
    expect(screen.getByText(portfolioItem.description as string)).toBeInTheDocument()
  })

  it('shows the portfolio item link if exists', () => {
    const portfolioItem = createPortfolioItem({
      link: 'TEST_LINK'
    })

    arrangeTest(portfolioItem)

    const portfolioItemLink = screen.getByText(portfolioItem.link as string)

    expect(portfolioItemLink).toBeInTheDocument()
    expect(portfolioItemLink).toHaveAttribute('href', portfolioItem.link)
  })
})
