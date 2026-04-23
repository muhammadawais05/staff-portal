import { useEffect } from 'react'
// eslint-disable-next-line no-restricted-imports
import { useLocation } from 'react-router-dom'
import { usePrevious } from '@staff-portal/utils'

export const useRefetchOnPathChange = (refetchList: Function[]) => {
  const location = useLocation()
  const previousPath = usePrevious(location.pathname)

  useEffect(() => {
    if (previousPath && location.pathname !== previousPath) {
      refetchList.forEach(refetch => refetch())
    }
  }, [previousPath, location.pathname, refetchList])
}
