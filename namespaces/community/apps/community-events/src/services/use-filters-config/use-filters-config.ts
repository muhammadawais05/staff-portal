import { FilterConfigType, FiltersConfig } from '@staff-portal/filters'
import { useMemo } from 'react'
import { useGetCountries } from '@staff-portal/facilities'
import { NOT_SELECTED_OPTION } from '@staff-portal/config'

import {
  EVENT_CATEGORY_MAPPING,
  EVENT_SOURCE_MAPPING,
  EVENT_STATUS_MAPPING,
  EVENT_VENUE_MAPPING
} from '../../config'
import { convertConfigurationToFilterOptions } from '../convert-configuration-to-filter-options/convert-configuration-to-filter-options'
import { useGetCommunityEventHosts } from '../../data/get-community-event-hosts/get-community-event-hosts.staff.gql'

export const useFiltersConfig = () => {
  const { countries = [], loading: loadingCountries } = useGetCountries()
  const { eventHosts, loading: loadingHosts } = useGetCommunityEventHosts()

  const countryOptions = useMemo(() => {
    if (!countries) {
      return []
    }

    const options = countries.map(({ id, name }) => ({
      value: id,
      label: name ?? ''
    }))

    return [NOT_SELECTED_OPTION, ...options]
  }, [countries])

  const eventHostOptions = useMemo(() => {
    if (!eventHosts) {
      return []
    }

    const options = eventHosts.map(({ id, fullName }) => ({
      value: id,
      label: fullName ?? ''
    }))

    return [NOT_SELECTED_OPTION, ...options]
  }, [eventHosts])

  return useMemo<FiltersConfig>(() => {
    return [
      [
        {
          type: FilterConfigType.SELECT,
          name: 'country_id',
          label: 'Country',
          options: countryOptions,
          loading: loadingCountries,
          enableReset: true
        },
        {
          type: FilterConfigType.SELECT,
          name: 'contact_id',
          label: 'Host',
          options: eventHostOptions,
          loading: loadingHosts,
          enableReset: true
        }
      ],
      {
        type: FilterConfigType.DATE_RANGE,
        name: 'start_date',
        label: 'Start Date'
      },
      {
        type: FilterConfigType.CHECKBOX,
        name: 'categories',
        label: 'Categories',
        options: convertConfigurationToFilterOptions(EVENT_CATEGORY_MAPPING)
      },
      {
        type: FilterConfigType.RADIO,
        name: 'event_source',
        label: 'Event Source',
        options: [
          { label: 'All sources', value: '' },
          ...convertConfigurationToFilterOptions(EVENT_SOURCE_MAPPING)
        ]
      },
      {
        type: FilterConfigType.RADIO,
        name: 'creator',
        label: 'Creator',
        options: [
          { label: 'Anyone', value: '' },
          { label: 'Created by me', value: 'me' }
        ]
      },
      {
        type: FilterConfigType.CHECKBOX,
        name: 'statuses',
        label: 'Statuses',
        options: convertConfigurationToFilterOptions(EVENT_STATUS_MAPPING)
      },
      {
        type: FilterConfigType.RADIO,
        name: 'venue_type',
        label: 'Venue Type',
        options: convertConfigurationToFilterOptions(EVENT_VENUE_MAPPING)
      }
    ]
  }, [loadingCountries, countryOptions, loadingHosts, eventHostOptions])
}
