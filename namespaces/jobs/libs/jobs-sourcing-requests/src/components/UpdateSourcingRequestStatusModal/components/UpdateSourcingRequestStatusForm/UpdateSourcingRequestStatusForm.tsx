import React, { useRef, useMemo } from 'react'
import { Container, Tooltip, Typography, Info16 } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { FormCancelButton } from '@staff-portal/forms'
import { isMaxLength } from '@staff-portal/validators'
import { titleize } from '@staff-portal/string'
import { SourcingRequestStatus as SourcingRequestStatusType } from '@staff-portal/graphql/staff'
import {
  getSourcingRequestVerboseStatus,
  getSourcingRequestStatusColor
} from '@staff-portal/talents'

import { TITLE } from '../../constants'
import { useUpdateSourcingRequestStatus } from './hooks'
import { getSortedSourcingRequestStatuses } from './utils'
import * as S from './styles'

export interface Props {
  jobId: string
  sourcingRequestId?: string | null
  sourcingRequestStatus?: SourcingRequestStatusType | null
  hideModal: () => void
}

const UpdateSourcingRequestSpecialistForm = ({
  jobId,
  sourcingRequestId,
  sourcingRequestStatus,
  hideModal
}: Props) => {
  const initialValues = useRef({ status: sourcingRequestStatus || undefined })
  const handleSubmit = useUpdateSourcingRequestStatus({
    jobId,
    sourcingRequestId,
    hideModal
  })

  const statuses = useMemo(() => getSortedSourcingRequestStatuses(), [])
  const statusOptions = useMemo(
    () =>
      statuses.map(status => ({
        text: titleize(status),
        value: status
      })),
    [statuses]
  )

  const statusLabel = useMemo(
    () => (
      <Container as='span' flex inline alignItems='flex-end'>
        <Typography as='span'>Status</Typography>
        <Tooltip
          interactive
          maxWidth='none'
          content={
            <Container css={S.tooltipContent}>
              {statuses.map(status => (
                <Container key={status}>
                  <Typography
                    as='span'
                    weight='semibold'
                    color={getSourcingRequestStatusColor(status)}
                  >
                    {titleize(status)}
                  </Typography>
                  : {getSourcingRequestVerboseStatus(status)}
                </Container>
              ))}
            </Container>
          }
        >
          <Container inline as='span' left='xsmall'>
            <Info16 />
          </Container>
        </Tooltip>
      </Container>
    ),
    [statuses]
  )

  return (
    <ModalForm
      onSubmit={handleSubmit}
      title={TITLE}
      initialValues={initialValues.current}
    >
      <Modal.Content>
        {sourcingRequestStatus && (
          <Form.Select
            required
            label={statusLabel}
            options={statusOptions}
            name='status'
            data-testid='sourcing-request-status-field'
          />
        )}
        <Form.Input
          required
          multiline
          rows={4}
          width='full'
          name='comment'
          label='Comment'
          validate={isMaxLength}
          data-testid='sourcing-request-status-comment-field'
        />
      </Modal.Content>
      <Modal.Actions>
        <FormCancelButton onClick={hideModal} />
        <Form.SubmitButton
          variant='positive'
          data-testid='sourcing-request-status-submit'
        >
          Update
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default UpdateSourcingRequestSpecialistForm
