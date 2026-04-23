import { useCallback } from 'react'
import { useDebouncedAutocomplete } from '@staff-portal/utils'

import {
  useGetParentNamesAutocompleteForSkill,
  useGetParentNamesAutocompleteForVertical
} from '../../hooks'

/**
 * Convenience hook to auto switch between useGetParentNamesAutocompleteForSkill
 * and useGetParentNamesAutocompleteForVertical:
 * - `useGetParentNamesAutocompleteForSkill` if currentSkillId is available (meaning the existing skill is being edited).
 * - Otherwise, fallback to `useGetParentNamesAutocompleteForVertical`.
 */
const useGetParentNamesAutocomplete = ({
  currentVerticalId,
  currentSkillId,
  onError
}: {
  currentVerticalId: string
  currentSkillId?: string
  onError?: (error: Error) => void
}) => {
  // Autocomplete based on Skill
  const {
    getParentNamesAutocompleteForSkill,
    data: possibleParentNamesForSkill,
    loading: loadingPossibleParentNamesForSkill
  } = useGetParentNamesAutocompleteForSkill({ onError })

  const {
    search: searchParentForSkill,
    searching: searchingForSkill,
    setSearchTerm: setSearchTermForSkill,
    searchOptions: searchOptionsForSkill,
    selectItem: selectItemForSkill
  } = useDebouncedAutocomplete({
    onSearch: (term: string) => {
      getParentNamesAutocompleteForSkill({
        skillId: currentSkillId || '',
        term
      })
    },
    searchOptions: possibleParentNamesForSkill,
    loadingOptions: loadingPossibleParentNamesForSkill
  })

  // Autocomplete based on Vertical (used when adding a new skill).
  const {
    getParentNamesAutocompleteForVertical,
    data: possibleParentNamesForVertical,
    loading: loadingPossibleParentNamesForVertical
  } = useGetParentNamesAutocompleteForVertical({ onError })

  const {
    search: searchParentForVertical,
    searching: searchingForVertical,
    setSearchTerm: setSearchTermForVertical,
    searchOptions: searchOptionsForVertical,
    selectItem: selectItemForVertical
  } = useDebouncedAutocomplete({
    onSearch: (term: string) => {
      getParentNamesAutocompleteForVertical({
        verticalId: currentVerticalId,
        term
      })
    },
    searchOptions: possibleParentNamesForVertical,
    loadingOptions: loadingPossibleParentNamesForVertical
  })

  const searching = currentSkillId ? searchingForSkill : searchingForVertical
  const searchOptions = currentSkillId
    ? searchOptionsForSkill
    : searchOptionsForVertical

  // Convenience methods
  const search = useCallback(
    (term: string) => {
      if (currentSkillId) {
        return searchParentForSkill(term)
      }

      return searchParentForVertical(term)
    },
    [currentSkillId, searchParentForSkill, searchParentForVertical]
  )

  const setSearchTerm = useCallback(
    (term: string) => {
      if (currentSkillId) {
        return setSearchTermForSkill(term)
      }

      return setSearchTermForVertical(term)
    },
    [currentSkillId, setSearchTermForSkill, setSearchTermForVertical]
  )

  const selectItem = useCallback(
    (label: string) => {
      if (currentSkillId) {
        return selectItemForSkill(label)
      }

      return selectItemForVertical(label)
    },
    [currentSkillId, selectItemForSkill, selectItemForVertical]
  )

  const resetSearchTerm = useCallback(() => {
    setSearchTermForSkill('')
    setSearchTermForVertical('')
  }, [setSearchTermForSkill, setSearchTermForVertical])

  return {
    search,
    setSearchTerm,
    selectItem,
    searching,
    searchOptions,
    resetSearchTerm
  }
}

export default useGetParentNamesAutocomplete
