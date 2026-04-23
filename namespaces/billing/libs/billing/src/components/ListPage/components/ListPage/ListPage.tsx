import React, { FC, ReactNode } from 'react'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import { Maybe } from '@staff-portal/graphql/staff'
import { SkeletonLoader } from '@toptal/picasso'

import ContentLoader from '../../../ContentLoader'
import ListPagination from '../../../ListPagination'
import ListState, { ListStateOptions } from '../ListState'
import { Entities, ListQueryParams } from '../../../ListContext'

const MAX_LIST_ITEMS = 10000

type ChildFunctionComponent<List, Totals> = FC<{
  list: Entities<List>
  totals?: Entities<Totals>
  totalCount?: Maybe<number>
  loading: boolean
  initialLoading: boolean
}>

interface Props<
  List,
  Totals,
  TFilter,
  URLParams extends ListQueryParams = ListQueryParams
> {
  state: ListStateOptions<List, Totals, TFilter, URLParams>
  title?: string
  actions?: ReactNode | ChildFunctionComponent<List, Totals>
  header?: ReactNode | ChildFunctionComponent<List, Totals>
  search?: ReactNode
  totals?: ReactNode
  table: ChildFunctionComponent<List, Totals>
  isTotalCountVisible?: boolean
}

const ListPage = <
  List extends { totalCount?: Maybe<number> },
  Totals,
  TFilter,
  URLParams extends ListQueryParams = ListQueryParams
>({
  state: stateOptions,
  title,
  actions: actionsComponent,
  header: headerComponent,
  search: searchComponent,
  totals: totalsComponent,
  table: tableComponent,
  isTotalCountVisible = true
}: Props<List, Totals, TFilter, URLParams>) => (
  <ListState options={stateOptions}>
    {({ list, totals, page, pageSize, onPageChange }) => {
      const { data: { totalCount } = {}, loading, initialLoading } = list
      const itemCount = Math.min(totalCount || 0, MAX_LIST_ITEMS)
      const actions =
        typeof actionsComponent === 'function'
          ? actionsComponent({
              list,
              totals,
              totalCount,
              loading,
              initialLoading
            })
          : actionsComponent
      const header =
        typeof headerComponent === 'function'
          ? headerComponent({
              list,
              totals,
              totalCount,
              loading,
              initialLoading
            })
          : headerComponent
      const table = tableComponent({
        list,
        totals,
        totalCount,
        loading,
        initialLoading
      })

      return (
        <ContentWrapper
          title={title}
          actions={actions}
          itemsCount={isTotalCountVisible ? totalCount || undefined : undefined}
        >
          {header}
          {searchComponent && (
            <ContentLoader
              loading={false}
              showSkeleton={initialLoading}
              skeletonComponent={<SkeletonLoader.Typography />}
            >
              {searchComponent}
            </ContentLoader>
          )}
          {totalsComponent}
          {table}
          <ListPagination
            itemCount={itemCount}
            page={page}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
        </ContentWrapper>
      )
    }}
  </ListState>
)

export default ListPage
