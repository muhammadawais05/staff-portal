import { PLATFORM_API_URL, KIPPER_API_URL } from '@staff-portal/config'
import { WEEK_STARTS_ON } from '@staff-portal/date-time-utils'
import { useGetCurrentUser } from '@staff-portal/current-user'

import { WeekStartsOn } from '../@types/types'

const endpoints = {
  Gateway: PLATFORM_API_URL,
  Platform: PLATFORM_API_URL,
  Kipper: KIPPER_API_URL
}

export const useBillingBaseProps = () => {
  const currentUser = useGetCurrentUser()

  return {
    currentUser,
    endpoints,
    weekStartsOn: WEEK_STARTS_ON as WeekStartsOn,
    throwBoundaryErrorsToHostApp: true,
    shouldInitSentry: false,
    isPicassoRendered: false
  }
}
