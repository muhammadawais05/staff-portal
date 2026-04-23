import React from 'react'
import { Button, Container, Tooltip } from '@toptal/picasso'
import {
  isOperationHidden,
  isOperationDisabled,
  OperationFragment
} from '@staff-portal/operations'
import { TalentFragment } from '@staff-portal/talents'

import { useSetHealthStatusModal } from '../../../talent-page/components/SetHealthStatusModal/hooks'

interface Props {
  talentId: string
  setHealthStatusTalent?: OperationFragment
  historyLabel: string
  historyIsEmpty: boolean
  historyOnClick: () => void
}

const HealthStatusActions = ({
  talentId,
  setHealthStatusTalent,
  historyLabel,
  historyIsEmpty,
  historyOnClick
}: Props) => {
  const { showModal: showSetHealthStatusModal } = useSetHealthStatusModal({
    id: talentId
  } as TalentFragment)

  const historyButton = (
    <Button
      size='small'
      data-testid='health-status-show-history-button'
      variant='secondary'
      disabled={historyIsEmpty}
      onClick={historyOnClick}
    >
      {historyLabel}
    </Button>
  )

  return (
    <Container>
      {!isOperationHidden(setHealthStatusTalent) && (
        <Button
          size='small'
          data-testid='change-health-status-button'
          variant='secondary'
          onClick={showSetHealthStatusModal}
          disabled={isOperationDisabled(setHealthStatusTalent)}
        >
          Change
        </Button>
      )}
      {historyIsEmpty ? (
        <Tooltip content='There is no health status history yet'>
          <Container inline left='small'>
            {historyButton}
          </Container>
        </Tooltip>
      ) : (
        historyButton
      )}
    </Container>
  )
}

export default HealthStatusActions
