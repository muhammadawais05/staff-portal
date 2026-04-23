import React, { useCallback } from 'react'
import { Container } from '@toptal/picasso'
import { NUMBER_OF_ITEMS_DISPLAY_LIMIT } from '@staff-portal/config'
import { PageLoader } from '@staff-portal/ui'
import {
  QueryParams,
  QueryParamsOptions
} from '@staff-portal/query-params-state'
import {
  Filters,
  Pagination,
  dateRangeQueryParam,
  usePagination
} from '@staff-portal/filters'
import { formatNumber } from '@staff-portal/utils'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import { Talent } from '@staff-portal/talents-screening-specialists'

import {
  useGetTalentsWithScreeningSpecialistList,
  createGqlFilterVariables
} from '../../data/get-talents-with-screening-specialist-list'
import { useSelection, useFiltersConfig } from '../../hooks'
import TalentListSearchBar from '../../components/TalentListSearchBar'
import ArchiveButton from '../../components/ArchiveButton'
import TalentTable from '../../components/TalentTable'
import BulkAssignDropdown from '../../components/BulkAssignDropdown'
import { PAGE_SIZE } from '../../config'

const getItemsCountTooltip = (itemsCount: number | undefined) => {
  if (!itemsCount || NUMBER_OF_ITEMS_DISPLAY_LIMIT >= itemsCount) {
    return undefined
  }

  const count = formatNumber(itemsCount)

  const limit = formatNumber(NUMBER_OF_ITEMS_DISPLAY_LIMIT)

  return `Actual result is ${count}, but only up to the first ${limit} items can be shown in the results below`
}

const QUERY_PARAMS_CONFIG: QueryParamsOptions = {
  screening_specialist_assigned_on: dateRangeQueryParam,
  screening_specialist_assignment_archived_on: dateRangeQueryParam,
  screening_specialist_assignment_next_check_on: dateRangeQueryParam,
  screening_inactivity_rejection_deadline_date: dateRangeQueryParam
}

const TalentList = () => {
  const {
    page,
    pagination,
    filterValues,
    limit,
    resolving: queryParamsResolving,
    handlePageChange,
    handleFilterChange
  } = usePagination({
    config: QUERY_PARAMS_CONFIG,
    limit: PAGE_SIZE
  })

  const {
    selected: selectedTalentIds,
    setSelected: setSelectedTalentIds,
    addSelected: addSelectedTalentId,
    removeSelected: removeSelectedTalentId
  } = useSelection<string>(new Set())

  const {
    talentData,
    loading
    // refetch: refetchTalents
  } = useGetTalentsWithScreeningSpecialistList(
    createGqlFilterVariables(filterValues, pagination),
    queryParamsResolving
  )

  // Should be used after Bulk Assign, Bulk Archive, etc.
  // const refreshTalentList = useCallback(() => {
  //   refetchTalents()
  // }, [refetchTalents])

  const onPageChange = useCallback(
    (newPage: number) => {
      setSelectedTalentIds(new Set())
      handlePageChange(newPage)
    },
    [handlePageChange, setSelectedTalentIds]
  )

  const onFilterChange = useCallback(
    (values: QueryParams) => {
      setSelectedTalentIds(new Set())
      handleFilterChange(values)
    },
    [handleFilterChange, setSelectedTalentIds]
  )

  const handleTalentSelectionToggle = useCallback(
    (checked: boolean, talent: Talent) =>
      checked
        ? addSelectedTalentId(talent.id)
        : removeSelectedTalentId(talent.id),
    [addSelectedTalentId, removeSelectedTalentId]
  )

  const handleAllTalentSelectionToggle = (checked: boolean) => {
    setSelectedTalentIds(
      checked ? new Set(talents.map(talent => talent.id)) : new Set()
    )
  }

  const { filtersConfig } = useFiltersConfig()

  if (queryParamsResolving || !talentData) {
    return <PageLoader />
  }

  const { talents = [], totalCount } = talentData
  const selectedTalentList = talents.filter(talent =>
    selectedTalentIds.has(talent.id)
  )

  return (
    <ContentWrapper
      title='Talent'
      actions={
        <>
          <BulkAssignDropdown selectedTalentList={selectedTalentList} />
          <ArchiveButton selectedTalentList={selectedTalentList} />
        </>
      }
      itemsCount={totalCount}
      itemsCountLoading={loading}
      itemsCountTooltip={getItemsCountTooltip(totalCount)}
    >
      <Filters
        values={filterValues}
        config={filtersConfig}
        onChange={onFilterChange}
      >
        {nestableControls => (
          <TalentListSearchBar nestableControls={nestableControls} />
        )}
      </Filters>

      <Container top='medium' bottom='medium'>
        <TalentTable
          loading={loading}
          talents={talents}
          selectedTalentIds={selectedTalentIds}
          onAllTalentSelectionToggled={handleAllTalentSelectionToggle}
          onTalentSelectionToggled={handleTalentSelectionToggle}
        />
      </Container>

      {!loading && (
        <Pagination
          activePage={page}
          onPageChange={onPageChange}
          limit={limit}
          itemCount={totalCount}
        />
      )}
    </ContentWrapper>
  )
}

export default TalentList
