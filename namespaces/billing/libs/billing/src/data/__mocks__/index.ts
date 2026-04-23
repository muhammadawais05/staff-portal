export const useGetExperiments = jest.fn().mockReturnValue({
  data: null,
  loading: false,
  initialLoading: false,
  refetch: null
})

export const QueryAutocompleteDocument = jest.fn()
export const useQueryAutocomplete = jest.fn()
export const useQueryAutocompleteLazyQuery = jest.fn()
