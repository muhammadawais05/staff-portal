import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import React, { useMemo } from 'react'
import { addDays, getDateString } from '@staff-portal/date-time-utils'
import { FormCancelButton, FormDatePickerWrapper } from '@staff-portal/forms'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { isMaxLength } from '@staff-portal/validators'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { NodeType } from '@staff-portal/graphql'
import { Scalars } from '@staff-portal/graphql/staff'

import { PauseTalentDocument } from './data'

interface PauseApplicationModalForm {
  dueDate: Scalars['Date']
  comment: string
}

export interface Props {
  talentId: string
  hideModal: () => void
}

const PauseApplicationModal = ({ talentId, hideModal }: Props) => {
  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  const minDate = useMemo(() => new Date(), [])
  const initialDate = useMemo(
    () => getDateString(addDays(minDate, 7)),
    [minDate]
  )

  const { handleSubmit: handleSubmitMutation, loading } =
    useModalFormChangeHandler({
      mutationDocument: PauseTalentDocument,
      mutationResultOptions: {
        successNotificationMessage: 'Application has been paused.',
        successMessageEmitOptions: {
          type: TALENT_UPDATED,
          payload: { talentId }
        },
        onSuccessAction: hideModal
      },
      errorNotificationMessage: 'An error occurred. Application was not paused.'
    })

  const handleSubmit = ({ dueDate, comment }: PauseApplicationModalForm) =>
    handleSubmitMutation({
      talentId,
      dueDate,
      comment
    })

  return (
    <Modal
      onClose={hideModal}
      open
      size='small'
      operationVariables={{
        nodeId: talentId,
        nodeType: NodeType.TALENT,
        operationName: 'pauseTalent'
      }}
    >
      <ModalForm<PauseApplicationModalForm>
        onSubmit={handleSubmit}
        title='Pause Application'
      >
        <Modal.Content>
          <Container bottom='small'>
            <Typography size='medium'>
              Do you really want to pause this application?
            </Typography>
          </Container>

          <Container bottom='small'>
            <FormDatePickerWrapper
              name='dueDate'
              label='Due date'
              width='full'
              required
              autoFocus
              initialValue={initialDate}
              minDate={minDate}
            />
          </Container>

          <Form.Input
            required
            multiline
            rows={4}
            width='full'
            name='comment'
            label='Comment'
            placeholder='Please specify a reason.'
            validate={isMaxLength}
          />
        </Modal.Content>

        <Modal.Actions>
          <FormCancelButton onClick={hideModal} />
          <Form.SubmitButton variant='negative' loading={loading}>
            Pause Application
          </Form.SubmitButton>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default PauseApplicationModal
