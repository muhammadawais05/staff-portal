import { Section } from '@toptal/picasso'
import React from 'react'

import { ProfilePortfolioItem } from '../../types'
import PortfolioItem from '../PortfolioItem'
import PortfolioListGrid from '../PortfolioListGrid'

export interface PortfolioListProps {
  title: string
  value: string[]
  toggleItem: (id: string) => void
  data: ProfilePortfolioItem[]
}

const PortfolioList = ({
  title,
  data,
  value,
  toggleItem
}: PortfolioListProps) => {
  if (data.length === 0) {
    return null
  }

  return (
    <Section title={title}>
      <PortfolioListGrid>
        {data.map(item => (
          <PortfolioItem
            key={item.id}
            item={item}
            toggleItem={toggleItem}
            highlighted={value.includes(item.id)}
          />
        ))}
      </PortfolioListGrid>
    </Section>
  )
}

export default PortfolioList
