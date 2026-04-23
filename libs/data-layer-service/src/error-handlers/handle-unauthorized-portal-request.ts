import {
  getLocationHash,
  getLocationPathname,
  getLocationSearch,
  navigateExternallyTo
} from '@staff-portal/navigation'
import { getLegacyUrlWithRewrite } from '@staff-portal/routes'

export const handleUnauthorizedPortalRequest = () => {
  const pathname = getLocationPathname()
  const search = getLocationSearch()
  const hash = getLocationHash()

  navigateExternallyTo(getLegacyUrlWithRewrite(pathname, search, hash), true)
}
