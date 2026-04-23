import { ApolloError } from '@apollo/client'

import { GraphQLErrorCode } from '../../enums'
import { checkIfFieldIsForbidden } from '../check-if-field-is-forbidden'

const createGqlResponseErrors = (
  path: (string | number)[]
): Pick<ApolloError, 'graphQLErrors'> => ({
  graphQLErrors: [
    {
      extensions: {
        code: GraphQLErrorCode.UNAUTHORIZED
      },
      path,
      message: '',
      locations: [],
      nodes: [],
      source: undefined,
      positions: [],
      originalError: null,
      name: ''
    }
  ]
})

const CHECKED_FIELD_NAME = 'testField'

describe('checkIfFieldIsForbidden', () => {
  describe('when there is an unauthorized error in GQL response for specific field', () => {
    it('returns true', () => {
      const gqlResponseErrors = createGqlResponseErrors([
        'node',
        CHECKED_FIELD_NAME
      ])

      expect(
        checkIfFieldIsForbidden(
          CHECKED_FIELD_NAME,
          gqlResponseErrors as ApolloError
        )
      ).toBeTruthy()
    })
  })

  describe('when there is no unauthorized error in GQL response for specific field', () => {
    it('returns false', () => {
      const gqlResponseErrors = createGqlResponseErrors([
        'node',
        'anotherField'
      ])

      expect(
        checkIfFieldIsForbidden(
          CHECKED_FIELD_NAME,
          gqlResponseErrors as ApolloError
        )
      ).toBeFalsy()
    })
  })
})
