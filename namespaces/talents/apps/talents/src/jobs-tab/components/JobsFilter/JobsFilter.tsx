import React from 'react'
import {
  FiltersWithoutHeader,
  FiltersConfig,
  FilterConfigType,
  FiltersContainerConfig
} from '@staff-portal/filters'

import { JobsFilterType } from '../../enums'

export type JobsFiltersValues = {
  jobsFilter?: JobsFilterType[]
}

export interface Props {
  values: JobsFiltersValues
  onChange: (values: JobsFiltersValues) => void
}

const FILTERS_CONFIG: FiltersConfig = [
  {
    name: 'jobsFilter',
    label: 'Display Jobs Only:',
    labelWidth: 10,
    type: FilterConfigType.CHECKBOX,
    alignItems: 'baseline',
    gridSize: 'auto',
    options: [
      {
        label: 'In Interview',
        value: JobsFilterType.IN_EVALUATION
      },
      {
        label: 'Working',
        value: JobsFilterType.WORKING
      },
      {
        label: 'Ended',
        value: JobsFilterType.TERMINAL
      }
    ]
  }
]

const filtersContainerConfig: FiltersContainerConfig = {
  top: 'medium',
  bottom: 'large',
  padded: 'small'
}

const JobsFilter = ({ values, onChange }: Props) => {
  return (
    <FiltersWithoutHeader
      values={values}
      config={FILTERS_CONFIG}
      containerConfig={filtersContainerConfig}
      onChange={onChange}
    />
  )
}

export default JobsFilter
