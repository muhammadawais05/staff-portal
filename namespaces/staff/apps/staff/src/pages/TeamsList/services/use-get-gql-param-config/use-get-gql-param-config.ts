import { useMemo } from 'react'
import {
  booleanToGql,
  GqlParams,
  SearchBarGqlParam
} from '@staff-portal/filters'

export const useGetGqlParamConfig = () => {
  const gqlParamConfig: GqlParams = useMemo(
    () => ({
      badges: [SearchBarGqlParam()],
      core_team: [booleanToGql, 'coreTeam'],
      email_tracking: [booleanToGql, 'emailTracking']
    }),
    []
  )

  return gqlParamConfig
}
