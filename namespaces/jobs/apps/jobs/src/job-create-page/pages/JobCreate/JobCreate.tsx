import React from 'react'
import { Redirect } from '@staff-portal/navigation'
import { getNotFoundPath } from '@staff-portal/routes'

import { JobCreatePageContent } from '../../components'
import { useDecodeJobCreateParams } from '../../hooks'

const JobCreate = () => {
  const { roleId, clientId, opportunityId, cancelPath } =
    useDecodeJobCreateParams()

  if (!roleId && !clientId) {
    return <Redirect to={getNotFoundPath()} />
  }

  return (
    <JobCreatePageContent
      roleId={roleId}
      clientId={clientId}
      opportunityId={opportunityId}
      cancelPath={cancelPath}
    />
  )
}

export default JobCreate
