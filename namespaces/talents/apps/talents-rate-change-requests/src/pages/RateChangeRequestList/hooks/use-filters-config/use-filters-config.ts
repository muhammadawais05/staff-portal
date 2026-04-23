import { useMemo } from 'react'
import {
  RateChangeRequestTypeEnum,
  RateChangeRequestStatus
} from '@staff-portal/graphql/staff'
import { FiltersConfig, FilterConfigType } from '@staff-portal/filters'

import { RateChangeRequestClaimerAutocompleteEdgeFragment } from '../../data/rate-change-request-claimer-autocomplete-edge-fragment'
import {
  useGetRateChangeRequestClaimerFilterAutocompleteOptions,
  useGetRateChangeRequestClaimerFilterAutocompleteLabel
} from '..'

const STATUSES_OPTIONS = [
  {
    label: 'Pending Claim',
    value: RateChangeRequestStatus.PENDING
  },
  {
    label: 'Pending Completion',
    value: RateChangeRequestStatus.CLAIMED
  },
  {
    label: 'Completed',
    value: RateChangeRequestStatus.COMPLETED
  }
]

const REQUEST_TYPE_OPTIONS = [
  {
    label: 'Consultation',
    value: RateChangeRequestTypeEnum.CONSULTATION
  },
  {
    label: 'Current Engagements',
    value: RateChangeRequestTypeEnum.CURRENT_ENGAGEMENT
  },
  {
    label: 'Future Engagements',
    value: RateChangeRequestTypeEnum.FUTURE_ENGAGEMENTS
  }
]

const useFiltersConfig = () => {
  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  const maxDate = useMemo(() => new Date(), [])

  const filtersConfig: FiltersConfig = [
    {
      type: FilterConfigType.CHECKBOX,
      name: 'statuses',
      label: 'Status',
      options: STATUSES_OPTIONS
    },
    {
      type: FilterConfigType.DATE_RANGE,
      name: 'submissionDate',
      label: 'Submission date',
      options: { maxDate }
    },
    [
      {
        type: FilterConfigType.SELECT,
        name: 'requestType',
        label: 'Request Type',
        options: REQUEST_TYPE_OPTIONS,
        enableReset: true
      },
      {
        type: FilterConfigType.AUTOCOMPLETE,
        name: 'claimerId',
        label: 'Claimed by',
        useGetOptions: useGetRateChangeRequestClaimerFilterAutocompleteOptions,
        useGetFilterLabel:
          useGetRateChangeRequestClaimerFilterAutocompleteLabel,
        getKey: item =>
          (item as RateChangeRequestClaimerAutocompleteEdgeFragment).node?.id,
        getId: item =>
          (item as RateChangeRequestClaimerAutocompleteEdgeFragment).node?.id,
        getLabel: item =>
          (item as RateChangeRequestClaimerAutocompleteEdgeFragment).label ?? ''
      }
    ]
  ]

  return { filtersConfig }
}

export default useFiltersConfig
