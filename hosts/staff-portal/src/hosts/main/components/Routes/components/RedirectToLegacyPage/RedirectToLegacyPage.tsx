import React, { useEffect } from 'react'
import { PageLoader } from '@staff-portal/ui'

import { useRedirectToLegacy } from '../../hooks'

const RedirectToLegacyPage = () => {
  const { redirectToLegacy } = useRedirectToLegacy()

  useEffect(() => redirectToLegacy(), [redirectToLegacy])

  return <PageLoader />
}

export default RedirectToLegacyPage
