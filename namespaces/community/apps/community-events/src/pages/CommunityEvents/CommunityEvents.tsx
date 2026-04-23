import React from 'react'
import { Container } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import {
  Filters,
  Pagination,
  SearchBar,
  toGqlFilter,
  usePagination
} from '@staff-portal/filters'
import { CommunityEventFilter } from '@staff-portal/graphql/staff'

import CommunityEventList from '../../components/CommunityEventList/CommunityEventList'
import CommunityEventListLoader from '../../components/CommunityEventListLoader/CommunityEventListLoader'
import { useGetCommunityEvents } from '../../data/get-community-events/get-community-events.staff.gql'
import { useFiltersConfig } from '../../services/use-filters-config/use-filters-config'
import { useGetGqlParamConfig } from '../../services/use-get-gql-param-config/use-get-gql-param-config'
import { useGetPaginationConfig } from '../../services/use-get-pagination-config/use-get-pagination-config'
import { useGetSearchBarCategories } from '../../services/use-get-search-bar-categories/use-get-search-bar-categories'

const PAGINATION_LIMIT_OPTIONS = [10, 15, 20, 25]
const ITEMS_PER_PAGE = 10

const CommunityEvents = () => {
  const { showError } = useNotifications()
  const gqlParamConfig = useGetGqlParamConfig()
  const searchBarCategories = useGetSearchBarCategories()
  const filtersConfig = useFiltersConfig()
  const paginationConfig = useGetPaginationConfig(searchBarCategories)
  const {
    page,
    limit,
    pagination,
    filterValues,
    handlePageChange,
    handleFilterChange
  } = usePagination({
    config: paginationConfig,
    limit: ITEMS_PER_PAGE
  })

  const filter = toGqlFilter<Record<string, unknown>, CommunityEventFilter>(
    gqlParamConfig,
    filterValues
  )

  const { data: communityEvents, loading } = useGetCommunityEvents({
    variables: {
      pagination,
      filter
    }
  })

  return (
    <ContentWrapper
      title='Toptal Community Events'
      itemsCount={communityEvents?.totalCount ?? 0}
    >
      <Filters
        values={{ ...filterValues, limit }}
        onChange={handleFilterChange}
        config={filtersConfig}
        limitOptions={PAGINATION_LIMIT_OPTIONS}
      >
        {nestableControls => (
          <SearchBar
            name='badges'
            categories={searchBarCategories}
            nestableControls={nestableControls}
            onError={() => showError('Unable to fetch items.')}
          />
        )}
      </Filters>

      <Container top='large' bottom='large'>
        {loading ? (
          <CommunityEventListLoader />
        ) : (
          <CommunityEventList communityEvents={communityEvents?.nodes ?? []} />
        )}
      </Container>

      <Pagination
        activePage={page}
        itemCount={communityEvents?.totalCount}
        limit={limit}
        onPageChange={handlePageChange}
      />
    </ContentWrapper>
  )
}

export default CommunityEvents
