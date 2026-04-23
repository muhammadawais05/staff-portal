import React from 'react'

import { ProfilePortfolioItem } from '../../types'
import { useHighlightInteraction } from '../../utils/useHighlightedInteraction'
import PortfolioItemTile from '../PortfolioItemTile'

export interface PortfolioItemProps {
  item: ProfilePortfolioItem
  highlighted?: boolean
  toggleItem: (id: string) => void
}

const PortfolioItem = ({
  item,
  highlighted,
  toggleItem
}: PortfolioItemProps) => {
  const { variant, onMouseEnter, onMouseLeave } = useHighlightInteraction(
    highlighted ?? false
  )

  return (
    <PortfolioItemTile
      item={item}
      variant={variant}
      onClick={() => toggleItem(item.id)}
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
    />
  )
}

export default PortfolioItem
