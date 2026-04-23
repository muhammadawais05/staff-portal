import React from 'react'
import { Table } from '@toptal/picasso'
import { OperationFragment } from '@staff-portal/operations'
import { Maybe } from '@staff-portal/graphql/staff'

import { TopscreenPositionFragment } from '../TopscreenPositionsSection/data/get-topscreen-positions'
import TopscreenPositionItem from '../TopscreenPositionItem'
import TopscreenPositionsTableHeader from '../TopscreenPositionsTableHeader'
import * as S from './styles'

type Props = {
  topscreenPositions: TopscreenPositionFragment[]
  createTopscreenTalentOperation?: Maybe<OperationFragment>
}

const TopscreenPositionsTable = ({
  topscreenPositions,
  createTopscreenTalentOperation
}: Props) => (
  <Table css={S.positionsTable}>
    <TopscreenPositionsTableHeader />
    <Table.Body>
      {topscreenPositions.map((position, index) => (
        <TopscreenPositionItem
          key={position.id}
          position={position}
          striped={Boolean(index % 2)}
          createTopscreenTalentOperation={createTopscreenTalentOperation}
        />
      ))}
    </Table.Body>
  </Table>
)

export default TopscreenPositionsTable
