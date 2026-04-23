import { renderHook } from '@testing-library/react-hooks'

import useLogRocket from '../use-log-rocket'
import useSetSegmentUser from '../use-set-segment-user'
import useSetSentryUser from '../use-set-sentry-user'
import useMonitoringService from '../use-monitoring-service'
import useDataDog from '../use-data-dog'

jest.mock('../use-log-rocket')
jest.mock('../use-set-segment-user')
jest.mock('../use-set-sentry-user')
jest.mock('../use-data-dog')

type RenderHookProps = {
  currentUser: Parameters<typeof useMonitoringService>[0]
  config: Parameters<typeof useMonitoringService>[1]
}

describe('useMonitoringService', () => {
  it('calls all necessary services', () => {
    const useLogRocketMock = useLogRocket
    const useSetSegmentUserMock = useSetSegmentUser
    const useSetSentryUserMock = useSetSentryUser
    const useDataDogMock = useDataDog

    const initialProps: RenderHookProps = {
      currentUser: undefined,
      config: {
        USER_TRACKING_IS_ENABLED: false,
        LOG_ROCKET_IS_ENABLED: true,
        DATA_DOG_IS_ENABLED: true
      }
    }

    const { rerender } = renderHook(
      ({ currentUser, config }: RenderHookProps) =>
        useMonitoringService(currentUser, config),
      { initialProps }
    )

    expect(useDataDogMock).toHaveBeenCalledWith(undefined, true)
    expect(useLogRocketMock).toHaveBeenCalledWith(undefined, true)
    expect(useSetSegmentUserMock).toHaveBeenCalledWith(undefined, false)
    expect(useSetSentryUserMock).toHaveBeenCalledWith(undefined)

    const currentUser = {
      id: 'user-id',
      email: 'test@email.com',
      fullName: 'Test User',
      type: 'Staff',
      decodedId: 'id'
    }

    const chameleonParticipantUuid = 'test-chameleon-uuid'

    rerender({
      currentUser,
      config: {
        USER_TRACKING_IS_ENABLED: true,
        LOG_ROCKET_IS_ENABLED: false,
        chameleonParticipantUuid,
        DATA_DOG_IS_ENABLED: false
      }
    })

    expect(useDataDogMock).toHaveBeenCalledWith(currentUser, false)
    expect(useLogRocketMock).toHaveBeenCalledWith(
      { ...currentUser, chameleonParticipantUuid },
      false
    )
    expect(useSetSegmentUserMock).toHaveBeenCalledWith(currentUser, true)
    expect(useSetSentryUserMock).toHaveBeenCalledWith(currentUser)
  })
})
