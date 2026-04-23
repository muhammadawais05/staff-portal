import { getUrl, navigateExternallyTo } from '@staff-portal/navigation'
import { getLoginUrl } from '@staff-portal/routes'

export const handleUnauthenticatedRequest = () => {
  navigateExternallyTo(getLoginUrl({ returnUrl: getUrl() }), true)
}
