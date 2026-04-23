import React from 'react'
import { Container } from '@toptal/picasso'
import { ItemsList, NoSearchResultsMessage } from '@staff-portal/ui'
import { usePagination, Pagination, toGqlFilter } from '@staff-portal/filters'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import { ClientFilter } from '@staff-portal/graphql/staff'
import { ClientFragment } from '@staff-portal/clients'
import { ObscureClient } from '@staff-portal/clients-applicants'
import ClientsFilters, {
  getOrder,
  GQL_PARAM_CONFIG,
  QUERY_PARAMS_CONFIG
} from '@staff-portal/clients-filters'

import { useGetClientsList } from '../../hooks'
import { PAGE_SIZE, NO_RESULTS_MESSAGE } from './config'
import AddNewCompanyButton from './containers/AddNewCompanyButton/AddNewCompanyButton'
import { ClientCard } from '../../../components/ClientCard/ClientCard'

const getClientKey = ({ id }: ClientFragment) => id
const renderClient = (client: ClientFragment) =>
  client.obscureLead ? (
    <ObscureClient company={client} />
  ) : (
    <ClientCard client={client} type='client' />
  )

export const Clients = () => {
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
    limit: PAGE_SIZE
  })

  const filter = toGqlFilter<Record<string, unknown>, ClientFilter>(
    GQL_PARAM_CONFIG,
    filterValues
  )

  const { data, loading } = useGetClientsList(
    {
      pagination,
      filter,
      order: getOrder(filterValues),
      isClientsList: true
    },
    resolving
  )

  return (
    <ContentWrapper
      title='Companies'
      itemsCount={data.totalCount}
      actions={<AddNewCompanyButton />}
    >
      <ClientsFilters
        filterValues={filterValues}
        handleFilterChange={handleFilterChange}
      />

      <Container top='large'>
        <ItemsList<ClientFragment>
          data={data.clients}
          loading={loading}
          notFoundMessage={
            <NoSearchResultsMessage message={NO_RESULTS_MESSAGE} />
          }
          getItemKey={getClientKey}
          renderItem={renderClient}
          itemWithoutSection
        />
      </Container>

      <Container top='medium'>
        <Pagination
          itemCount={data.totalCount}
          limit={limit}
          activePage={page}
          onPageChange={handlePageChange}
        />
      </Container>
    </ContentWrapper>
  )
}
