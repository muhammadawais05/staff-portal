import { useNotifications } from '@toptal/picasso/utils'
import { useMemo } from 'react'
import { RoleScope } from '@staff-portal/graphql/staff'
import { useGetCurrentUser } from '@staff-portal/current-user'
import {
  FiltersConfig,
  FiltersRowConfig,
  FilterConfigType
} from '@staff-portal/filters'
import {
  getClaimerOptions,
  useGetClaimers,
  ClaimerOption
} from '@staff-portal/facilities'
import {
  CallRequestStatus,
  CallRequestType
} from '@staff-portal/clients-call-requests'
import { NOT_SELECTED_OPTION } from '@staff-portal/config'

const STATUSES_OPTIONS = [
  { label: 'Pending', value: CallRequestStatus.PENDING },
  { label: 'Claimed', value: CallRequestStatus.CLAIMED },
  { label: 'Removed', value: CallRequestStatus.REMOVED },
  { label: 'Withdrawn', value: CallRequestStatus.WITHDRAWN }
]

const CALL_TYPE_OPTIONS = [
  { label: 'Instant', value: CallRequestType.INSTANT },
  { label: 'Scheduled', value: CallRequestType.SCHEDULED }
]

const CALL_PURPOSE_OPTIONS = [
  { label: 'Sales', value: 'Sales' },
  { label: 'Developers', value: 'Matching_developer' },
  { label: 'Designers', value: 'Matching_designer' },
  { label: 'Finance experts', value: 'Matching_finance_expert' },
  { label: 'Project managers', value: 'Matching_project_manager' },
  { label: 'Product managers', value: 'Matching_product_manager' }
]

const LATE_OPTIONS = [
  NOT_SELECTED_OPTION,
  { label: 'Yes', value: 'true' },
  { label: 'No', value: 'false' }
]

const FILTERS_CONFIG: FiltersConfig = [
  {
    type: FilterConfigType.CHECKBOX,
    name: 'statuses',
    label: 'Statuses',
    options: STATUSES_OPTIONS
  },
  {
    type: FilterConfigType.CHECKBOX,
    name: 'call_type',
    label: 'Call type',
    options: CALL_TYPE_OPTIONS
  },
  {
    type: FilterConfigType.CHECKBOX,
    name: 'call_purpose',
    label: 'Call purpose',
    options: CALL_PURPOSE_OPTIONS
  },
  {
    type: FilterConfigType.RADIO,
    name: 'late',
    label: 'Late',
    options: LATE_OPTIONS
  }
]

const useFiltersConfig = () => {
  const { showError } = useNotifications()

  const { claimers, loading } = useGetClaimers({
    scope: RoleScope.CALLBACK_REQUEST_CLAIMERS,
    onError: () => showError('An error occurred, unable to fetch claimers.')
  })

  const currentUser = useGetCurrentUser()

  const claimerOptions: ClaimerOption[] = useMemo(
    () => (claimers ? getClaimerOptions(claimers, currentUser?.id) : []),
    [claimers, currentUser]
  )

  const filtersConfig = useMemo<FiltersConfig>(() => {
    const claimerConfig: FiltersRowConfig = [
      {
        type: FilterConfigType.SELECT,
        name: 'claimer_id',
        label: 'Claimer',
        options: claimerOptions,
        loading
      }
    ]
    const dateRangeConfig: FiltersRowConfig = [
      {
        type: FilterConfigType.DATE_RANGE,
        name: 'created_at',
        label: 'Created at'
      },
      {
        type: FilterConfigType.DATE_RANGE,
        name: 'call_claimed_at',
        label: 'Call claimed at'
      }
    ]

    return [claimerConfig, ...dateRangeConfig, ...FILTERS_CONFIG]
  }, [claimerOptions, loading])

  return { filtersConfig }
}

export default useFiltersConfig
