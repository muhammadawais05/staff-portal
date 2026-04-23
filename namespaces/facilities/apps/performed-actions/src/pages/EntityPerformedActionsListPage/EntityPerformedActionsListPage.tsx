import React from 'react'
import { useParams } from '@staff-portal/navigation'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { ErrorType, ErrorView } from '@staff-portal/error-handling'

import { PerformedActionsRouterParams } from './types'
import { PERFORMED_ACTION_ENTITIES_DATA } from './config'
import EntityPerformedActionsList from './EntityPerformedActionsList'

const EntityPerformedActionsListPage = () => {
  const params = useParams<PerformedActionsRouterParams>()
  const { entityType: urlEntityType, entityId: urlEntityId } = params

  const entityData = PERFORMED_ACTION_ENTITIES_DATA[urlEntityType] ?? null

  if (!entityData) {
    return <ErrorView errorType={ErrorType.NOT_FOUND} />
  }

  const entityId = encodeEntityId(urlEntityId, entityData?.entityType)

  return (
    <EntityPerformedActionsList
      decodedEntityId={urlEntityId}
      entityId={entityId}
      {...entityData}
    />
  )
}

export default EntityPerformedActionsListPage
