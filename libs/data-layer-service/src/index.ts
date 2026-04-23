export type {
  ApolloQueryResult,
  BaseQueryOptions,
  DataProxy,
  DefaultOptions,
  DocumentNode,
  Operation,
  OperationVariables,
  PureQueryOptions,
  QueryFunctionOptions,
  RefetchQueriesFunction,
  ServerError,
  ServerParseError,
  WatchQueryFetchPolicy,
  MutationFunctionOptions,
  FetchResult,
  NextLink,
  NormalizedCacheObject
} from '@apollo/client'

export type {
  TypedDocumentNode,
  VariablesOf
} from '@graphql-typed-document-node/core'

export {
  gql,
  execute,
  // could be extended in the future
  // we need to import them everywhere from a single place (from here)
  useApolloClient,
  ApolloClient,
  ApolloError,
  InMemoryCache,
  ApolloLink,
  createHttpLink,
  HttpLink,
  NetworkStatus,
  Observable,
  ObservableSubscription
} from '@apollo/client'
export { ErrorHandler, onError } from '@apollo/client/link/error'

// eslint-disable-next-line import/no-extraneous-dependencies
export type {
  MockedResponse,
  MockedProviderProps
} from '@apollo/client/testing'
// eslint-disable-next-line import/no-extraneous-dependencies
export { MockedProvider } from '@apollo/client/testing'
export { ABORT_KEY, BATCH_KEY, BATCH } from '@topkit/apollo-client'

export type { RefetchQueries } from './apollo/types'

export {
  ANALYTICS_CONTEXT,
  CHRONICLES_CONTEXT,
  KIPPER_CONTEXT,
  LENS_CONTEXT,
  PLATFORM_CONTEXT,
  STAFF_CONTEXT
} from './apollo/config'

export { ApolloProvider } from './apollo/components'

export * from './apollo/enums'

export {
  isAuthorizationGqlError,
  isAuthenticationGqlError,
  isEmptyGqlError,
  isInvalidArgumentGqlError,
  isInvalidArgumentSyntaxGqlError,
  createGraphqlEmptyError,
  isAuthHttpErrorStatusCode,
  isForbiddenHttpErrorStatusCode,
  isNetworkLoading,
  checkIfFieldIsForbidden,
  createApolloClientCache,
  createApolloClientResolvers
} from './apollo/utils'

export { default as createServerError } from './test-utils/create-server-error'
export { default as createApolloError } from './test-utils/create-apollo-error'

export * from './error-handlers/filter-unauthorized-errors'
export * from './error-handlers/filter-third-party-errors'
export * from './error-handlers/has-authorization-error'
export * from './error-handlers/application-error-handlers'
export * from './error-handlers/create-application-error-handlers'
export * from './error-handlers/handle-unauthenticated-request'
export * from './error-handlers/handle-tos-not-accepted-request'

export {
  concatMessages,
  concatMutationErrors,
  encodeGid,
  decodeGid,
  encodeEntityId,
  decodeEntityId
} from './utils'
export { useGetData } from './utils/use-data-handlers/use-get-data'
export { useGetNode } from './utils/use-data-handlers/use-get-node'
export { useGetNodes } from './utils/use-data-handlers/use-get-nodes'
export { useGetStaffNode } from './utils/use-data-handlers/use-get-staff-node'

export type { UseGetDataResult } from './utils/use-data-handlers/use-get-data'

export type {
  LazyQueryTuple,
  MutationTuple,
  QueryResult,
  LazyQueryResult,
  MutationResult,
  QueryHookOptions,
  LazyQueryHookOptions,
  MutationHookOptions,
  MutationValidationError,
  QueryHookAdditionalOptions
} from './hooks'

export {
  useQuery,
  useLazyQuery,
  useMutation,
  useFieldPollingUpdate
} from './hooks'

export {
  applicationErrorHandlers,
  createApplicationErrorHandlers,
  hasAuthorizationError,
  filterUnauthorizedErrors,
  filterThirdPartyErrors,
  filterInvalidArgumentSyntaxErrors,
  handleTosNotAcceptedRequest,
  handleUnauthenticatedRequest
} from './error-handlers'

export {
  CRITICAL_APP_QUERIES_BATCH_KEY,
  GENERAL_APP_QUERIES_BATCH_KEY
} from './config'

export type { SchemaVersionPrefix } from './utils/gql-id-encoder'
