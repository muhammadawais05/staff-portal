import React, { ReactNode } from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { MockedProvider } from '@staff-portal/data-layer-service'

import PERFORMED_ACTIONS from '../../../../fixtures/history-graphql.json'
import MODEL_DESCRIPTIONS from '../../../../fixtures/model-descriptions-graphql.json'
import { MODEL_DESCRIPTION_QUERY } from '../use-model-descriptions-query/gql'
import { usePerformedActionsQuery, SEARCH_CHRONICLES_QUERY } from './gql'

type MockedProviderWrapper = {
  children?: ReactNode
}

const gids = [
  PERFORMED_ACTIONS[0].subjectGID,
  PERFORMED_ACTIONS[0].performerGID
]

const variables = {
  feeds: [['1']],
  limit: 100
}

const hookProps = {
  variables,
  queryOptions: {}
}

const SearchChroniclesQueryMock = {
  request: {
    query: SEARCH_CHRONICLES_QUERY,
    variables
  },
  result: {
    data: {
      viewer: {
        search: {
          entries: [PERFORMED_ACTIONS[0]],
          nextPage: '2'
        }
      }
    }
  }
}
const SearchMoreChroniclesQueryMock = {
  ...SearchChroniclesQueryMock,
  request: {
    ...SearchChroniclesQueryMock.request,
    variables: {
      ...variables,
      after: '2'
    }
  }
}
const SearchChroniclesQueryEmptyMock = {
  request: {
    query: SEARCH_CHRONICLES_QUERY,
    variables
  },
  result: {
    data: {
      viewer: {
        search: {
          entries: [],
          nextPage: null
        }
      }
    }
  }
}

const ModelDescriptionQueryMock = {
  request: {
    query: MODEL_DESCRIPTION_QUERY,
    variables: {
      gids
    }
  },
  result: {
    data: {
      modelDescriptions: MODEL_DESCRIPTIONS
    }
  }
}
const ModelDescriptionQueryEmptyMock = {
  request: {
    query: MODEL_DESCRIPTION_QUERY,
    variables: {
      gids
    }
  },
  result: {
    data: {
      modelDescriptions: []
    }
  }
}

