import React, { useMemo } from 'react'
import { usePagination, Filters } from '@staff-portal/filters'
import { ContentWrapper } from '@staff-portal/page-wrapper'

import {
  PAGE_SIZE,
  SORT_OPTIONS,
  TALENT_INFRACTIONS_QUERY_PARAMS_CONFIG
} from './config'
import { useGetTalentInfractionsList } from './data/get-infractions-list'
import {
  TalentInfractionsListActions,
  TalentInfractionsListContent,
  TalentInfractionsListSearchBar
} from '../../components'
import { createGqlFilterVariables } from './utils'
import { useFiltersConfig } from './hooks'

export const TalentInfractionsList = () => {
  const {
    page,
    limit,
    filterValues,
    pagination,
    resolving,
    handlePageChange,
    handleFilterChange
  } = usePagination({
    config: TALENT_INFRACTIONS_QUERY_PARAMS_CONFIG,
    limit: PAGE_SIZE
  })

  const gqlFilterVariables = useMemo(
    () => createGqlFilterVariables(filterValues, pagination),
    [filterValues, pagination]
  )

  const { data, canCreateTalentInfractions, loading, refetch } =
    useGetTalentInfractionsList(gqlFilterVariables, resolving)

  const { filtersConfig } = useFiltersConfig()

  const isLoading = resolving || loading
  const actions = canCreateTalentInfractions ? (
    <TalentInfractionsListActions onCreate={refetch} />
  ) : undefined

  return (
    <ContentWrapper
      title='Infractions'
      itemsCount={data?.totalCount}
      actions={actions}
    >
      <Filters
        values={filterValues}
        config={filtersConfig}
        onChange={handleFilterChange}
        sortOptions={SORT_OPTIONS}
      >
        {nestableControls => (
          <TalentInfractionsListSearchBar nestableControls={nestableControls} />
        )}
      </Filters>

      <TalentInfractionsListContent
        talentInfractions={data?.talentInfractions}
        totalCount={data?.totalCount}
        page={page}
        loading={isLoading}
        limit={limit}
        onPageChange={handlePageChange}
        onRemove={refetch}
      />
    </ContentWrapper>
  )
}

export default TalentInfractionsList
