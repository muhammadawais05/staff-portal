// TODO: remove eslint-disable below in real hook
/* eslint-disable @typescript-eslint/no-unused-vars */

import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { ApolloClient } from '@staff-portal/data-layer-service'

// TODO: every autocomplete search bar dropdown category should have its
// own hook to fetch options. In case of Talent List filter the categories
// are: Skills, Keywords, Names, Languages, Job Skills (Emails is a regular
// input without autocomplete).
//
// Please note that every category hook (like this one) has two exports:
// - useGetTalent[CATEGORY_NAME]Autocomplete() for fetching autocomplete options
//   when users type something in the search bar
// - getTalent[CATEGORY_NAME]Autocomplete() for fetching the information about options
//   that were provided via URL when the page loads (so the corresponding
//   filter badges will be populated with human-readable texts)

// TODO: see the useGetTaskKeywordsAutocomplete() as an example
export const useGetTalentSearchBarCategoryAutocomplete = ({
  limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  offset = 0
}: {
  limit?: number
  offset?: number
} = {}) => ({
  data: [],
  loading: false,
  errors: undefined
})

// TODO: see the getTaskKeywordsAutocomplete() as an example
export const getTalentSearchBarCategoryAutocomplete = async (
  term: string,
  limit: number = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  client: ApolloClient<object>
) => ({
  data: [],
  loading: false,
  errors: undefined
})
