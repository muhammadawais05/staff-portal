import {
  Pagination,
  usePagination,
  Filters,
  SearchBar,
  toGqlFilter
} from '@staff-portal/filters'
import { ItemsList, NoSearchResultsMessage } from '@staff-portal/ui'
import ContentWrapper from '@staff-portal/page-wrapper'
import { useGetData } from '@staff-portal/data-layer-service'
import { Container, Link as PicassoLink, Button } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import React from 'react'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { useNotifications } from '@staff-portal/error-handling'
import { TeamsFilter } from '@staff-portal/graphql/staff'

import {
  GetTeamsListDocument,
  TeamListItemFragment
} from './data/get-teams-list/get-teams-list.staff.gql.types'
import useGetPaginationConfig from './services/use-get-pagination-config/use-get-pagination-config'
import TeamListItem from './containers/TeamListItem/TeamListItem'
import { PAGE_SIZE } from './config'
import { useFiltersConfig } from './services/use-filters-config/use-filters-config'
import { TEAMS_LIST_UPDATED } from '../../messages'
import { useGetSearchBarCategories } from './services/use-get-search-bar-categories/use-get-search-bar-categories'
import { useGetGqlParamConfig } from './services/use-get-gql-param-config/use-get-gql-param-config'

const NO_RESULTS_MESSAGE = 'There are no teams for this search criteria'
const getTeamKey = ({ id }: TeamListItemFragment) => id

const TeamsList = () => {
  const { showError } = useNotifications()
  const paginationConfig = useGetPaginationConfig()
  const {
    page,
    limit,
    filterValues,
    handleFilterChange,
    pagination,
    resolving,
    handlePageChange
  } = usePagination({ config: paginationConfig, limit: PAGE_SIZE })
  const searchBarCategories = useGetSearchBarCategories()
  const gqlParamConfig = useGetGqlParamConfig()
  const filtersConfig = useFiltersConfig()

  const filter = toGqlFilter<Record<string, unknown>, TeamsFilter>(
    gqlParamConfig,
    filterValues
  )

  const { data, loading, refetch } = useGetData(GetTeamsListDocument, 'teams')(
    {
      pagination,
      filter
    },
    { skip: resolving }
  )
  const isLoading = resolving || (loading && !data)

  useMessageListener(TEAMS_LIST_UPDATED, refetch)

  return (
    <ContentWrapper
      title='Teams'
      itemsCountLoading={isLoading}
      itemsCount={data?.totalCount}
      actions={
        <Button
          as={Link as typeof PicassoLink}
          // TODO: SPT-2678 please use 'RoutePath.TeamCreate' instead
          href='/teams/create'
          variant='positive'
          size='small'
          noUnderline
        >
          Create Team
        </Button>
      }
    >
      <Filters
        values={filterValues}
        onChange={handleFilterChange}
        config={filtersConfig}
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

      <Container top='large'>
        <ItemsList<TeamListItemFragment>
          data={data?.nodes}
          loading={loading}
          itemWithoutSection
          notFoundMessage={
            <NoSearchResultsMessage message={NO_RESULTS_MESSAGE} />
          }
          getItemKey={getTeamKey}
          renderItem={(team, index) => <TeamListItem team={team} key={index} />}
        />
      </Container>

      <Container top='medium'>
        <Pagination
          activePage={page}
          onPageChange={handlePageChange}
          limit={limit}
          itemCount={data?.totalCount}
        />
      </Container>
    </ContentWrapper>
  )
}

export default TeamsList
