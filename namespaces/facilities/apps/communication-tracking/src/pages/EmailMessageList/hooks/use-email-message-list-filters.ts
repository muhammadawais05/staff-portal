import { useEffect, useMemo } from 'react'
import { Pagination } from '@toptal/picasso'
import { ApolloError } from '@staff-portal/data-layer-service'
import {
  SearchBarCategories,
  SortOption,
  SortOrder
} from '@staff-portal/filters'

import { useListWidgetState } from '../../../components/ListWidget/use-list-widget-state'

interface Pagination {
  perPage: number
  count: number
}

const parsePage = (urlPage: string | undefined = '') => parseInt(urlPage) || 1

const getIsUnexpectedError = (
  error: ApolloError | undefined,
  redirectToPageNum: number | null
): boolean => Boolean(error && !redirectToPageNum)

const getPagesCount = (pagination: Pagination | undefined) =>
  pagination ? Math.ceil(pagination.count / pagination.perPage) : 1

export interface Props {
  searchBarCategories?: SearchBarCategories
  fetchData: (listWidgetValues: Record<string, unknown>) => void
  error: ApolloError | undefined
  pagination?: Pagination
}

export const SORT_OPTIONS: SortOption[] = [
  {
    text: 'Date Sent',
    value: 'sent_at',
    defaultSort: SortOrder.DESC
  }
]

export const useEmailMessageListFilters = ({
  searchBarCategories = [],
  fetchData,
  pagination,
  error
}: Props) => {
  const {
    page,
    setPage,
    filterValues,
    filterValuesLoading,
    handleFilterChange
  } = useListWidgetState(searchBarCategories)
  // TODO: Remove List widget state and use common filter hooks: https://toptal-core.atlassian.net/browse/SPC-1604

  const pagesCount = useMemo(() => getPagesCount(pagination), [pagination])
  const pageNumber = useMemo(() => parsePage(page), [page])
  const redirectToPageNum = useMemo(() => {
    if (pageNumber < 1) {
      return 1
    }

    if (pagesCount && pagesCount < pageNumber) {
      return pagesCount
    }

    return null
  }, [pagesCount, pageNumber])

  useEffect(() => {
    if (redirectToPageNum) {
      setPage(redirectToPageNum)
    }
  }, [redirectToPageNum, setPage])

  useEffect(() => {
    if (!filterValuesLoading) {
      fetchData({ ...filterValues, page })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValues, page, filterValuesLoading])

  if (getIsUnexpectedError(error, redirectToPageNum)) {
    throw error
  }

  return {
    page: pageNumber,
    pagesCount,
    setPage,
    filterValues,
    filterValuesLoading,
    handleFilterChange,
    sortOptions: SORT_OPTIONS
  }
}