describe('usePerformedActionsQuery hook', () => {
  it('renders hook two times and have the same references of the result variables', async () => {
    const mocks = [SearchChroniclesQueryMock, ModelDescriptionQueryMock]
    const wrapper = ({ children }: MockedProviderWrapper) => (
      <MockedProvider
        mocks={mocks}
        addTypename={false}
        defaultOptions={{
          watchQuery: { fetchPolicy: 'no-cache' },
          query: { fetchPolicy: 'no-cache' }
        }}
      >
        {children as React.ReactElement}
      </MockedProvider>
    )

    const hook = renderHook(
      props => usePerformedActionsQuery(props.variables, props.queryOptions),
      {
        wrapper,
        initialProps: hookProps
      }
    )

    expect(hook.result.current.initialLoading).toBe(true)
    expect(hook.result.current.loading).toBe(true)
    await hook.waitForValueToChange(() => !hook.result.current.loading)

    const prevResult = hook.result.current

    // after re-render of the hook
    hook.rerender(hookProps)

    // we need to have exactly the same results
    expect(hook.result.current.initialLoading).toBe(false)
    expect(hook.result.current.loading).toBe(false)
    expect(prevResult.data).toBe(hook.result.current.data)
    expect(prevResult.loading).toBe(hook.result.current.loading)
    expect(prevResult.error).toBe(hook.result.current.error)
    expect(prevResult.hasMore).toBe(hook.result.current.hasMore)
    expect(prevResult.fetchMore).toBe(hook.result.current.fetchMore)
  })

  it('renders hook two times and have the same references of the result variables when Search Chronicles result is Empty', async () => {
    const mocks = [SearchChroniclesQueryEmptyMock, ModelDescriptionQueryMock]
    const wrapper = ({ children }: MockedProviderWrapper) => (
      <MockedProvider
        mocks={mocks}
        addTypename={false}
        defaultOptions={{
          watchQuery: { fetchPolicy: 'no-cache' },
          query: { fetchPolicy: 'no-cache' }
        }}
      >
        {children as React.ReactElement}
      </MockedProvider>
    )

    const hook = renderHook(
      props => usePerformedActionsQuery(props.variables, props.queryOptions),
      {
        wrapper,
        initialProps: hookProps
      }
    )

    expect(hook.result.current.initialLoading).toBe(true)
    expect(hook.result.current.loading).toBe(true)
    await hook.waitForNextUpdate()

    const prevResult = hook.result.current

    // after re-render of the hook
    hook.rerender(hookProps)

    // we need to have exactly the same results
    expect(hook.result.current.initialLoading).toBe(false)
    expect(hook.result.current.loading).toBe(false)
    expect(prevResult.data).toBe(hook.result.current.data)
    expect(prevResult.loading).toBe(hook.result.current.loading)
    expect(prevResult.error).toBe(hook.result.current.error)
    expect(prevResult.hasMore).toBe(hook.result.current.hasMore)
    expect(prevResult.fetchMore).toBe(hook.result.current.fetchMore)
  })

  it('renders hook two times and have the same references of the result variables when Model Description result is Empty', async () => {
    const mocks = [SearchChroniclesQueryMock, ModelDescriptionQueryEmptyMock]
    const wrapper = ({ children }: MockedProviderWrapper) => (
      <MockedProvider
        mocks={mocks}
        addTypename={false}
        defaultOptions={{
          watchQuery: { fetchPolicy: 'no-cache' },
          query: { fetchPolicy: 'no-cache' }
        }}
      >
        {children as React.ReactElement}
      </MockedProvider>
    )

    const hook = renderHook(
      props => usePerformedActionsQuery(props.variables, props.queryOptions),
      {
        wrapper,
        initialProps: hookProps
      }
    )

    expect(hook.result.current.initialLoading).toBe(true)
    expect(hook.result.current.loading).toBe(true)
    await hook.waitForValueToChange(() => !hook.result.current.loading)

    const prevResult = hook.result.current

    // after re-render of the hook
    hook.rerender(hookProps)

    // we need to have exactly the same results
    expect(hook.result.current.initialLoading).toBe(false)
    expect(hook.result.current.loading).toBe(false)
    expect(prevResult.data).toBe(hook.result.current.data)
    expect(prevResult.loading).toBe(hook.result.current.loading)
    expect(prevResult.error).toBe(hook.result.current.error)
    expect(prevResult.hasMore).toBe(hook.result.current.hasMore)
    expect(prevResult.fetchMore).toBe(hook.result.current.fetchMore)
  })

  it('returns correct `fetchMoreLoading` values', async () => {
    const mocks = [
      SearchChroniclesQueryMock,
      ModelDescriptionQueryMock,
      SearchMoreChroniclesQueryMock
    ]
    const wrapper = ({ children }: MockedProviderWrapper) => (
      <MockedProvider
        mocks={mocks}
        addTypename={false}
        defaultOptions={{
          watchQuery: { fetchPolicy: 'no-cache' },
          query: { fetchPolicy: 'no-cache' }
        }}
      >
        {children as React.ReactElement}
      </MockedProvider>
    )

    const hook = renderHook(
      props => usePerformedActionsQuery(props.variables, props.queryOptions),
      {
        wrapper,
        initialProps: hookProps
      }
    )

    expect(hook.result.current.initialLoading).toBe(true)
    expect(hook.result.current.loading).toBe(true)
    expect(hook.result.current.fetchMoreLoading).toBe(false)

    await hook.waitForValueToChange(() => !hook.result.current.loading)
    expect(hook.result.current.initialLoading).toBe(false)
    expect(hook.result.current.fetchMoreLoading).toBe(false)

    const fetchMore = hook.result.current.fetchMore

    act(() => {
      fetchMore()
    })

    hook.rerender(hookProps)

    await hook.waitForValueToChange(
      () => hook.result.current.fetchMoreLoading === true
    )
    expect(hook.result.current.initialLoading).toBe(false)
    expect(hook.result.current.loading).toBe(false)

    hook.rerender(hookProps)

    expect(hook.result.current.fetchMoreLoading).toBe(false)
    expect(hook.result.current.initialLoading).toBe(false)
    expect(hook.result.current.loading).toBe(false)
  })
})
