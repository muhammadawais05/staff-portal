import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import PortfolioItem, { PortfolioItemProps } from './PortfolioItem'
import getProfilePortfolioItemMock from '../../mocks/get-profile-portfolio-item-mock/get-profile-portfolio-item-mock'

const renderComponent = (props: Pick<PortfolioItemProps, 'item'>) =>
  render(
    <TestWrapper>
      <PortfolioItem highlighted={false} toggleItem={jest.fn()} {...props} />
    </TestWrapper>
  )

describe('PortfolioItem', () => {
  it('renders portfolio data', () => {
    const portfolioItem = getProfilePortfolioItemMock({
      title: 'My website'
    })

    renderComponent({ item: portfolioItem })

    expect(screen.getByText('My website')).toBeInTheDocument()
    expect(screen.queryByTestId('coverImage')).not.toBeInTheDocument()
  })

  it('renders portfolio data with cover image', () => {
    const portfolioItem = getProfilePortfolioItemMock({
      title: 'My website',
      coverImage: 'image.jpg'
    })

    renderComponent({ item: portfolioItem })

    expect(screen.getByText('My website')).toBeInTheDocument()
    expect(screen.getByTestId('coverImage')).toBeInTheDocument()
  })
})
