import React from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Maybe } from '@toptal/picasso/utils'
import { Operation, OperationType } from '@staff-portal/operations'

import NumberOfDesiredHiresModal from './components/NumberOfDesiredHiresModal'

export type Props = {
  jobId: string
  talentCount: Maybe<number>
  operation?: OperationType
}

const NumberOfDesiredHires = ({ jobId, talentCount, operation }: Props) => {
  const { showModal } = useModal(NumberOfDesiredHiresModal, {
    jobId,
    talentCount
  })

  return (
    <Container flex justifyContent={'space-between'}>
      <Typography size='medium'>{talentCount}</Typography>
      <Operation
        operation={operation}
        render={disabled => (
          <Container left='small'>
            <Button
              variant='secondary'
              size='small'
              disabled={disabled}
              onClick={showModal}
            >
              Edit
            </Button>
          </Container>
        )}
      />
    </Container>
  )
}

export default NumberOfDesiredHires
