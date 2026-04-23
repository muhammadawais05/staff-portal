import { useCallback, useState } from 'react'
import { navigateExternallyTo, useLocation } from '@staff-portal/navigation'
import { getLegacyUrlWithRewrite } from '@staff-portal/routes'

export const useRedirectToLegacy = () => {
  const [isRedirecting, setIsRedirecting] = useState(false)
  const { pathname, search, hash } = useLocation()

  const redirectToLegacy = useCallback(() => {
    setIsRedirecting(true)
    navigateExternallyTo(getLegacyUrlWithRewrite(pathname, search, hash), true)
  }, [pathname, search, hash])

  return { isRedirecting, redirectToLegacy }
}
