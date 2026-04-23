import React from 'react'
import { Alert, Button, Container } from '@toptal/picasso'
import { AnyObject, Form, SubmissionErrors } from '@toptal/picasso-forms'
import { Modal, ModalForm, ModalSuspender } from '@staff-portal/modals-service'
import { FormBaseErrorContainer } from '@staff-portal/forms'
import { InvestigationReason } from '@staff-portal/graphql/staff'
import { FormErrors } from '@staff-portal/mutation-result-handlers'

import { InvestigationAvailableReason } from '../../../../../../config'
import ReportedIssuesContent from '../ReportedIssuesContent'
import InvestigationReasonInput from '../InvestigationReasonInput'
import { adjustValues } from '../../adjust-values'

interface Props {
  hideModal: () => void
  handleSubmit: (
    input: Record<PropertyKey, unknown>
  ) => Promise<void | SubmissionErrors | FormErrors>
  initialValues: AnyObject
  title: string
  submitting: boolean
  hasNoCommsTokenKey?: boolean
  loading: boolean
  investigationReason: InvestigationAvailableReason
}

const InvestigationResolveModalContent = ({
  handleSubmit,
  initialValues,
  title,
  submitting,
  hideModal,
  hasNoCommsTokenKey,
  investigationReason,
  loading
}: Props) =>
  loading ? (
    <ModalSuspender />
  ) : (
    <ModalForm
      initialValues={initialValues}
      title={title}
      onSubmit={values => handleSubmit(adjustValues(values))}
      data-testid='investigation-resolve-modal-content'
    >
      <Modal.Content>
        <FormBaseErrorContainer />
        <Container>
          <Container bottom={1} data-testid='investigation-resolve-modal-alert'>
            <Alert>
              Are you sure that you want to resolve this investigation? This
              action cannot be reverted.
            </Alert>
          </Container>
          <InvestigationReasonInput investigationReason={investigationReason} />

          {investigationReason === InvestigationReason.REPORTED_ISSUES && (
            <ReportedIssuesContent />
          )}
          {investigationReason === InvestigationReason.LEGAL && (
            <Form.Checkbox
              data-testid='investigation-resolve-modal-settlement-agreement-sent'
              name='settlementAgreementSent'
              label='Settlement Agreement Sent?'
              width='full'
            />
          )}
          {hasNoCommsTokenKey && (
            <Form.Checkbox
              data-testid='investigation-resolve-modal-remove-no-comms-flag'
              label='Remove the "No Comms" flag from this company'
              name='removeNoCommsFlag'
            />
          )}
          <Form.Input
            data-testid='investigation-resolve-modal-comment'
            name='comment'
            label='Comment'
            width='full'
            rowsMin={4}
            rowsMax={10}
            multiline
            required
          />
        </Container>
      </Modal.Content>
      <Modal.Actions>
        <Button
          data-testid='investigation-resolve-modal-cancel'
          variant='secondary'
          disabled={submitting}
          onClick={hideModal}
        >
          Cancel
        </Button>
        <Form.SubmitButton
          data-testid='investigation-resolve-modal-submit'
          variant='positive'
        >
          Submit
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )

export default InvestigationResolveModalContent
