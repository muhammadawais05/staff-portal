import { useDebouncedCallback } from 'use-debounce'
import { AutocompleteModels } from '@staff-portal/graphql/staff'

import { useQueryAutocompleteLazyQuery } from '../../data'

export const DEBOUNCE_LIMIT = 500
export const DROPDOWN_RESULTS_LIMIT = 8

export const useGetAutocompleteOptions = (model: AutocompleteModels) => {
  const [requestOptions, { data, loading }] = useQueryAutocompleteLazyQuery()
  const getOptions = (term: string) =>
    requestOptions({
      variables: {
        term,
        model,
        offset: 0,
        limit: DROPDOWN_RESULTS_LIMIT
      }
    })

  const getOptionsDebounced = useDebouncedCallback(getOptions, DEBOUNCE_LIMIT, {
    leading: true
  })
  const options = data?.autocomplete?.edges || []

  return {
    getOptions,
    getOptionsDebounced,
    options,
    loading
  }
}
