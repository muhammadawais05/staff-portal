import { useUserTimeZone } from '@staff-portal/current-user'
import { OperationType } from '@staff-portal/operations'
import { NoteCard } from '@staff-portal/ui'
import { Container, Typography } from '@toptal/picasso'
import React from 'react'

import DraftJobDeleteButton from '../DraftJobDeleteButton'
import DraftJobEditButton from '../DraftJobEditButton'

export interface Props {
  draftJobId: string
  createdAt?: string | null
  updateSalesDraftJobOperation: OperationType
  removeSalesDraftJobOperation: OperationType
  onEditClick: () => void
}

const DraftJobHeader = ({
  draftJobId,
  createdAt,
  updateSalesDraftJobOperation,
  removeSalesDraftJobOperation,
  onEditClick
}: Props) => {
  const timeZone = useUserTimeZone()

  return (
    <Container flex justifyContent='space-between'>
      <Container>
        <Typography size='large' weight='semibold'>
          Job
        </Typography>
        {createdAt && (
          <NoteCard.Info
            createdAt={createdAt}
            updatedAt={createdAt}
            timeZone={timeZone}
          />
        )}
      </Container>

      <Container>
        <DraftJobEditButton
          draftJobId={draftJobId}
          operation={updateSalesDraftJobOperation}
          onClick={onEditClick}
        />

        <DraftJobDeleteButton
          draftJobId={draftJobId}
          operation={removeSalesDraftJobOperation}
        />
      </Container>
    </Container>
  )
}

export default DraftJobHeader
