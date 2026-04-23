import React from 'react'
import { Button } from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'
import { Form, useField } from '@toptal/picasso-forms'

import { PRIORITY_OPTIONS, DUE_DATE_RULE_UNIT_OPTIONS } from '../../config'

type Props = {
  hideModal: () => void
  loading?: boolean
}

const EditPlaybookTemplateForm = ({ hideModal, loading }: Props) => {
  const {
    input: { value: recurring }
  } = useField('recurring')

  return (
    <>
      <Modal.Content>
        <Form.Input
          name='description'
          label='Description'
          width='full'
          required
          data-testid='edit-playbook-template-form-description-field'
        />
        <Form.Input
          name='details'
          label='Details'
          width='full'
          multiline
          rowsMin={4}
          rowsMax={25}
          data-testid='edit-playbook-template-form-details-field'
        />
        <Form.NumberInput
          name='recurring'
          label='Recurring'
          width='full'
          min={0}
        />
        {recurring && (
          <Form.Checkbox
            name='stopRecurringAfterDispute'
            label='Stop recurring after dispute'
          />
        )}
        <Form.NumberInput
          name='dueDateRuleAmount'
          label='Due date rule amount'
          width='full'
          required
          min={0}
          data-testid='edit-playbook-template-form-dueDateRuleAmount-field'
        />
        <Form.Select
          name='dueDateRuleUnit'
          label='Due date rule unit'
          width='full'
          required
          options={DUE_DATE_RULE_UNIT_OPTIONS}
          data-testid='edit-playbook-template-form-dueDateRuleUnit-field'
        />
        <Form.Select
          name='priority'
          label='Priority'
          width='full'
          required
          options={PRIORITY_OPTIONS}
          data-testid='edit-playbook-template-form-priority-field'
        />
        <Form.Checkbox
          name='stopRecurringAfterDispute'
          label='Disable manual finishing'
        />
        <Form.Checkbox
          name='rescheduleDisabled'
          label='Disable manual rescheduling'
        />
        <Form.Checkbox name='communication' label='Communication task' />
        <Form.Checkbox name='important' label='Important' />
        <Form.Checkbox
          name='slackNotificationsEnabled'
          label='Send a Slack notification to a task assignee when the task is created'
        />
      </Modal.Content>

      <Modal.Actions>
        <Button variant='secondary' onClick={hideModal} disabled={loading}>
          Cancel
        </Button>
        <Form.SubmitButton
          variant='positive'
          data-testid='update-playbook-template-form-submit-button'
        >
          Update Template
        </Form.SubmitButton>
      </Modal.Actions>
    </>
  )
}

export default EditPlaybookTemplateForm
