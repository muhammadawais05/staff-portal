import React, { useMemo } from 'react'
import { useModal } from '@staff-portal/modals-service'
import { Button, Container, Tooltip } from '@toptal/picasso'
import {
  Talent,
  TssSegmentEvents,
  ArchiveModal
} from '@staff-portal/talents-screening-specialists'

import { getAssigments, getAssigmentIds } from './utils/get-assigments'

export interface Props {
  selectedTalentList: Talent[]
}

const ArchiveButton = ({ selectedTalentList }: Props) => {
  const assignments = useMemo(
    () => getAssigments(selectedTalentList),
    [selectedTalentList]
  )

  const assignmentIds = useMemo(
    () => getAssigmentIds(selectedTalentList),
    [selectedTalentList]
  )

  const { showModal } = useModal(ArchiveModal, {
    assignmentIds: assignmentIds,
    trackEvent: TssSegmentEvents.BULK_ARCHIVE_CLICKED
  })

  const noAssignments = assignments.length === 0

  return (
    <Container left='small'>
      <Tooltip
        disableListeners={!noAssignments}
        content='Please select talent to archive.'
        placement='bottom'
      >
        <span>
          <Button
            data-testid='bulk-archive-button'
            disabled={noAssignments}
            size='small'
            variant='secondary'
            onClick={showModal}
          >
            Archive
          </Button>
        </span>
      </Tooltip>
    </Container>
  )
}

export default ArchiveButton
