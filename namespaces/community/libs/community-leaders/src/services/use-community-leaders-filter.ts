import { useMemo } from 'react'
import { FiltersConfig, FilterConfigType } from '@staff-portal/filters'
import {
  CommunityLeaderStatus,
  CommunityLeaderType
} from '@staff-portal/graphql/staff'
import { useGetCountries } from '@staff-portal/facilities'
import { NOT_SELECTED_PLACEHOLDER } from '@staff-portal/config'

import { getCommunityLeaderType } from './get-community-leader-type'

const STATUSES_OPTIONS = [
  {
    label: 'Active',
    value: CommunityLeaderStatus.APPROVED
  },
  {
    label: 'Applied',
    value: CommunityLeaderStatus.APPLIED
  },
  {
    label: 'Paused',
    value: CommunityLeaderStatus.ON_HOLD
  },
  {
    label: 'Rejected',
    value: CommunityLeaderStatus.REJECTED
  },
  {
    label: 'Deleted',
    value: CommunityLeaderStatus.DELETED
  }
]

const TYPE_OPTIONS = [
  {
    label: getCommunityLeaderType(CommunityLeaderType.COMMUNITY_LEADER),
    value: CommunityLeaderType.COMMUNITY_LEADER
  },
  {
    label: getCommunityLeaderType(CommunityLeaderType.ONLINE_LEADER),
    value: CommunityLeaderType.ONLINE_LEADER
  }
]

export const useCommunityLeadersFiltersConfig = () => {
  const { countries, loading: loadingCountries } = useGetCountries()

  const countryOptions = useMemo(() => {
    if (!countries) {
      return []
    }

    return countries.map(({ id, name }) => ({
      value: id,
      label: name ?? ''
    }))
  }, [countries])

  const filtersConfig = useMemo<FiltersConfig>(
    () => [
      {
        type: FilterConfigType.CHECKBOX,
        name: 'statuses',
        label: 'Community Leader Status',
        options: STATUSES_OPTIONS
      },
      {
        type: FilterConfigType.CHECKBOX,
        name: 'type',
        label: 'Leader Type',
        options: TYPE_OPTIONS
      },
      {
        type: FilterConfigType.CITY,
        name: 'location',
        label: 'City'
      },
      {
        type: FilterConfigType.SELECT,
        label: 'Country',
        name: 'countryId',
        options: countryOptions,
        loading: loadingCountries,
        enableReset: true,
        placeholder: NOT_SELECTED_PLACEHOLDER
      }
    ],
    [countryOptions]
  )

  return { filtersConfig }
}
