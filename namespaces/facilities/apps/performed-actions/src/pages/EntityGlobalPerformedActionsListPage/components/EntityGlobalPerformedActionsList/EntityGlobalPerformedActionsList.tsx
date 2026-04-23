import React from 'react'
import { ErrorView, ErrorType } from '@staff-portal/error-handling'

import { PERFORMED_ACTIONS_BASE_TITLE } from '../../../../config'
import {
  PerformedActionsContentWrapper,
  PerformedActionsList
} from '../../../../components'
import { useGetPermissions } from '../../data/get-permissions/get-permissions.staff.gql'
import { PerformedActionEntityData } from '../../types'

export type Props = PerformedActionEntityData

const EntityGlobalPerformedActionsList = ({
  entityType,
  permissionFieldName,
  titleEntityName
}: Props) => {
  const title = PERFORMED_ACTIONS_BASE_TITLE + ' for ' + titleEntityName

  const { canView, loading, error } = useGetPermissions(permissionFieldName)

  if (!loading && error) {
    return <ErrorView errorType={ErrorType.APPLICATION} />
  }

  if (!loading && !canView) {
    return <ErrorView errorType={ErrorType.FORBIDDEN} />
  }

  return (
    <PerformedActionsContentWrapper
      loading={loading}
      browserTitle={title}
      title={title}
    >
      <PerformedActionsList feeds={[[entityType]]} />
    </PerformedActionsContentWrapper>
  )
}

export default EntityGlobalPerformedActionsList
