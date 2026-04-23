import React from 'react'
import { Container, Dropdown, Menu, Typography } from '@toptal/picasso'
import { toTitleCase } from '@toptal/picasso/utils'

import { SearchBarCategory } from '../SearchBar/types'
import * as S from './styles'

export interface Props {
  activeCategory: SearchBarCategory
  categories: SearchBarCategory[]
  onCategoryChange: (category: SearchBarCategory) => void
}

const SearchBarCategorySelector = ({
  activeCategory: { name: activeCategoryName, label: activeCategoryLabel },
  categories,
  onCategoryChange
}: Props) => {
  return (
    <Dropdown
      content={
        <Menu data-testid='search-categories-dropdown'>
          {categories.map(category => {
            const { label, name } = category

            return (
              <Menu.Item
                key={name}
                selected={name === activeCategoryName}
                onClick={() => {
                  onCategoryChange(category)
                }}
              >
                {toTitleCase(label || name)}
              </Menu.Item>
            )
          })}
        </Menu>
      }
    >
      <Typography color='grey' size='xsmall' css={S.subject} noWrap>
        <Container as='span'>
          {toTitleCase(activeCategoryLabel || activeCategoryName)}
        </Container>
        <Dropdown.Arrow size='small' />
      </Typography>
    </Dropdown>
  )
}

export default SearchBarCategorySelector
