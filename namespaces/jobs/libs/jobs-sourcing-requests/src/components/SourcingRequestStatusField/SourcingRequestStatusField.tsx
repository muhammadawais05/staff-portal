import React from 'react'
import { Container, Button, Typography } from '@toptal/picasso'
import { SourcingRequestStatus as SourcingRequestStatusType } from '@staff-portal/graphql/staff'
import { Operation, OperationType } from '@staff-portal/operations'
import { useModal } from '@staff-portal/modals-service'
import { SourcingRequestStatus } from '@staff-portal/talents'

import * as S from './styles'
import UpdateSourcingRequestStatusModal from '../UpdateSourcingRequestStatusModal/UpdateSourcingRequestStatusModal'

export type Props = {
  jobId: string
  sourcingRequestId?: string
  sourcingRequestStatus?: SourcingRequestStatusType | null
  operation?: OperationType
}

export const SourcingRequestStatusField = ({
  jobId,
  sourcingRequestStatus,
  sourcingRequestId,
  operation
}: Props) => {
  const { showModal } = useModal(UpdateSourcingRequestStatusModal, {
    jobId,
    sourcingRequestId,
    sourcingRequestStatus
  })

  return (
    <Container
      flex
      alignItems='center'
      data-testid='sourcing-request-status-root'
    >
      <Container css={S.statusField}>
        <Typography as='span' size='medium'>
          <SourcingRequestStatus status={sourcingRequestStatus} />
        </Typography>
      </Container>
      <Container left='xsmall'>
        <Operation
          operation={operation}
          render={disabled => (
            <Button
              size='small'
              variant='secondary'
              onClick={showModal}
              disabled={disabled}
              data-testid='sourcing-request-status-edit-button'
            >
              Edit
            </Button>
          )}
        />
      </Container>
    </Container>
  )
}

export default SourcingRequestStatusField
