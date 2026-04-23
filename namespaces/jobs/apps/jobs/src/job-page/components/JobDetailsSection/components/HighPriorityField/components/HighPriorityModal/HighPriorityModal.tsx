import React, { useRef } from 'react'
import { Modal } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { Maybe } from '@toptal/picasso/utils'
import { isMaxLength } from '@staff-portal/validators'
import { NodeType } from '@staff-portal/graphql'

import useSetJobPriority from '../../hooks/use-set-job-priority'

const HIGH_PRIORITY_OPTIONS = [
  { text: 'Yes', value: 'Yes' },
  { text: 'No', value: 'No' }
]

export type SetJobPriorityForm = {
  jobId: string
  highPriority: string
  comment: string
}

export type HighPriorityModalProps = {
  jobId: string
  highPriority: Maybe<boolean>
  hideModal: () => void
}

const HighPriorityModal = ({
  jobId,
  highPriority,
  hideModal
}: HighPriorityModalProps) => {
  const { handleSubmit, loading } = useSetJobPriority(hideModal)
  const initialValues = useRef({
    jobId,
    highPriority: highPriority ? 'Yes' : 'No',
    comment: ''
  })

  return (
    <Modal
      withForm
      onClose={hideModal}
      operationVariables={{
        nodeId: jobId,
        nodeType: NodeType.JOB,
        operationName: 'setJobPriority'
      }}
      open
      size='small'
      data-testid='high-priority-modal'
    >
      <Modal.Title>Update Job Priority</Modal.Title>

      <Form<SetJobPriorityForm>
        onSubmit={handleSubmit}
        initialValues={initialValues.current}
      >
        <Modal.Content>
          <Form.Select
            label='High Priority'
            placeholder='Select job priority'
            required
            width='full'
            name='highPriority'
            options={HIGH_PRIORITY_OPTIONS}
          />
          <Form.Input
            required
            multiline
            rows={4}
            width='full'
            name='comment'
            label='Comment'
            placeholder='Please specify a reason'
            validate={isMaxLength}
          />
        </Modal.Content>

        <Modal.Actions>
          <Button variant='secondary' disabled={loading} onClick={hideModal}>
            Cancel
          </Button>
          <Form.SubmitButton variant='positive'>Update</Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default HighPriorityModal
