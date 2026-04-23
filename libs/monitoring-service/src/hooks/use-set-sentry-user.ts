import { useEffect } from 'react'
import * as Sentry from '@sentry/react'

type CurrentUser = {
  id: string
}

const useSetSentryUser = (currentUser?: CurrentUser) =>
  useEffect(() => {
    if (!currentUser) {
      return
    }

    Sentry.configureScope(scope => scope.setUser({ id: currentUser.id }))
  }, [currentUser])

export default useSetSentryUser
