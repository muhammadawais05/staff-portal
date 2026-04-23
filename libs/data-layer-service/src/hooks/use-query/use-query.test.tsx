import { gql, useQuery as ApolloUseQuery } from '@apollo/client'
import { when } from 'jest-when'

import { useQuery } from './use-query'
import {
  filterThirdPartyErrors,
  filterUnauthorizedErrors
} from '../../error-handlers'
import { createApolloError } from '../../test-utils'
import { GraphQLErrorCode } from '../../types'

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn()
}))

const mockApolloUseQuery = ApolloUseQuery as jest.Mock

const QUERY_UNAUTHORIZED_ERROR = gql`
  query gettingUnauthorizedError {
    availableTimeZones {
      value
    }
  }
`
const errorMessage = 'This is a mocked error'

const unauthorizedError = createApolloError(
  errorMessage,
  GraphQLErrorCode.UNAUTHORIZED
)

const unauthorizedErrorResponse = {
  title: 'UNAUTHORIZED ERROR',
  error: { ...unauthorizedError },
  loading: false
}

const QUERY_THIRD_PARTY_ERROR = gql`
  query gettingThirdPartyError {
    availableTimeZones {
      value
    }
  }
`
const thirdPartyError = createApolloError(
  errorMessage,
  GraphQLErrorCode.THIRD_PARTY_SERVICE_ERROR
)

const thirdPartyErrorResponse = {
  error: thirdPartyError,
  loading: false
}

const QUERY_OTHER_ERROR = gql`
  query gettingOtherError {
    availableTimeZones {
      value
    }
  }
`
const otherError = createApolloError(errorMessage, GraphQLErrorCode.EMPTY)

const otherErrorResponse = {
  error: otherError,
  loading: false
}

describe('filter errors from useQuery', () => {
  beforeEach(() => {
    when(mockApolloUseQuery)
      .calledWith(QUERY_UNAUTHORIZED_ERROR, expect.anything())
      .mockReturnValue({ ...unauthorizedErrorResponse })
      .calledWith(QUERY_THIRD_PARTY_ERROR, expect.anything())
      .mockReturnValue({ ...thirdPartyErrorResponse })
      .calledWith(QUERY_OTHER_ERROR, expect.anything())
      .mockReturnValue({ ...otherErrorResponse })
  })

  it('should not throw Unauthorized error', async () => {
    const { error } = useQuery(QUERY_UNAUTHORIZED_ERROR, {
      throwOnError: true,
      errorFilters: [filterUnauthorizedErrors, filterThirdPartyErrors]
    })

    expect(error).not.toBeNull()
    expect(error).toBeDefined()

    expect(
      error?.graphQLErrors.some(
        graphQLError =>
          graphQLError?.extensions?.code === GraphQLErrorCode.UNAUTHORIZED
      )
    ).toBeTruthy()
  })

  it('should not throw ThirdParty error', async () => {
    const { error } = useQuery(QUERY_THIRD_PARTY_ERROR, {
      throwOnError: true,
      errorFilters: [filterUnauthorizedErrors, filterThirdPartyErrors]
    })

    expect(error).not.toBeNull()
    expect(error).toBeDefined()

    expect(
      error?.graphQLErrors.some(
        graphQLError =>
          graphQLError?.extensions?.code ===
          GraphQLErrorCode.THIRD_PARTY_SERVICE_ERROR
      )
    ).toBeTruthy()
  })

  it('should throw an Error for not filtered error', async () => {
    expect(() => {
      useQuery(QUERY_OTHER_ERROR, {
        throwOnError: true,
        errorFilters: [filterUnauthorizedErrors, filterThirdPartyErrors]
      })
    }).toThrow()
  })

  it('should throw an Error without `errorFilters` option', async () => {
    expect(() => {
      useQuery(QUERY_OTHER_ERROR, { throwOnError: true })
    }).toThrow()
  })
})
