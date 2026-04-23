/* eslint-disable no-restricted-imports */
import {
  ApolloLink,
  FetchResult,
  gql,
  GraphQLErrorCode,
  Operation,
  Observable,
  onError
} from '@staff-portal/data-layer-service'
import { GraphQLError } from 'graphql'
import { DocumentNode } from 'graphql/language/ast'
import { Source } from 'graphql/language/source'

import { createNewEngagementWizardGraphqlErrorHandler } from './index'

const MockQuery = gql`
  query {
    foo
  }
`

type LinkResult<T> = {
  operation: Operation
  result: FetchResult<T>
}

const executeLink = async <T = unknown, U = unknown>(
  linkToTest: ApolloLink,
  responseToReturn: FetchResult<U> = { data: null }
) => {
  const linkResult = {} as LinkResult<T>

  return new Promise<LinkResult<T>>((resolve, reject) => {
    const terminatingLink = new ApolloLink(() =>
      Observable.of(responseToReturn)
    )

    ApolloLink.execute(ApolloLink.from([linkToTest, terminatingLink]), {
      query: MockQuery
    }).subscribe(
      result => {
        linkResult.result = result as FetchResult<T>
      },
      error => {
        reject(error)
      },
      () => {
        resolve(linkResult)
      }
    )
  })
}

describe('createNewEngagementWizardGraphqlLink', () => {
  describe('when errors array has `missing entity id` error', () => {
    it('returns response with transformed errors', async () => {
      const link = onError(createNewEngagementWizardGraphqlErrorHandler())
      const errors = [
        new GraphQLError(
          'Unknown Client',
          undefined,
          undefined,
          undefined,
          ['newEngagementWizard'],
          undefined,
          {
            argument: 'clientId',
            code: GraphQLErrorCode.INVALID_ARGUMENT
          }
        ),
        new GraphQLError(
          'Unknown Job',
          'nodes' as unknown as DocumentNode[],
          'source' as unknown as Source,
          [0],
          ['newEngagementWizard'],
          new Error('original error'),
          {
            argument: 'jobId',
            code: GraphQLErrorCode.INVALID_ARGUMENT
          }
        ),
        new GraphQLError(
          'Unknown Error',
          undefined,
          undefined,
          undefined,
          ['newEngagementWizard'],
          undefined,
          {
            argument: 'clientId',
            code: GraphQLErrorCode.THIRD_PARTY_SERVICE_ERROR
          }
        ),
        new GraphQLError(
          'Unknown Error',
          undefined,
          undefined,
          undefined,
          ['fooBar'],
          undefined,
          {
            argument: 'foo',
            code: GraphQLErrorCode.UPLOAD_LIMIT_EXCEEDED
          }
        )
      ]

      const { result } = await executeLink(link, {
        data: null,
        errors
      })

      expect(result.errors).toBe(errors)
      expect(result.errors).toEqual([
        errors[0],
        new GraphQLError(
          'Unknown Job',
          'nodes' as unknown as DocumentNode[],
          'source' as unknown as Source,
          [0],
          ['newEngagementWizard'],
          new Error('original error'),
          {
            argument: 'jobId',
            code: GraphQLErrorCode.EMPTY
          }
        ),
        errors[2],
        errors[3]
      ])
      expect(result.errors?.[0].extensions.code).toBe(errors[0].extensions.code)
      expect(result.errors?.[1].extensions.code).toBe(GraphQLErrorCode.EMPTY)
      expect(result.errors?.[2].extensions.code).toBe(errors[2].extensions.code)
      expect(result.errors?.[3].extensions.code).toBe(errors[3].extensions.code)
    })
  })

  describe('when errors array does not have `missing entity id` error', () => {
    it('returns response with original errors', async () => {
      const link = onError(createNewEngagementWizardGraphqlErrorHandler())
      const errors = [
        new GraphQLError(
          'Unknown Client',
          undefined,
          undefined,
          undefined,
          ['newEngagementWizard'],
          undefined,
          {
            argument: 'clientId',
            code: GraphQLErrorCode.INVALID_ARGUMENT
          }
        ),
        new GraphQLError(
          'Unknown Error',
          undefined,
          undefined,
          undefined,
          ['newEngagementWizard'],
          undefined,
          {
            argument: 'clientId',
            code: GraphQLErrorCode.THIRD_PARTY_SERVICE_ERROR
          }
        ),
        new GraphQLError(
          'Unknown Error',
          undefined,
          undefined,
          undefined,
          ['fooBar'],
          undefined,
          {
            argument: 'foo',
            code: GraphQLErrorCode.UPLOAD_LIMIT_EXCEEDED
          }
        )
      ]

      const { result } = await executeLink(link, {
        data: null,
        errors
      })

      expect(result.errors).toBe(errors)
    })
  })
})
