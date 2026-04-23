import { Container } from '@toptal/picasso'
import { localStorageService } from '@staff-portal/local-storage-service'
import React, { useCallback, useEffect, useMemo } from 'react'
import {
  RoleType,
  TaskFilterStatus,
  TaskSource
} from '@staff-portal/graphql/staff'
import { QueryParamsOptions } from '@staff-portal/query-params-state'
import {
  dateRangeQueryParam,
  Filters,
  FiltersConfig,
  gqlIdQueryParam,
  usePagination,
  Pagination,
  rangeQueryParam,
  searchBarQueryParam,
  FilterConfigType
} from '@staff-portal/filters'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import {
  REFETCH_TASKS,
  AddNewTaskButton,
  TASKS_DEFAULT_PAGE_SIZE,
  useGetCreateTaskOperation,
  TASK_LIST_GQL_BATCH_KEY,
  PriorityLegend
} from '@staff-portal/tasks'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import { useTouchCounter, CounterName } from '@staff-portal/counters'
import { useGetFlags } from '@staff-portal/facilities'

import { TaskCountersFragment } from './data/get-tasks-list'
import {
  GroupedTasksTable,
  PlaybookGuidelinesButton,
  searchBarCategories,
  TasksListSearchBar,
  TasksPageLoader,
  TasksSummaryBar
} from '../../components'
import { FILTERS_CONFIG, SORT_OPTIONS } from '../../filtersConfig'
import * as TaskListFilterValues from '../../services/task-list-filter-values'
import { useGetTasksList } from './data'
import { TaskGroup } from '../../types'
import { useGetPlaybooks } from './data/get-playbooks'

const PLAYBOOK_LOCAL_STORAGE_KEY = 'guidelines_tasks_visited'

const TASK_QUERY_PARAMS_CONFIG: QueryParamsOptions = {
  badges: searchBarQueryParam(searchBarCategories),
  performer_id: gqlIdQueryParam('Staff'),
  watcher_id: gqlIdQueryParam('Staff'),
  due_date: dateRangeQueryParam,
  completed_at: dateRangeQueryParam,
  timezones: rangeQueryParam
}

const TasksList = () => {
  const isFirstPageVisit = useMemo(
    () => !localStorageService.hasItem(PLAYBOOK_LOCAL_STORAGE_KEY),
    []
  )

  useEffect(() => {
    localStorageService.setItem(PLAYBOOK_LOCAL_STORAGE_KEY, 'true')
  }, [])

  const {
    page,
    limit,
    filterValues,
    pagination,
    resolving,
    handlePageChange,
    handleFilterChange
  } = usePagination({
    config: TASK_QUERY_PARAMS_CONFIG,
    limit: TASKS_DEFAULT_PAGE_SIZE
  })

  const gqlVariables = useMemo(
    () => TaskListFilterValues.toGqlVariables(filterValues, pagination),
    [filterValues, pagination]
  )

  const showDisputeActions = gqlVariables.loadDisputeOperations

  const {
    data,
    loading,
    refetch: refetchTasks
  } = useGetTasksList(gqlVariables, resolving)

  const filerStatuses = (filterValues['statuses'] as string[]) || []

  const counterName = filerStatuses.includes(
    TaskFilterStatus.DISPUTED.toLowerCase()
  )
    ? CounterName.DisputedTasks
    : CounterName.Tasks

  useTouchCounter({
    counterName,
    skipIfMissing: counterName === CounterName.DisputedTasks
  })

  const { data: createTaskOperation } = useGetCreateTaskOperation()

  const { data: playbooks } = useGetPlaybooks()

  const { flags, loading: loadingFlags } = useGetFlags({
    roleType: RoleType.CLIENT,
    batchKey: TASK_LIST_GQL_BATCH_KEY
  })

  const flagOptions = useMemo(
    () =>
      (flags ?? []).map(({ id, title }) => ({
        text: title,
        value: id
      })),
    [flags]
  )

  const filtersConfig = useMemo<FiltersConfig>(
    () => [
      ...FILTERS_CONFIG,
      {
        type: FilterConfigType.TAG_SELECTOR,
        name: 'flag_ids',
        label: 'Flags',
        options: flagOptions,
        loading: loadingFlags
      },
      {
        type: FilterConfigType.CHECKBOX,
        name: 'playbooks',
        label: 'Playbooks',
        options: playbooks ?? []
      }
    ],
    [playbooks, flagOptions, loadingFlags]
  )

  useMessageListener(REFETCH_TASKS, refetchTasks)

  const renderPageContent = useCallback(
    ({
      counters,
      totalCount,
      taskGroups
    }: {
      counters?: TaskCountersFragment | null
      totalCount: number
      taskGroups: TaskGroup[]
    }) => {
      const showSummaryBar =
        !!counters && !!taskGroups.length && gqlVariables.loadCounters
      const expandedTaskId = gqlVariables.filter?.badges?.ids?.[0]

      return (
        <>
          <Filters
            values={filterValues}
            config={filtersConfig}
            onChange={handleFilterChange}
            sortOptions={SORT_OPTIONS}
          >
            {nestableControls => (
              <TasksListSearchBar nestableControls={nestableControls} />
            )}
          </Filters>

          {showSummaryBar && (
            <Container top='medium' bottom='medium'>
              <TasksSummaryBar counters={counters} />
            </Container>
          )}

          <Container top='medium' bottom='medium'>
            <GroupedTasksTable
              loading={loading}
              data={taskGroups}
              showDisputeActions={showDisputeActions}
              defaultExpandedTaskId={expandedTaskId}
            />
          </Container>

          {Boolean(taskGroups.length) && <PriorityLegend />}

          <Pagination
            activePage={page}
            onPageChange={handlePageChange}
            limit={limit}
            itemCount={totalCount}
          />
        </>
      )
    },
    [
      filtersConfig,
      filterValues,
      gqlVariables.loadCounters,
      gqlVariables.filter.badges,
      handleFilterChange,
      handlePageChange,
      loading,
      page,
      limit,
      showDisputeActions
    ]
  )

  const isLoading = resolving || (loading && !data)

  return (
    <ContentWrapper
      title='Tasks'
      itemsCount={data?.totalCount}
      actions={
        createTaskOperation && (
          <AddNewTaskButton
            source={TaskSource.TASKS_LIST}
            createTaskOperation={createTaskOperation}
            onTaskCreated={refetchTasks}
          />
        )
      }
    >
      {isLoading && (
        <TasksPageLoader showSummaryBarLoader={gqlVariables.loadCounters} />
      )}

      {data && renderPageContent(data)}
      <PlaybookGuidelinesButton
        showBtnText={isFirstPageVisit}
        isOpenByDefault={isFirstPageVisit}
      />
    </ContentWrapper>
  )
}

export default TasksList
