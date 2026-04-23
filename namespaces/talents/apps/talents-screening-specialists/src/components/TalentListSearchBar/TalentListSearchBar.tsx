import React, { ReactNode } from 'react'
import {
  createInputCategory,
  SearchBar,
  SearchBarCategories
} from '@staff-portal/filters'

const SEARCH_BAR_CATEGORY_NAMES = ['keywords', 'emails', 'names']

export const searchBarCategories: SearchBarCategories =
  SEARCH_BAR_CATEGORY_NAMES.map(categoryName =>
    createInputCategory({
      name: categoryName,
      getBadgeLabel: value => value,
      toQueryParam: value => value,
      fromQueryParam: value => value,
      fromInputValue: value => value
    })
  )

interface Props {
  nestableControls: ReactNode
}

const TalentListSearchBar = ({ nestableControls }: Props) => {
  return (
    <SearchBar
      name='badges'
      categories={searchBarCategories}
      nestableControls={nestableControls}
    />
  )
}

export default TalentListSearchBar
