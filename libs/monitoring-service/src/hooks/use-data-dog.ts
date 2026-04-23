import { useEffect } from 'react'
import { datadogRum } from '@datadog/browser-rum'

type CurrentUser = {
  id: string
  fullName: string
  email: string
}

const useDataDog = (
  currentUser: CurrentUser | undefined,
  DATA_DOG_IS_ENABLED: boolean
) => {
  useEffect(() => {
    if (currentUser && DATA_DOG_IS_ENABLED) {
      const { id, fullName, email } = currentUser

      datadogRum.setUser({ id, email, name: fullName })

      return () => datadogRum.removeUser()
    }
  }, [currentUser, DATA_DOG_IS_ENABLED])
}

export default useDataDog
