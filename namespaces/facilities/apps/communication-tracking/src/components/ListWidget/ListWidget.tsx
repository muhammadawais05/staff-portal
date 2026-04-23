import React, { useEffect, useMemo, ReactNode } from 'react'
import { Pagination, Container, Loader } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { ApolloError } from '@staff-portal/data-layer-service'
import {
  Filters,
  FiltersConfig,
  SearchBar,
  SearchBarCategories,
  SortOption
} from '@staff-portal/filters'

import { useListWidgetState } from './use-list-widget-state'
import { SEARCH_BAR_URL_PARAM_NAME } from './config'
import * as S from './styles'

interface Pagination {
  perPage: number
  count: number
}

const parsePage = (urlPage: string | undefined = '') => parseInt(urlPage) || 1

const getPagesCount = (pagination: Pagination | undefined) =>
  pagination ? Math.ceil(pagination.count / pagination.perPage) : undefined

const getIsUnexpectedError = (
  error: ApolloError | undefined,
  redirectToPageNum: number | null
): boolean => Boolean(error && !redirectToPageNum)

const getContent = ({
  redirectToPageNum,
  filterValuesLoading,
  children
}: {
  redirectToPageNum: number | null
  filterValuesLoading?: boolean
  children: ReactNode
}) => {
  if (redirectToPageNum) {
    return <Loader>Redirecting...</Loader>
  }
  if (filterValuesLoading) {
    return (
      <Container css={S.disabledContainer}>
        <Loader css={S.loadingIndicator} />
      </Container>
    )
  }

  return children
}

export interface Props {
  searchBarCategories?: SearchBarCategories
  isSearchBarShown?: boolean
  error: ApolloError | undefined
  config?: FiltersConfig
  sortOptions?: SortOption[]
  fetchData: (listWidgetValues: Record<string, unknown>) => void
  areFiltersShown?: boolean
  pagination?: Pagination
  children?: ReactNode
}

// TODO: fix the complexity issue as part of the https://toptal-core.atlassian.net/browse/SP-563

const ListWidget = ({
  searchBarCategories = [],
  config = [],
  sortOptions = [],
  error,
  fetchData,
  areFiltersShown = true,
  isSearchBarShown = true,
  pagination,
  children
}: Props) => {
  const {
    page,
    setPage,
    filterValues,
    filterValuesLoading,
    handleFilterChange
  } = useListWidgetState(searchBarCategories)

  const { showError } = useNotifications()

  const pagesCount = useMemo(() => getPagesCount(pagination), [pagination])
  const redirectToPageNum = useMemo(() => {
    const pageNumber = parsePage(page)

    if (pageNumber < 1) {
      return 1
    }

    if (pagesCount && pagesCount < pageNumber) {
      return pagesCount
    }

    return null
  }, [pagesCount, page])

  useEffect(() => {
    if (redirectToPageNum) {
      setPage(redirectToPageNum)
    }
  }, [redirectToPageNum, setPage])

  useEffect(() => {
    if (!filterValuesLoading) {
      fetchData({ ...filterValues, page })
    }

    // Autofix for the ignored rule ([filterValues, onFiltersChange]) causes infinite loop. As "onFiltersChange"
    // handler is always the same, no need to have it in dependencies (https://github.com/facebook/react/issues/14920)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValues, page, filterValuesLoading])

  if (getIsUnexpectedError(error, redirectToPageNum)) {
    throw error
  }

  const content = getContent({
    redirectToPageNum,
    filterValuesLoading,
    children
  })

  return (
    <>
      {areFiltersShown && (
        <Filters
          values={filterValues}
          config={config}
          onChange={handleFilterChange}
          sortOptions={sortOptions}
        >
          {nestableControls =>
            isSearchBarShown && (
              <SearchBar
                name={SEARCH_BAR_URL_PARAM_NAME}
                categories={searchBarCategories}
                nestableControls={nestableControls}
                onError={() => showError('Unable to fetch items.')}
              />
            )
          }
        </Filters>
      )}
      {content}
      {pagesCount && !filterValuesLoading ? (
        <Container top='large'>
          <Pagination
            activePage={parsePage(page)}
            onPageChange={setPage}
            totalPages={pagesCount}
          />
        </Container>
      ) : null}
    </>
  )
}

export default ListWidget
