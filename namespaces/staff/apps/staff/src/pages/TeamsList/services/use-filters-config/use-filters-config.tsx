import { useMemo } from 'react'
import { FiltersConfig, FilterConfigType } from '@staff-portal/filters'
import { NOT_SELECTED_OPTION } from '@staff-portal/config'

export const useFiltersConfig = () =>
  useMemo<FiltersConfig>(
    () => [
      {
        type: FilterConfigType.RADIO,
        name: 'core_team',
        label: 'Core Team',
        options: [
          NOT_SELECTED_OPTION,
          {
            label: 'Yes',
            value: 'true'
          },
          { label: 'No', value: 'false' }
        ]
      },
      {
        type: FilterConfigType.RADIO,
        name: 'email_tracking',
        label: 'Email Tracking',
        options: [
          NOT_SELECTED_OPTION,
          {
            label: 'Yes',
            value: 'true'
          },
          { label: 'No', value: 'false' }
        ]
      }
    ],
    []
  )
