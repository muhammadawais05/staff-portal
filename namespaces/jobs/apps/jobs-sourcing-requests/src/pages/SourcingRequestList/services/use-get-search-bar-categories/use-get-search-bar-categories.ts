import { SearchBarCategories } from '@staff-portal/filters'
import { useMemo } from 'react'

import { useGetKeywordsAutocompleteSearchCategory } from '../use-get-keywords-autocomplete-search-category/use-get-keywords-autocomplete-search-category'
import { useGetNamesAutocompleteSearchCategory } from '../use-get-names-autocomplete-search-category/use-get-names-autocomplete-search-category'
import { useGetSkillsAutocompleteSearchCategory } from '../use-get-skills-autocomplete-search-category/use-get-skills-autocomplete-search-category'

export const useGetSearchBarCategories = (): SearchBarCategories => {
  const keywordsAutocompleteSearchCategory =
    useGetKeywordsAutocompleteSearchCategory()
  const namesAutocompleteCategory = useGetNamesAutocompleteSearchCategory()
  const skillsAutocompleteCategory = useGetSkillsAutocompleteSearchCategory()

  const searchBarCategories: SearchBarCategories = useMemo(
    () => [
      skillsAutocompleteCategory,
      keywordsAutocompleteSearchCategory,
      namesAutocompleteCategory
    ],
    [
      keywordsAutocompleteSearchCategory,
      namesAutocompleteCategory,
      skillsAutocompleteCategory
    ]
  )

  return searchBarCategories
}
