import React from 'react'
import { EmptyState } from '@toptal/picasso'
import { TableSkeleton } from '@staff-portal/ui'
import { OperationFragment } from '@staff-portal/operations'
import { Maybe } from '@staff-portal/graphql/staff'

import TopscreenPositionsTable from '../TopscreenPositionsTable'
import { topscreenPositionsColumns } from '../TopscreenPositionsTableHeader'
import { TopscreenPositionFragment } from '../TopscreenPositionsSection/data/get-topscreen-positions'

type Props = {
  topscreenPositions?: TopscreenPositionFragment[]
  createTopscreenTalentOperation?: Maybe<OperationFragment>
  loading: boolean
}

const TopscreenPositionsContent = ({
  topscreenPositions,
  createTopscreenTalentOperation,
  loading
}: Props) => {
  if (loading) {
    return <TableSkeleton cols={topscreenPositionsColumns} rows={5} />
  }

  if (!topscreenPositions?.length) {
    return (
      <EmptyState.Collection data-testid='positions-empty'>
        This client has no TopScreen positions yet.
      </EmptyState.Collection>
    )
  }

  return (
    <TopscreenPositionsTable
      topscreenPositions={topscreenPositions}
      createTopscreenTalentOperation={createTopscreenTalentOperation}
    />
  )
}

export default TopscreenPositionsContent
