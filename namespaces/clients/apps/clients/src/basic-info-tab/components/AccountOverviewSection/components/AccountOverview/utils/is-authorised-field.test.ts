import { GraphQLError } from 'graphql'
import { GraphQLErrorCode } from '@staff-portal/data-layer-service'

import { isAuthorisedField } from './is-authorised-field'

const errorProps = {
  name: 'test',
  message: 'test',
  clientErrors: [],
  networkError: null,
  extraInfo: undefined
}
const gqlError = {
  originalError: undefined,
  path: ['test'],
  name: 'test',
  message: 'test',
  locations: [],
  nodes: [],
  source: undefined,
  extensions: {},
  positions: []
} as GraphQLError

describe('isAuthorisedField', () => {
  it('returns true if field is authorised and no errors', () => {
    expect(isAuthorisedField(undefined, 'test')).toBe(true)
  })

  it('returns false if field is authorised and no similar errors', () => {
    const error = {
      graphQLErrors: [
        {
          ...gqlError,
          extensions: {
            code: GraphQLErrorCode.UNAUTHORIZED
          },
          path: ['foo', 'bar']
        }
      ],
      ...errorProps
    }

    expect(isAuthorisedField(error, 'test')).toBe(true)
  })

  it('returns false if field is not authorised and no similar errors', () => {
    const error = {
      graphQLErrors: [
        {
          ...gqlError,
          extensions: {
            code: GraphQLErrorCode.UNAUTHORIZED
          },
          path: ['foo', 'test']
        }
      ],
      ...errorProps
    }

    expect(isAuthorisedField(error, 'test')).toBe(false)
  })
})
