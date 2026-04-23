import { useMemo } from 'react'
import {
  FiltersConfig,
  FilterConfigType,
  TIMEZONE_FILTER_OPTIONS
} from '@staff-portal/filters'
import { useNotifications } from '@staff-portal/error-handling'
import { useGetCountries, useGetFlags } from '@staff-portal/facilities'
import { useGetTeamOptions } from '@staff-portal/staff'
import { OFAC_STATUS_OPTIONS } from '@staff-portal/ofac-compliance'
import { RoleType } from '@staff-portal/graphql/staff'
import { NOT_SELECTED_PLACEHOLDER } from '@staff-portal/config'

import getStaffStatusOptions from '../get-staff-status-options/get-staff-status-options'

const useFiltersConfig = () => {
  const { showError } = useNotifications()
  const staffStatusOptions = getStaffStatusOptions()
  const { countries, loading: countriesLoading } = useGetCountries()
  const { teamOptions, loading: teamLoading } = useGetTeamOptions({
    onError: () => showError('An error occurred, unable to fetch teams.')
  })
  const { flags, loading: flagsLoading } = useGetFlags({
    roleType: RoleType.STAFF
  })

  const mappedTeamOptions = useMemo(
    () => (teamOptions || []).map(({ id, text }) => ({ id, label: text })),
    [teamOptions]
  )

  const flagsOptions = useMemo(
    () =>
      (flags || []).map(({ id, title }) => ({
        value: id,
        text: title ?? ''
      })),
    [flags]
  )

  const countryOptions = useMemo(
    () =>
      (countries || []).map(({ id, name }) => ({
        value: id,
        label: name ?? ''
      })),
    [countries]
  )

  return useMemo<FiltersConfig>(
    () => [
      [
        {
          type: FilterConfigType.SELECT,
          label: 'Country',
          name: 'country_id',
          options: countryOptions,
          loading: countriesLoading,
          enableReset: true,
          placeholder: NOT_SELECTED_PLACEHOLDER
        }
      ],
      {
        type: FilterConfigType.DATE_RANGE,
        label: 'Applied On',
        name: 'applied_on'
      },
      {
        type: FilterConfigType.SLIDER_RANGE,
        name: 'timezones',
        label: 'Time zone',
        options: TIMEZONE_FILTER_OPTIONS
      },
      {
        type: FilterConfigType.CHECKBOX,
        name: 'ofac_status',
        label: 'OFAC status',
        options: OFAC_STATUS_OPTIONS
      },
      {
        type: FilterConfigType.TAG_SELECTOR,
        name: 'flag_ids',
        label: 'Flags',
        loading: flagsLoading,
        options: flagsOptions
      },
      {
        type: FilterConfigType.TYPE_SELECTOR,
        name: 'team_ids',
        label: 'Teams',
        loading: teamLoading,
        options: mappedTeamOptions
      },
      {
        type: FilterConfigType.CHECKBOX,
        name: 'cumulative_statuses',
        label: 'Status',
        options: staffStatusOptions
      }
    ],
    [
      countriesLoading,
      countryOptions,
      flagsLoading,
      flagsOptions,
      mappedTeamOptions,
      staffStatusOptions,
      teamLoading
    ]
  )
}

export default useFiltersConfig
