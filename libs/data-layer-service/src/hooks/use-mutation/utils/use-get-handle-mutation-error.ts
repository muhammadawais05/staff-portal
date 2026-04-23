import { ApolloError } from '@apollo/client'
import { useNotifications } from '@toptal/picasso/utils'

const NETWORK_ERROR_MESSAGE = 'Failed to fetch'

const useGetHandleMutationError = ({
  onError,
  onRootLevelError
}: {
  onError?: (error: ApolloError) => void
  onRootLevelError?: (error: ApolloError) => void
}) => {
  const { showError } = useNotifications()

  return (error: ApolloError) => {
    if (error.networkError?.message === NETWORK_ERROR_MESSAGE) {
      showError('Submit failed. Please check your internet connection.')

      return error
    }

    if (onError) {
      return onError(error)
    }

    return onRootLevelError?.(error)
  }
}

export default useGetHandleMutationError
