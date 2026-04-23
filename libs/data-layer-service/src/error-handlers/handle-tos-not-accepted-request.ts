import { getUrl, navigateExternallyTo } from '@staff-portal/navigation'
import { getTosNotAcceptedPath } from '@staff-portal/routes'

export const handleTosNotAcceptedRequest = () =>
  navigateExternallyTo(getTosNotAcceptedPath({ returnUrl: getUrl() }), true)
