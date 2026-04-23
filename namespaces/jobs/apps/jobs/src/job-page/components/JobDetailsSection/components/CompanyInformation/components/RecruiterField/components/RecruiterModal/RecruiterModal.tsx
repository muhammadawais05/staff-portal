import React, { useRef } from 'react'
import { Button } from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import { isMaxLength } from '@staff-portal/validators'
import { NodeType } from '@staff-portal/graphql'
import { FormClaimerSelect } from '@staff-portal/jobs'

import useUpdateJobClaimer from '../../hooks/use-update-job-claimer'

export type UpdateJobClaimerForm = {
  jobId: string
  claimerId: string
  comment: string
}

export type RecruiterModalProps = {
  jobId: string
  claimerId?: string
  hideModal: () => void
}

const RecruiterModal = ({
  jobId,
  claimerId,
  hideModal
}: RecruiterModalProps) => {
  const { handleSubmit, loading } = useUpdateJobClaimer(hideModal)
  const initialValues = useRef({
    jobId,
    claimerId,
    comment: ''
  })

  return (
    <Modal
      withForm
      onClose={hideModal}
      operationVariables={{
        nodeId: jobId,
        nodeType: NodeType.JOB,
        operationName: 'updateJobClaimer'
      }}
      open
      size='small'
      data-testid='reassign-recruiter-modal'
    >
      <Modal.Title>Reassign Recruiter</Modal.Title>

      <Form<UpdateJobClaimerForm>
        onSubmit={handleSubmit}
        initialValues={initialValues.current}
      >
        <Modal.Content>
          <FormClaimerSelect
            label='Claimer'
            required
            width='full'
            name='claimerId'
          />
          <Form.Input
            required
            multiline
            rows={4}
            width='full'
            name='comment'
            label='Comment'
            validate={isMaxLength}
          />
        </Modal.Content>

        <Modal.Actions>
          <Button variant='secondary' disabled={loading} onClick={hideModal}>
            Cancel
          </Button>
          <Form.SubmitButton variant='positive'>
            Reassign Recruiter
          </Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default RecruiterModal
