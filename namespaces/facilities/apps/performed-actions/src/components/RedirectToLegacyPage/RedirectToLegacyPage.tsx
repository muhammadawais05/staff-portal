import React, { useEffect } from 'react'
import { PageLoader } from '@staff-portal/ui'

import { useRedirectToLegacy } from './hooks/use-redirect-to-legacy'

// TODO: remove this component when all performed_actions pages for all entities is migrated
// After that it should be replaced to `<Redirect to={getNotFoundPath()} />`
const RedirectToLegacyPage = () => {
  const { redirectToLegacy } = useRedirectToLegacy()

  useEffect(() => redirectToLegacy(), [redirectToLegacy])

  return <PageLoader />
}

export default RedirectToLegacyPage
