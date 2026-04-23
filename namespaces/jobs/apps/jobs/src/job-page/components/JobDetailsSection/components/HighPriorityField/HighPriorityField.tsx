import React from 'react'
import {
  Container,
  Typography,
  Tooltip,
  QuestionMark16,
  Button
} from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation, OperationType } from '@staff-portal/operations'
import { Maybe } from '@toptal/picasso/utils'

import HighPriorityModal from './components/HighPriorityModal'

export type Props = {
  jobId: string
  highPriority: Maybe<boolean>
  highPriorityReason?: string | null
  operation: OperationType | undefined
}

const HighPriorityField = ({
  jobId,
  highPriority,
  highPriorityReason,
  operation
}: Props) => {
  const { showModal } = useModal(HighPriorityModal, {
    jobId,
    highPriority
  })

  return (
    <Container flex justifyContent={'space-between'}>
      <Container flex>
        <Typography size='medium'>{highPriority ? 'Yes' : 'No'}</Typography>
        {highPriorityReason && (
          <Tooltip interactive content={highPriorityReason}>
            <Container
              data-testid='HighPriorityField-reason-tooltip'
              left='xsmall'
              inline
              as='span'
              flex
              alignItems='center'
            >
              <QuestionMark16 />
            </Container>
          </Tooltip>
        )}
      </Container>
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

export default HighPriorityField
