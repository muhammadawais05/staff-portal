import React from 'react'
import { Table, Typography, Button } from '@toptal/picasso'
import { titleize } from '@staff-portal/string'
import { Operation, OperationFragment } from '@staff-portal/operations'
import { getLegacyUrlWithRewrite } from '@staff-portal/routes'
import { Maybe } from '@staff-portal/graphql/staff'

import { TopscreenPositionFragment } from '../TopscreenPositionsSection/data/get-topscreen-positions'
import TopscreenPositionLabel from '../TopscreenPositionLabel'
import { useActivateTopScreenPositionModal } from '../ActivateTopScreenPositionModal/hooks/use-activate-topscreen-position-modal'

type Props = {
  position: TopscreenPositionFragment
  striped?: boolean
  createTopscreenTalentOperation?: Maybe<OperationFragment>
}

const TopscreenPositionItem = ({ position, striped = false, createTopscreenTalentOperation }: Props) => {
  const createNewTalentLink = getLegacyUrlWithRewrite(
    '/talents/new?',
    `_talent=top_screen&topscreen_position=${position.id}`
  )

  const { showModal: showActivateTopScreenPositionModal } =
    useActivateTopScreenPositionModal({
      positionId: position.id
    })

  const handleActivatePosition = () => {
    showActivateTopScreenPositionModal()
  }

  return (
    <Table.Row stripeEven={striped}>
      <Table.Cell>
        <TopscreenPositionLabel position={position} />
      </Table.Cell>
      <Table.Cell>
        <Typography>{titleize(position.status)}</Typography>
      </Table.Cell>
      <Table.Cell>
        <Operation operation={position.operations.activateTopscreenPosition}>
          <Button
            size='small'
            onClick={handleActivatePosition}
            data-testid={`activate-position-${position.id}`}
          >
            Activate
          </Button>
        </Operation>
        <Operation operation={createTopscreenTalentOperation}>
          <Button size='small' variant='secondary' href={createNewTalentLink}>
            Add New Talent
          </Button>
        </Operation>
      </Table.Cell>
    </Table.Row>
  )
}

export default TopscreenPositionItem
