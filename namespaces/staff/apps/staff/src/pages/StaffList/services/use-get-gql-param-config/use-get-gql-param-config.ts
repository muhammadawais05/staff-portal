import { useMemo } from 'react'
import {
  DateRangeGqlParam,
  EnumToGqlParam,
  GqlParams,
  IdGqlParam,
  IdsGqlParam,
  TimeZoneRangeGqlParam,
  SearchBarGqlParam
} from '@staff-portal/filters'
import { StaffCumulativeStatus, OfacStatus } from '@staff-portal/graphql/staff'

const useGetGqlParamConfig = () => {
  const gqlParamConfig: GqlParams = useMemo(
    () => ({
      badges: [SearchBarGqlParam()],
      country_id: [IdGqlParam(), 'countryId'],
      applied_on: [DateRangeGqlParam(), 'appliedOn'],
      timezones: [TimeZoneRangeGqlParam()],
      ofac_status: [EnumToGqlParam(OfacStatus), 'ofacStatuses'],
      flag_ids: [IdsGqlParam(), 'flagIds'],
      team_ids: [IdsGqlParam(), 'teamIds'],
      cumulative_statuses: [
        EnumToGqlParam(StaffCumulativeStatus),
        'cumulativeStatuses'
      ]
    }),
    []
  )

  return gqlParamConfig
}

export default useGetGqlParamConfig
