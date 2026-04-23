import React, { useRef } from 'react'
import { Modal } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import {
  UpdateJobTalentCountInput,
  FeedbackReasonActions
} from '@staff-portal/graphql/staff'
import { Maybe } from '@toptal/picasso/utils'
import { FormReasonSelect } from '@staff-portal/feedbacks'
import { NodeType } from '@staff-portal/graphql'

import { useUpdateNumberOfDesiredHires } from '../../hooks/use-update-number-of-desired-hires'

export interface NumberOfDesiredHiresModalProps {
  jobId: string
  talentCount: Maybe<number>
  hideModal: () => void
}

const NumberOfDesiredHiresModal = ({
  jobId,
  talentCount,
  hideModal
}: NumberOfDesiredHiresModalProps) => {
  const initialValues = useRef({
    jobId,
    talentCount: talentCount ?? undefined,
    reasonId: '',
    comment: ''
  })
  const { handleSubmit, loading } = useUpdateNumberOfDesiredHires(hideModal)

  return (
    <Modal
      withForm
      open
      onClose={hideModal}
      operationVariables={{
        nodeId: jobId,
        nodeType: NodeType.JOB,
        operationName: 'updateJobTalentCount'
      }}
      data-testid='NumberOfDesiredHiresModal'
    >
      <Form<UpdateJobTalentCountInput>
        initialValues={initialValues.current}
        data-testid='NumberOfDesiredHiresModal-form'
        onSubmit={handleSubmit}
      >
        <Modal.Title>Edit Number of Desired Hires</Modal.Title>
        <Modal.Content>
          <Form.NumberInput
            name='talentCount'
            label='Number of Desired Hires'
            step='1'
            max='10000'
            min='1'
            width='full'
            required
            data-testid='NumberOfDesiredHiresModal-talentCount'
          />
          <FormReasonSelect
            label='Reason'
            name='reasonId'
            required
            enableReset
            width='full'
            data-testid='NumberOfDesiredHiresModal-reason'
            action={FeedbackReasonActions.TALENT_COUNT_UPDATED}
          />
          <Form.Input
            label='Comment'
            name='comment'
            required
            width='full'
            multiline
            rows={4}
            data-testid='NumberOfDesiredHiresModal-comment'
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            variant='secondary'
            disabled={loading}
            onClick={hideModal}
            data-testid='NumberOfDesiredHiresModal-submit'
          >
            Cancel
          </Button>
          <Form.SubmitButton variant='positive'>Update</Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default NumberOfDesiredHiresModal
