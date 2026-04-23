import { useMemo } from 'react'
import { SearchBarCategories } from '@staff-portal/filters'

import { useGetTeamMembersAutocompleteSearchCategory } from '../use-get-team-members-autocomplete-search-category/use-get-team-members-autocomplete-search-category'

export const useGetSearchBarCategories = (): SearchBarCategories => {
  const teamMembersAutocompleteSearchCategory =
    useGetTeamMembersAutocompleteSearchCategory()

  const searchBarCategories: SearchBarCategories = useMemo(
    () => [teamMembersAutocompleteSearchCategory],
    [teamMembersAutocompleteSearchCategory]
  )

  return searchBarCategories
}
