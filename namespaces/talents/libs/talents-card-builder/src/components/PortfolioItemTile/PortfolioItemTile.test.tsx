import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'

import PortfolioItemTile from './PortfolioItemTile'
import getProfilePortfolioItemMock from '../../mocks/get-profile-portfolio-item-mock/get-profile-portfolio-item-mock'

describe('PortfolioItemTile', () => {
  it('renders an image on the tile', () => {
    const item = getProfilePortfolioItemMock({
      coverImage: '/photo.jpg'
    })

    render(<PortfolioItemTile item={item} variant='preview' />)

    expect(screen.getByRole('img')).toHaveAttribute('src', '/photo.jpg')
  })
})
