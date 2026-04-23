import { ApolloLink, NextLink, Operation } from '@apollo/client'

import { createGraphqlEmptyError } from '../create-graphql-empty-error'

const isNullishArray = (obj?: unknown) => Array.isArray(obj) && obj[0] === null

const isEmptyObject = (obj?: unknown) =>
  obj &&
  typeof obj === 'object' &&
  !Array.isArray(obj) &&
  Object.keys(obj).length === 0

/**
 * there are some cases when `data` is not equal to `null`, but seems to be empty
 * like { data: { node: null }, errors: ... } or { data: { nodes: [null] }, errors: ... }
 * `errors` could be GENERIC_ERROR \ DOWNSTREAM_SERVICE_ERROR or other
 */
const hasAnyNilData = (
  data?: {
    [QueryKey: string]: unknown
  } | null
): boolean =>
  !data ||
  Object.values(data).every(
    obj => obj === null || isNullishArray(obj) || isEmptyObject(obj)
  )

export const createEmptyDataLink = () =>
  new ApolloLink((operation: Operation, forward: NextLink) =>
    forward(operation).map(result => {
      if (!hasAnyNilData(result.data)) {
        return result
      }

      // nullify data
      result.data = null

      /**
       * - if the data is null and there are no errors, create an empty graphql error.
       * It will help to show the page not-found message view.
       *
       * - if the data is null, and we receive any errors, like unauthorize, return those errors.
       * It will help to show custom error messages like the authorized message.
       */
      if (!result.errors?.length) {
        result.errors = [createGraphqlEmptyError()]
      }

      return result
    })
  )
