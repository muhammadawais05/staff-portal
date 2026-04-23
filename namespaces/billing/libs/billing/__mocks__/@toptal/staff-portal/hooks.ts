import {
  useQuery as useApolloQuery,
  useLazyQuery as useApolloLazyQuery,
  useMutation as useApolloMutation
} from '@apollo/client'

export const useQuery = (...args: Parameters<typeof useApolloQuery>) => {
  const { loading, previousData, ...rest } = useApolloQuery(...args)

  return {
    ...rest,
    loading,
    previousData,
    initialLoading: loading && previousData === undefined
  }
}

export const useLazyQuery = useApolloLazyQuery
export const useMutation = useApolloMutation
