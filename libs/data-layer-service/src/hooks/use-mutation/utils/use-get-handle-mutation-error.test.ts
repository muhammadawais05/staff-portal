import { ApolloError } from '@apollo/client'
import { renderHook } from '@testing-library/react-hooks'
import { useNotifications } from '@toptal/picasso/utils'
import { GraphQLError } from 'graphql'

import useGetHandleMutationError from './use-get-handle-mutation-error'

jest.mock('@toptal/picasso/utils')

const arrangeTest = (
  apolloError: Partial<ApolloError>,
  params: {
    onError?: (error: ApolloError) => void
    onRootLevelError?: (error: ApolloError) => void
  }
) => {
  const showError = jest.fn()

  const mockedUseNotifications = useNotifications as jest.Mock

  mockedUseNotifications.mockReturnValue({ showError })

  const {
    result: { current: handleMutationError }
  } = renderHook(() => useGetHandleMutationError(params))

  const newApolloError = {
    networkError: null,
    message: 'some graphql error',
    graphQLErrors: [new GraphQLError('test error')],
    clientErrors: [],
    name: '',
    extraInfo: null,
    ...apolloError
  }

  handleMutationError(newApolloError)

  return {
    showError,
    apolloError: newApolloError
  }
}

describe('useGetHandleMutationError', () => {
  it('handles network error automatically', () => {
    const { showError } = arrangeTest(
      { networkError: new Error('Failed to fetch') },
      {}
    )

    expect(showError).toHaveBeenCalledWith(
      'Submit failed. Please check your internet connection.'
    )
  })

  it('handles other errors with onError', () => {
    const onError = jest.fn()
    const { showError, apolloError } = arrangeTest(
      { graphQLErrors: [new GraphQLError('test error')] },
      { onError }
    )

    expect(showError).not.toHaveBeenCalled()
    expect(onError).toHaveBeenCalledWith(apolloError)
  })

  it('handles other errors with onRootLevelError', () => {
    const onRootLevelError = jest.fn()
    const { showError, apolloError } = arrangeTest(
      { graphQLErrors: [new GraphQLError('test error')] },
      { onRootLevelError }
    )

    expect(showError).not.toHaveBeenCalled()
    expect(onRootLevelError).toHaveBeenCalledWith(apolloError)
  })
})
