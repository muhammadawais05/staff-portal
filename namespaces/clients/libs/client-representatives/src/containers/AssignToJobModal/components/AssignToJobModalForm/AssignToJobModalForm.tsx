import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { AssignCompanyRepresentativeToJobInput } from '@staff-portal/graphql/staff'
import { Option } from '@toptal/picasso/Select'
import { NOT_SELECTED_PLACEHOLDER } from '@staff-portal/config'

import { AssignCompanyRepresentativeToJobDocument } from '../../data/assign-to-job/assign-to-job.staff.gql.types'

interface Props {
  hideModal: () => void
  companyRepresentativeId: string
  availableJobs: Option[]
}

const AssignToJobModalForm = ({
  hideModal,
  companyRepresentativeId,
  availableJobs
}: Props) => {
  const { handleSubmit, loading: submitting } = useModalFormChangeHandler({
    mutationDocument: AssignCompanyRepresentativeToJobDocument,
    mutationResultOptions: {
      onSuccessAction: hideModal,
      successNotificationMessage: 'The contact has been assigned to the job.'
    },
    errorNotificationMessage: 'Unable to assign the contact to the job.'
  })

  return (
    <ModalForm<AssignCompanyRepresentativeToJobInput>
      data-testid='assign-to-job-modal-content'
      title='Assign this Contact to Job'
      initialValues={{ companyRepresentativeId }}
      onSubmit={handleSubmit}
    >
      <Modal.Content>
        <Container bottom='large'>
          <Form.Select
            name='jobId'
            placeholder={NOT_SELECTED_PLACEHOLDER}
            width='full'
            label='Job'
            options={availableJobs}
            required
          />
        </Container>
      </Modal.Content>

      <Modal.Actions>
        <Button onClick={hideModal} variant='secondary' disabled={submitting}>
          Cancel
        </Button>

        <Form.SubmitButton variant='positive'>Assign</Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default AssignToJobModalForm
