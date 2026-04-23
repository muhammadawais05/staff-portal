import useSetSegmentUser from './use-set-segment-user'
import useSetSentryUser from './use-set-sentry-user'
import useLogRocket from './use-log-rocket'
import useDataDog from './use-data-dog'

export type CurrentUser = {
  id: string
  decodedId: string
  email: string
  fullName: string
  type: string
  timeZone?: { name: string; value: string } | null
}

type MonitoringServiceConfig = {
  USER_TRACKING_IS_ENABLED: boolean
  LOG_ROCKET_IS_ENABLED: boolean
  DATA_DOG_IS_ENABLED: boolean
  chameleonParticipantUuid?: string
}

export const useMonitoringService = (
  currentUser: CurrentUser | undefined,
  {
    USER_TRACKING_IS_ENABLED,
    LOG_ROCKET_IS_ENABLED,
    DATA_DOG_IS_ENABLED,
    chameleonParticipantUuid = ''
  }: MonitoringServiceConfig
) => {
  useLogRocket(
    currentUser ? { ...currentUser, chameleonParticipantUuid } : undefined,
    LOG_ROCKET_IS_ENABLED
  )

  useSetSegmentUser(currentUser, USER_TRACKING_IS_ENABLED)

  useSetSentryUser(currentUser)

  useDataDog(currentUser, DATA_DOG_IS_ENABLED)
}

export default useMonitoringService
