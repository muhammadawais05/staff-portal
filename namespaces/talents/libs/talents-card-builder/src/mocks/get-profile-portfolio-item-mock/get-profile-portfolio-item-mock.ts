import { ProfilePortfolioItem } from '../../types'

const getProfilePortfolioItemMock = (
  profilePortfolioItem: Partial<ProfilePortfolioItem> = {}
) => ({
  id: profilePortfolioItem.title ?? 'portfolio-1',
  title: 'Portfolio',
  ...profilePortfolioItem
})

export default getProfilePortfolioItemMock
