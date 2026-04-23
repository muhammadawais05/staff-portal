import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Form, SubmissionErrors } from '@toptal/picasso-forms'
import { Option } from '@toptal/picasso/Select'
import { FormErrors } from '@staff-portal/mutation-result-handlers'

import { Input } from '../../InvestigationUpdateModal'
import { InvestigationJobsSelector, ReasonTypeSelect } from '..'
import { InvestigationJobFragment } from '../../../../data'

export interface Props {
  companyName: string
  clientSpecialistTeamMembers: Option[]
  jobs: InvestigationJobFragment[]
  handleSubmit: (values: Input) => Promise<void | SubmissionErrors | FormErrors>
  initialValues: Input
  submitting: boolean
  hideModal: () => void
  showNoCommsCheckbox: boolean
  modalTitle: string
}

/**
 * TODO use a Context for passing props between components
 * https://toptal-core.atlassian.net/browse/SPB-2273
 */
const InvestigationUpdateModalContent = ({
  clientSpecialistTeamMembers,
  companyName,
  jobs,
  handleSubmit,
  initialValues,
  submitting,
  hideModal,
  showNoCommsCheckbox,
  modalTitle
}: Props) => (
  <ModalForm<Input>
    initialValues={initialValues}
    onSubmit={handleSubmit}
    keepDirtyOnReinitialize
    title={modalTitle}
  >
    <Modal.Content>
      <Container>
        <ReasonTypeSelect
          data-testid='investigation-reason'
          name='reason'
          label='Reason'
          width='full'
          required
        />
        {showNoCommsCheckbox && (
          <Form.Checkbox
            data-testid='NoCommsFlagCheckBox-checkbox'
            name='applyNoCommsFlag'
            label='Label the company with a "No Comms" flag'
          />
        )}
        <Form.Select
          options={clientSpecialistTeamMembers}
          data-testid='investigation-assignee'
          name='clientSpecialistTeamAssigneeId'
          label='Client specialist team assignee'
          width='full'
        />
        <Form.Input
          data-testid='investigation-comment'
          name='comment'
          label='Comment'
          width='full'
          multiline
          rows={4}
          required
        />
        <InvestigationJobsSelector companyName={companyName} jobs={jobs} />
      </Container>
    </Modal.Content>
    <Modal.Actions>
      <Button variant='secondary' disabled={submitting} onClick={hideModal}>
        Cancel
      </Button>
      <Form.SubmitButton>Submit</Form.SubmitButton>
    </Modal.Actions>
  </ModalForm>
)

export default InvestigationUpdateModalContent
