import React from 'react'
import { AvailabilityRequestStatus } from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'
import {
  RadioFilterConfigOption,
  FiltersWithoutHeader,
  FiltersContainerConfig,
  FilterConfigType,
  FiltersConfig
} from '@staff-portal/filters'

export interface Props {
  values?: AvailabilityRequestStatus
  onChange: (values: AvailabilityRequestStatus) => void
}
const options: RadioFilterConfigOption[] = [
  { label: 'All', value: '' },
  {
    label: titleize(AvailabilityRequestStatus.PENDING),
    value: AvailabilityRequestStatus.PENDING
  },
  {
    label: titleize(AvailabilityRequestStatus.CANCELLED),
    value: AvailabilityRequestStatus.CANCELLED
  },
  {
    label: titleize(AvailabilityRequestStatus.CONFIRMED),
    value: AvailabilityRequestStatus.CONFIRMED
  },
  {
    label: titleize(AvailabilityRequestStatus.EXPIRED),
    value: AvailabilityRequestStatus.EXPIRED
  },
  {
    label: titleize(AvailabilityRequestStatus.REJECTED),
    value: AvailabilityRequestStatus.REJECTED
  },
  {
    label: titleize(AvailabilityRequestStatus.WITHDRAWN),
    value: AvailabilityRequestStatus.WITHDRAWN
  }
]

const FILTERS_CONFIG: FiltersConfig = [
  {
    name: 'status',
    label: 'Status',
    type: FilterConfigType.RADIO,
    options
  }
]

const filtersContainerConfig: FiltersContainerConfig = {
  top: 0,
  bottom: 'medium',
  padded: 'small'
}

const AvailabilityRequestsFilter = ({ values, onChange }: Props) => {
  return (
    <FiltersWithoutHeader
      values={{ status: values }}
      config={FILTERS_CONFIG}
      containerConfig={filtersContainerConfig}
      onChange={data =>
        onChange((data['status'] as AvailabilityRequestStatus) || undefined)
      }
    />
  )
}

export default AvailabilityRequestsFilter
