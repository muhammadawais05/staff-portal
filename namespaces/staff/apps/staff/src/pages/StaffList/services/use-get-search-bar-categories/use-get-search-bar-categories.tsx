import { useMemo } from 'react'
import {
  useGetLanguagesSearchCategory,
  createInputCategory,
  SearchBarCategories
} from '@staff-portal/filters'

import useGetStaffNamesAutocompleteSearchCategory from '../use-get-staff-names-autocomplete-search-category/use-get-staff-names-autocomplete-search-category'
import useGetStaffKeywordsAutocompleteSearchCategory from '../use-get-staff-keywords-autocomplete-search-category/use-get-staff-keywords-autocomplete-search-category'

const useGetSearchBarCategories = (): SearchBarCategories => {
  const languagesSearchCategory = useGetLanguagesSearchCategory()
  const staffNamesAutocompleteSearchCategory =
    useGetStaffNamesAutocompleteSearchCategory()
  const staffKeywordsAutocompleteSearchCategory =
    useGetStaffKeywordsAutocompleteSearchCategory()
  const searchBarCategories: SearchBarCategories = useMemo(
    () => [
      staffKeywordsAutocompleteSearchCategory,
      languagesSearchCategory,
      createInputCategory({ name: 'emails' }),
      staffNamesAutocompleteSearchCategory
    ],
    [
      staffKeywordsAutocompleteSearchCategory,
      languagesSearchCategory,
      staffNamesAutocompleteSearchCategory
    ]
  )

  return searchBarCategories
}

export default useGetSearchBarCategories
