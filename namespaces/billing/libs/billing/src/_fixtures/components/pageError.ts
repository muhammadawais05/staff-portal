export const mockNetworkError = {
  graphQLErrors: [],
  name: '',
  extraInfo: 'example extra information',
  message: 'Network error',
  networkError: {
    name: 'Server error',
    message: '',
    response: { status: 400 },
    result: { errors: [{ key: 'example', message: 'example error message' }] },
    statusText: 'example statusText'
  }
}

export const mockGQLErrors = {
  extraInfo: 'example extra information',
  graphQLErrors: [
    {
      extensions: { a: 'a', b: 'b' },
      message: 'full gql error',
      nodes: { a: 'a', b: 'b' },
      originalError: { a: 'a', b: 'b' },
      path: { a: 'a', b: 'b' },
      positions: { a: 'a', b: 'b' },
      source: { a: 'a', b: 'b' }
    },
    {
      message: 'just message option'
    }
  ],
  message: 'Network error'
}
