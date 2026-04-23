import { useMemo } from 'react'
import {
  EnumToGqlParam,
  GqlParams,
  IdGqlParam,
  SearchBarGqlParam,
  DateRangeGqlParam,
  SingleEnumToGqlParam
} from '@staff-portal/filters'
import {
  CommunityEventCategory,
  CommunityEventSource,
  CommunityEventStatus,
  CommunityEventVenue
} from '@staff-portal/graphql/staff'

const getCreatedByMe = (value: unknown) => value === 'me'

export const useGetGqlParamConfig = () =>
  useMemo(
    (): GqlParams => ({
      badges: [SearchBarGqlParam()],
      contact_id: [IdGqlParam(), 'contactId'],
      country_id: [IdGqlParam(), 'countryId'],
      event_source: [
        value => SingleEnumToGqlParam(CommunityEventSource)(value as string),
        'eventSource'
      ],
      statuses: [EnumToGqlParam(CommunityEventStatus)],
      categories: [EnumToGqlParam(CommunityEventCategory)],
      creator: [getCreatedByMe, 'onlyMine'],
      venue_type: [
        value => SingleEnumToGqlParam(CommunityEventVenue)(value as string),
        'venueType'
      ],
      start_date: [DateRangeGqlParam(), 'startDate']
    }),
    []
  )
