import { useEffect } from 'react'
import LogRocket from 'logrocket'

type CurrentUser = {
  id: string
  fullName: string
  email: string
  type: string
  chameleonParticipantUuid: string
}

const useLogRocket = (
  currentUser: CurrentUser | undefined,
  LOG_ROCKET_IS_ENABLED: boolean
) => {
  useEffect(() => {
    if (currentUser?.id && LOG_ROCKET_IS_ENABLED) {
      const {
        id,
        fullName,
        email,
        type,
        chameleonParticipantUuid
      } = currentUser

      LogRocket.identify(id, {
        fullName,
        email,
        role: type,
        chameleonUuid: chameleonParticipantUuid
      })

      LogRocket.getSessionURL(sessionURL => {
        // let Segment know the recording url
        window.analytics?.track('LogRocket', { sessionURL })
      })
    }
  }, [currentUser, LOG_ROCKET_IS_ENABLED])
}

export default useLogRocket
