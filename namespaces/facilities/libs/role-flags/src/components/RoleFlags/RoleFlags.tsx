import React from 'react'
import { SkeletonLoader } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'

import { useGetRoleFlags } from './data/get-role-flags'
import { ROLE_FLAGS_UPDATED } from '../../messages'
import RoleFlag from '../RoleFlag'

export interface Props {
  roleId: string
  showTooltipActions?: boolean
}

const RoleFlags = ({ roleId, showTooltipActions = false }: Props) => {
  const { data, loading, refetch } = useGetRoleFlags(roleId)

  /* TODO: investigate the possibility to get rid of the message emitter
   * https://toptal-core.atlassian.net/browse/SP-2191
   */
  useMessageListener(ROLE_FLAGS_UPDATED, () => {
    refetch()
  })

  if (loading && !data) {
    return <SkeletonLoader.Typography />
  }

  if (!data) {
    return null
  }

  return (
    <>
      {data.map(roleFlag => (
        <RoleFlag
          key={roleFlag.id}
          title={roleFlag.flag.title}
          color={roleFlag.flag.color}
          comment={roleFlag.comment}
          createdAt={roleFlag.createdAt}
          updatedAt={roleFlag.updatedAt}
          flaggedBy={roleFlag.flaggedBy?.fullName}
          showTooltipActions={showTooltipActions}
          roleFlagId={roleFlag.id}
          operations={roleFlag.operations}
        />
      ))}
    </>
  )
}

export default RoleFlags
