import React from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { Form, SubmissionErrors } from '@toptal/picasso-forms'
import { Option } from '@toptal/picasso/Select'
import { isMaxLength } from '@staff-portal/validators'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { CheckClientComplianceInput } from '@staff-portal/graphql/staff'
import { FormErrors } from '@staff-portal/mutation-result-handlers'

const contactNameHint = `Please make sure the contact name is a person’s actual name, for compliance reasons. What’s listed there currently is the company name.`

interface Props {
  title: string
  handleSubmit: (
    input: CheckClientComplianceInput
  ) => Promise<void | SubmissionErrors | FormErrors>
  initialValues: CheckClientComplianceInput
  showContactNameHint: boolean
  countryOptions: Option[]
  timezoneOptions: Option[]
  hideModal: () => void
  submitting: boolean
}

const CheckClientComplianceModalContent = ({
  title,
  handleSubmit,
  initialValues,
  showContactNameHint,
  countryOptions,
  timezoneOptions,
  hideModal,
  submitting
}: Props) => (
  <ModalForm<CheckClientComplianceInput>
    title={title}
    onSubmit={handleSubmit}
    initialValues={initialValues}
  >
    <Modal.Content>
      <Container bottom='medium'>
        <Typography size='medium'>
          Please verify to make sure that all fields below are filled out
          correctly.
        </Typography>
      </Container>

      <Form.Input
        required
        autoFocus
        width='full'
        name='contactName'
        label='Contact Name'
        hint={showContactNameHint ? contactNameHint : undefined}
        validate={isMaxLength}
        data-testid='check-client-compliance-modal-contact-name'
      />

      <Form.Select
        required
        name='countryId'
        label='Country'
        options={countryOptions}
        width='full'
        data-testid='check-client-compliance-modal-country'
      />

      <Form.Select
        required
        name='timeZoneName'
        label='Time Zone'
        options={timezoneOptions}
        width='full'
        data-testid='check-client-compliance-modal-timezone'
      />
    </Modal.Content>

    <Modal.Actions>
      <Button variant='secondary' onClick={hideModal} disabled={submitting}>
        Cancel
      </Button>
      <Form.SubmitButton
        variant='positive'
        data-testid='check-client-compliance-submit-button'
      >
        Check Compliance
      </Form.SubmitButton>
    </Modal.Actions>
  </ModalForm>
)

export default CheckClientComplianceModalContent
