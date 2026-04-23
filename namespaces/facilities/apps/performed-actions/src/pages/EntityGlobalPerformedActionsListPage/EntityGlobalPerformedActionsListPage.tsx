import React from 'react'
import { useParams } from '@staff-portal/navigation'
import { ErrorType, ErrorView } from '@staff-portal/error-handling'

import EntityGlobalPerformedActionsList from './components/EntityGlobalPerformedActionsList/EntityGlobalPerformedActionsList'
import { PERFORMED_ACTION_ENTITIES_DATA } from './config'
import { PerformedActionsRouterParams } from './types'

const EntityGlobalPerformedActionsListPage = () => {
  const params = useParams<PerformedActionsRouterParams>()
  const { entityType: urlEntityType } = params

  const entityData = PERFORMED_ACTION_ENTITIES_DATA[urlEntityType] ?? null

  if (!entityData) {
    return <ErrorView errorType={ErrorType.NOT_FOUND} />
  }

  return <EntityGlobalPerformedActionsList {...entityData} />
}

export default EntityGlobalPerformedActionsListPage
