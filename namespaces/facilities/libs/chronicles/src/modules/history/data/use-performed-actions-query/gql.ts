import { useCallback, useMemo, useState } from 'react'
import pathOr from 'ramda/src/pathOr'
import { CHRONICLES_CONTEXT, gql, useQuery } from '@staff-portal/data-layer-service'

import {
  compileRecord,
  getUniqueIds,
  PerformedAction
} from '../../../template-compiler'
import {
  BaseQueryOptions,
  Entry,
  QueryResult,
  SearchChroniclesVariables
} from '../../types'
import { useModelDescriptionsQuery } from '../use-model-descriptions-query'

export const SEARCH_CHRONICLES_QUERY = gql`
  query SearchChronicles(
    $feeds: [[String!]!]!
    $actions: [String!]
    $occurredAt: DateRange
    $before: ID
    $after: ID
    $limit: Int = 25
    $subjectGids: [GID!]
    $performerGids: [GID!]
    $payload: PayloadFilter
    $jwt: ChroniclesJWT!
  ) {
    viewer(jwt: $jwt) {
      search(
        feeds: $feeds
        actions: $actions
        occurredAt: $occurredAt
        before: $before
        after: $after
        limit: $limit
        subjectGids: $subjectGids
        performerGids: $performerGids
        payload: $payload
      ) {
        nextPage
        entries {
          id
          occurredAt
          action
          subjectGID
          subjectName
          performerGID
          comment
          payload
          template
        }
      }
    }
  }
`

const updateHistoryResultQuery = (
  previousResult: any,
  { fetchMoreResult }: any
) => {
  const newEntries = pathOr<[]>(
    [],
    ['viewer', 'search', 'entries'],
    fetchMoreResult
  )
  const previousEntries = previousResult.viewer.search.entries

  return newEntries.length
    ? {
        viewer: {
          ...fetchMoreResult.viewer,
          search: {
            ...fetchMoreResult.viewer.search,
            entries: [...previousEntries, ...newEntries]
          }
        }
      }
    : previousResult
}

export const useSearchChroniclesQuery = (
  variables: SearchChroniclesVariables,
  { skip, pollInterval, fetchPolicy }: BaseQueryOptions
): QueryResult<PerformedAction> => {
  const { data, initialLoading, loading, error, fetchMore } = useQuery<
    PerformedAction[],
    SearchChroniclesVariables
  >(SEARCH_CHRONICLES_QUERY, {
    variables,
    skip,
    pollInterval,
    // TODO: remove this hack as soon as apollo hook issue will be fixed
    // https://github.com/apollographql/react-apollo/issues/3425
    // It causes the issue that data is not updated after jwt token is received
    // because apollo is trying to retry the same query with the same list of
    // variables and returns data from cache (memo), which is undefined
    fetchPolicy: fetchPolicy || 'network-only',
    context: { type: CHRONICLES_CONTEXT }
  })

  const [fetchMoreLoading, setFetchMoreLoading] = useState(false)
  const entries = useMemo(
    () => pathOr([], ['viewer', 'search', 'entries'], data),
    [data]
  )
  const nextPage = pathOr('', ['viewer', 'search', 'nextPage'], data)

  const fetchNextPage = useCallback(async () => {
    setFetchMoreLoading(true)

    const result = await fetchMore({
      variables: { after: nextPage },
      updateQuery: updateHistoryResultQuery
    })

    setFetchMoreLoading(false)

    return result
  }, [nextPage, fetchMore])

  return {
    data: entries,
    initialLoading,
    loading,
    fetchMoreLoading,
    error,
    hasMore: Boolean(nextPage),
    fetchMore: fetchNextPage
  }
}

export const usePerformedActionsQuery = (
  variables: SearchChroniclesVariables,
  options: BaseQueryOptions = {}
): QueryResult<Entry> => {
  const {
    data: historyResultData,
    initialLoading: historyResultInitialLoading,
    loading: historyResultLoading,
    fetchMoreLoading: historyResultFetchMoreLoading,
    error: historyResultError,
    hasMore,
    fetchMore
  } = useSearchChroniclesQuery(variables, options)

  const gids = getUniqueIds(historyResultData)
  const {
    data: modelDescriptionResultData,
    initialLoading: modelDescriptionResultInitialLoading,
    loading: modelDescriptionResultLoading,
    error: modelDescriptionResultError
  } = useModelDescriptionsQuery(gids)

  const initialLoading =
    historyResultInitialLoading || modelDescriptionResultInitialLoading
  const loading = historyResultLoading || modelDescriptionResultLoading
  const fetchMoreLoading = historyResultFetchMoreLoading

  const error = historyResultError || modelDescriptionResultError
  const data = useMemo<Entry[]>(() => {
    if (initialLoading) {
      return []
    }

    return historyResultData.map((performedAction: PerformedAction) => ({
      performedAction,
      literals: compileRecord(performedAction, modelDescriptionResultData)
    }))
  }, [historyResultData, modelDescriptionResultData, initialLoading])

  return {
    data,
    initialLoading,
    loading,
    fetchMoreLoading,
    error,
    hasMore,
    fetchMore
  }
}
