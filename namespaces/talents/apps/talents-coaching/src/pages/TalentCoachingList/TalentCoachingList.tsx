import React, { useMemo } from 'react'
import { Container } from '@toptal/picasso'
import { DEBOUNCE_LIMIT } from '@staff-portal/config'
import {
  DateRange,
  TalentCoachingEngagementStatus
} from '@staff-portal/graphql/staff'
import { ItemsList, NoSearchResultsMessage } from '@staff-portal/ui'
import { PersistentFormProvider } from '@staff-portal/forms'
import {
  PaginationParams,
  usePagination,
  Pagination
} from '@staff-portal/filters'
import { useGetCreateTaskOperation } from '@staff-portal/tasks'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import { TalentListSkeletonLoader } from '@staff-portal/talents-list'
import {
  TalentCoachingEngagementWithActivitiesFragment,
  TalentCoachingListItem
} from '@staff-portal/talents-coaching'

import { useGetTalentCoachingEngagementsList } from '../../data'
import { createGqlFilterVariables } from '../../utils'
import {
  PAGE_SIZE,
  COACHING_LIST_QUERY_PARAMS_CONFIG,
  NO_RESULTS_MESSAGE
} from '../../constants'
import {
  TalentCoachingFilter,
  TalentCoachingListActions
} from '../../components'

interface TalentCoachingListQueryParams extends PaginationParams {
  talentName?: string
  talentActivatedAt?: DateRange
  status?: TalentCoachingEngagementStatus
  assigneeId?: string
}

export const inputWrapper = `
  flex-grow: 1;
  margin-right: 1rem;
`

export const TalentCoachingList = () => {
  const {
    page,
    limit,
    pagination,
    filterValues,
    resolving,
    handlePageChange,
    handleFilterChange
  } = usePagination<TalentCoachingListQueryParams>({
    config: COACHING_LIST_QUERY_PARAMS_CONFIG,
    limit: PAGE_SIZE
  })

  const gqlFilterVariables = useMemo(
    () => createGqlFilterVariables(filterValues, pagination),
    [filterValues, pagination]
  )

  const { data, loading } = useGetTalentCoachingEngagementsList(
    gqlFilterVariables,
    resolving
  )

  const { data: createTaskOperation } = useGetCreateTaskOperation()

  const isLoading = resolving || loading

  return (
    <PersistentFormProvider debounceLimit={DEBOUNCE_LIMIT}>
      <ContentWrapper
        title='Talent Coaching List'
        itemsCount={data?.totalCount}
        actions={<TalentCoachingListActions />}
      >
        <TalentCoachingFilter
          filterValues={filterValues}
          onChange={handleFilterChange}
        />
        <Container top='large' bottom='large'>
          {isLoading ? (
            <TalentListSkeletonLoader />
          ) : (
            <ItemsList<TalentCoachingEngagementWithActivitiesFragment>
              data={data?.talentCoachingEngagements}
              renderItem={item => (
                <TalentCoachingListItem
                  talentCoachingEngagement={item}
                  createTaskOperation={createTaskOperation}
                  showHeader
                />
              )}
              getItemKey={item => String(item.id)}
              notFoundMessage={
                <NoSearchResultsMessage message={NO_RESULTS_MESSAGE} />
              }
            />
          )}
        </Container>

        <Pagination
          activePage={page}
          onPageChange={handlePageChange}
          limit={limit}
          itemCount={data?.totalCount}
        />
      </ContentWrapper>
    </PersistentFormProvider>
  )
}

export default TalentCoachingList
