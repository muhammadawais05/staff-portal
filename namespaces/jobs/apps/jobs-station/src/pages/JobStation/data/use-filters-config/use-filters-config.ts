import { useNotifications } from '@toptal/picasso/utils'
import { useMemo } from 'react'
import { Item } from '@toptal/picasso/TagSelector'
import { CumulativeJobStatus } from '@staff-portal/graphql/staff'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { QueryParams } from '@staff-portal/query-params-state'
import {
  FilterConfig,
  FiltersConfig,
  FiltersRowConfig,
  FilterConfigType
} from '@staff-portal/filters'
import {
  ClientAutocompleteEdgeFragment,
  BUSINESS_TYPE_FILTER_OPTIONS
} from '@staff-portal/clients'
import { useGetTeamOptions } from '@staff-portal/staff'
import { NOT_SELECTED_PLACEHOLDER } from '@staff-portal/config'

import {
  useGetMatchersOptions,
  useGetSalesRepsOptions,
  useGetStaffFilterAutocompleteOptions,
  useGetStaffFilterAutocompleteLabel,
  useViewerPermits
} from '..'
import { JOB_POSTED_OPTIONS, teamIds } from '../../constants'
import { PostedAtRadioOptionValues } from '../../types'
import {
  JobAggregatedStatusesFragment,
  JobAggregatedPendingTalentStatusesFragment
} from '../get-jobs-list'
import { concatFixedOptions } from '../../services/concat-fixed-options/concat-fixed-options'
import { jobStatusOptions } from '../../services/job-status-options/job-status-options'
import { pendingTalentStatusOptions } from '../../services/pending-talent-status-options/pending-talent-status-options'

export const useFiltersConfig = (
  filterValues: QueryParams,
  statusCounters?: JobAggregatedStatusesFragment,
  talentStatusCounters?: JobAggregatedPendingTalentStatusesFragment
) => {
  const { showError } = useNotifications()

  const { permits } = useViewerPermits(() => {
    showError('An error occurred, unable to fetch user permits.')
  })

  const { matchers, loading: matchersLoading } = useGetMatchersOptions(() => {
    showError('An error occurred, unable to fetch matchers.')
  })

  const { salesReps, loading: salesRepsLoading } = useGetSalesRepsOptions(
    () => {
      showError('An error occurred, unable to fetch matchers.')
    }
  )

  const { teamOptions, loading: teamLoading } = useGetTeamOptions({
    ids: teamIds,
    onError: () => {
      showError('An error occurred, unable to fetch teams.')
    },
    skip: Boolean(permits?.filterOnTeamIds) === false
  })
  const currentUser = useGetCurrentUser()

  const matcherOptions: Item[] = useMemo(
    () => (matchers ? concatFixedOptions(matchers, currentUser?.id) : []),
    [matchers, currentUser]
  )

  const salesRepsOptions: Item[] = useMemo(
    () => (salesReps ? concatFixedOptions(salesReps, currentUser?.id) : []),
    [salesReps, currentUser]
  )

  const pendingTalentStatusFilterEnabled = (
    filterValues.cumulative_statuses as string[]
  )?.includes(CumulativeJobStatus.PENDING_ENGINEER.toLocaleLowerCase())

  const customPostedRange = (filterValues.posted_at as string[])?.includes(
    PostedAtRadioOptionValues.CUSTOM
  )

  const filtersConfig = useMemo<FiltersConfig>(() => {
    const statusOptions = statusCounters ? jobStatusOptions(statusCounters) : []
    const pendingStatusOptions = talentStatusCounters
      ? pendingTalentStatusOptions(talentStatusCounters)
      : []

    const firstRowConfig: FiltersRowConfig = [
      {
        type: FilterConfigType.TAG_SELECTOR,
        name: 'sales_reps',
        label: 'Sales Rep',
        options: salesRepsOptions,
        loading: salesRepsLoading,
        placeholder: NOT_SELECTED_PLACEHOLDER
      },
      {
        type: FilterConfigType.TAG_SELECTOR,
        name: 'matchers',
        label: 'Matcher',
        options: matcherOptions,
        loading: matchersLoading,
        placeholder: NOT_SELECTED_PLACEHOLDER
      }
    ]

    const secondRowConfig: FiltersRowConfig = [
      {
        type: FilterConfigType.AUTOCOMPLETE,
        name: 'client',
        label: 'Company',
        useGetOptions: useGetStaffFilterAutocompleteOptions,
        useGetFilterLabel: useGetStaffFilterAutocompleteLabel,
        getKey: item => (item as ClientAutocompleteEdgeFragment).node?.id,
        getId: item => (item as ClientAutocompleteEdgeFragment).node?.id,
        getLabel: item => (item as ClientAutocompleteEdgeFragment).label ?? ''
      }
    ]

    const thirdRowConfig: FiltersRowConfig = [
      {
        type: FilterConfigType.SELECT,
        name: 'business_type',
        label: 'Business Type',
        options: BUSINESS_TYPE_FILTER_OPTIONS,
        enableReset: true,
        placeholder: NOT_SELECTED_PLACEHOLDER
      },
      {
        type: FilterConfigType.TAG_SELECTOR,
        name: 'team_ids',
        label: 'Teams',
        options: teamOptions,
        placeholder: NOT_SELECTED_PLACEHOLDER,
        loading: teamLoading
      }
    ]

    const postedAtConfig: FilterConfig = {
      type: FilterConfigType.RADIO,
      name: 'posted_at',
      label: 'Jobs Posted',
      options: JOB_POSTED_OPTIONS,
      ...(customPostedRange && {
        subFilter: {
          type: FilterConfigType.DATE_RANGE,
          name: 'posted_at_range',
          label: 'Date Range',
          options: {
            maxDate: new Date()
          }
        }
      })
    }

    const statusesConfig: FilterConfig = {
      type: FilterConfigType.CHECKBOX,
      name: 'cumulative_statuses',
      label: 'Jobs Status',
      gridSize: 4,
      options: statusOptions,
      ...(pendingTalentStatusFilterEnabled && {
        subFilter: {
          type: FilterConfigType.CHECKBOX,
          name: 'pending_talent_status',
          label: 'Pending Talent Filter',
          options: pendingStatusOptions
        }
      })
    }

    const listOfFilters = [
      firstRowConfig,
      secondRowConfig,
      permits?.filterOnTeamIds && thirdRowConfig,
      postedAtConfig,
      statusesConfig
    ].filter(filter => filter) // Returns an array without nulls

    return listOfFilters as []
  }, [
    permits,
    matcherOptions,
    salesRepsOptions,
    matchersLoading,
    salesRepsLoading,
    pendingTalentStatusFilterEnabled,
    statusCounters,
    talentStatusCounters,
    customPostedRange,
    teamOptions,
    teamLoading
  ])

  return { filtersConfig }
}
