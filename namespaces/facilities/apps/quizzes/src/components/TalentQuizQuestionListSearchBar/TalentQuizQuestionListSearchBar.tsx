import React, { ReactNode } from 'react'
import {
  createInputCategory,
  SearchBar,
  SearchBarCategories
} from '@staff-portal/filters'

export const searchBarCategories: SearchBarCategories = [
  createInputCategory({
    name: 'keywords'
  })
]

interface Props {
  nestableControls: ReactNode
}

const TalentQuizQuestionListSearchBar = ({ nestableControls }: Props) => {
  return (
    <SearchBar
      name='badges'
      categories={searchBarCategories}
      nestableControls={nestableControls}
    />
  )
}

export default TalentQuizQuestionListSearchBar
