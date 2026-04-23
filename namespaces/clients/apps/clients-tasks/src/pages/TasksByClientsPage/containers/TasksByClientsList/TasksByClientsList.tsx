import React from 'react'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import { Redirect } from '@staff-portal/navigation'
import { RoutePath } from '@staff-portal/routes'
import ClientsFilters, {
  getOrder,
  GQL_PARAM_CONFIG,
  QUERY_PARAMS_CONFIG
} from '@staff-portal/clients-filters'
import { ClientFilter } from '@staff-portal/graphql/staff'
import { usePagination, Pagination, toGqlFilter } from '@staff-portal/filters'
import { Container } from '@toptal/picasso'
import { ItemsList, NoSearchResultsMessage } from '@staff-portal/ui'

import { NO_RESULTS_MESSAGE, PAGE_SIZE } from './config'
import { useGetClientsNamesAndTotalCount } from './data'
import ClientListTaskCard from './components/ClientListTaskCard/ClientListTaskCard'
import { normalizeSort } from '../../utils/normalize-sort'

const TasksByClientsList = () => {
  const {
    pagination,
    filterValues,
    resolving,
    page,
    limit,
    handlePageChange,
    handleFilterChange
  } = usePagination({
    config: QUERY_PARAMS_CONFIG,
    limit: PAGE_SIZE,
    normalizeFilters: normalizeSort
  })

  const filter = toGqlFilter<Record<string, unknown>, ClientFilter>(
    GQL_PARAM_CONFIG,
    filterValues
  )

  const { totalCount, clients, loading, canSeeCompanyTasks } =
    useGetClientsNamesAndTotalCount(
      {
        pagination,
        filter,
        order: getOrder(filterValues)
      },
      resolving
    )

  if (!loading && canSeeCompanyTasks === false) {
    return <Redirect to={RoutePath.Dashboard} />
  }

  return (
    <ContentWrapper title='Tasks By Companies' itemsCount={totalCount}>
      <ClientsFilters
        filterValues={filterValues}
        handleFilterChange={handleFilterChange}
      />

      <Container top='large'>
        <ItemsList
          data={clients}
          loading={loading}
          notFoundMessage={
            <NoSearchResultsMessage message={NO_RESULTS_MESSAGE} />
          }
          getItemKey={({ id }) => id}
          renderItem={client => (
            <ClientListTaskCard client={client} key={client.id} />
          )}
          itemWithoutSection
        />
      </Container>

      <Container top='medium'>
        <Pagination
          itemCount={totalCount}
          limit={limit}
          activePage={page}
          onPageChange={handlePageChange}
        />
      </Container>
    </ContentWrapper>
  )
}

export default TasksByClientsList
