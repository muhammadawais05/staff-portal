import React, { useMemo } from 'react'
import { getEntityPerformedActionsPath } from '@staff-portal/routes'
import { decodeEntityId, encodeGid } from '@staff-portal/data-layer-service'

import RecentActivityButton from '../RecentActivityButton'

type ActivityPathType =
  | 'Talent'
  | 'Client'
  | 'Job'
  | 'Opportunity'
  | 'Staff'
  | 'CompanyRepresentative'

interface Props {
  id: string
  entity: ActivityPathType
  customPathId?: string
}

const ACTIVITY_PATH_MAP: Record<ActivityPathType, string> = {
  Talent: 'talents',
  Client: 'clients',
  Job: 'jobs',
  Opportunity: 'opportunity',
  Staff: 'staff',
  CompanyRepresentative: 'company_representatives'
}

const getActivityPath = (
  type: ActivityPathType,
  nodeId: string,
  customPathId?: string
) =>
  getEntityPerformedActionsPath(
    ACTIVITY_PATH_MAP[type],
    customPathId ?? nodeId,
    { comments: 'true' }
  )

const HistoryButton = ({ id, entity, customPathId }: Props) => {
  const { type, id: decodedId } = useMemo(() => decodeEntityId(id), [id])
  const feeds = useMemo(() => [[encodeGid(type, decodedId)]], [decodedId, type])
  const path = getActivityPath(entity, decodedId, customPathId)

  return (
    <RecentActivityButton feeds={feeds} fullHistoryUrl={path}>
      History
    </RecentActivityButton>
  )
}

export default HistoryButton
