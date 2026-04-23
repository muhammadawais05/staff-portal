import { Container, Modal, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import {
  DisputeCommercialDocumentInput,
  UpdateDisputeInput
} from '@staff-portal/graphql/staff'
import { useDatepickerTimezoneProps } from '@staff-portal/billing/src/_lib/form/helpers'
import * as fieldValidators from '@staff-portal/billing/src/_lib/form/fieldValidators'
import { getCurrentDayAsJSDate } from '@staff-portal/billing/src/_lib/dateTime'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import { CommercialDocumentType } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

export type DisputeFormInput = Omit<
  DisputeCommercialDocumentInput | UpdateDisputeInput,
  'clientMutationId'
>

interface Props {
  handleSubmit: (values: DisputeFormInput) => void
  includeTalentPayments?: boolean
  initialValues: DisputeFormInput
  nodeId: string
  nodeType: CommercialDocumentType
}

const displayName = 'DisputeForm'

const DisputeForm = ({
  handleSubmit,
  includeTalentPayments,
  initialValues,
  nodeId,
  nodeType: commercialDocumentType
}: Props) => {
  const { t: translate } = useTranslation('commercialDocument')
  const { modalContainer } = useExternalIntegratorContext()

  return (
    <Form<DisputeFormInput>
      data-testid={displayName}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Modal.Title data-testid={`${displayName}-title`}>
        {translate(`modals.dispute.${commercialDocumentType}.title` as const, {
          nodeId
        })}
      </Modal.Title>
      <Modal.Content>
        <FormBaseErrorContainer />
        <Container bottom={2}>
          <Typography size='medium' data-testid={`${displayName}-intro`}>
            {translate(
              `modals.dispute.${commercialDocumentType}.intro` as const
            )}
          </Typography>
        </Container>
        {commercialDocumentType === CommercialDocumentType.invoice && (
          <Form.DatePicker
            // eslint-disable-next-line
            {...useDatepickerTimezoneProps()}
            autoFocus
            data-testid='actionDueOn'
            label={translate('modals.dispute.fields.dueDate.label')}
            minDate={getCurrentDayAsJSDate()}
            name='actionDueOn'
            popperContainer={modalContainer}
            required
            validate={fieldValidators.composeValidators(
              fieldValidators.required,
              fieldValidators.futureDate
            )}
            width='full'
          />
        )}
        <Form.Input
          data-testid='comment'
          label={translate('modals.dispute.fields.comment.label')}
          multiline
          name='comment'
          placeholder={translate('modals.dispute.fields.comment.placeholder')}
          required
          rowsMin={4}
          validate={fieldValidators.required}
          width='full'
        />
        {includeTalentPayments && (
          <Form.Checkbox
            data-testid='disputeTalentPayments'
            label={translate(
              'modals.dispute.fields.disputeTalentPayments.label'
            )}
            name='disputeTalentPayments'
            titleCase={false}
          />
        )}
      </Modal.Content>
      <ModalFooter>
        <Form.SubmitButton
          data-testid='submit'
          variant={
            commercialDocumentType === CommercialDocumentType.payment
              ? 'negative'
              : 'positive'
          }
        >
          {translate(
            `modals.dispute.${commercialDocumentType}.actions.submit` as const
          )}
        </Form.SubmitButton>
      </ModalFooter>
    </Form>
  )
}

DisputeForm.displayName = displayName

export default memo(DisputeForm)
