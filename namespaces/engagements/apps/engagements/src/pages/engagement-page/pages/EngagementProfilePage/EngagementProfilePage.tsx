import { useQuery } from '@staff-portal/data-layer-service'
import { ErrorView, ErrorType } from '@staff-portal/error-handling'
import { PageLoader } from '@staff-portal/ui'
import React from 'react'

import EngagementPage from '../EngagementPage'
import { GetEngagementProfilePermissionDocument } from './data'

const EngagementProfilePage = () => {
  const { data, loading } = useQuery(GetEngagementProfilePermissionDocument, {
    fetchPolicy: 'cache-first'
  })

  if (loading) {
    return <PageLoader />
  }

  if (!loading && !data?.viewer.permits.canViewEngagements) {
    return <ErrorView errorType={ErrorType.FORBIDDEN} />
  }

  return <EngagementPage />
}

export default EngagementProfilePage
