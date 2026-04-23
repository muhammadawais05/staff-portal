import { useEffect } from 'react'

type Role = {
  type: string
  decodedId: string
}

const useSetSegmentUser = (
  role: Role | undefined,
  USER_TRACKING_IS_ENABLED: boolean
) => {
  useEffect(() => {
    if (USER_TRACKING_IS_ENABLED && role) {
      const { type: roleType, decodedId } = role

      window?.analytics?.identify({
        dimension11: `${roleType}-${decodedId}`
      })
    }
  }, [role, USER_TRACKING_IS_ENABLED])
}

export default useSetSegmentUser
