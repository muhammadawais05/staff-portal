import { Form } from '@toptal/picasso-forms'
import { Modal } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { UpdateCommercialDocumentDueDateInput } from '@staff-portal/graphql/staff'
import * as fieldValidators from '@staff-portal/billing/src/_lib/form/fieldValidators'
import { getCurrentDayAsJSDate } from '@staff-portal/billing/src/_lib/dateTime'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import { useDatepickerTimezoneProps } from '@staff-portal/billing/src/_lib/form/helpers'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import { CommercialDocumentType } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

const displayName = 'CommercialDocumentUpdateDueDateModalForm'

type InputValues = Omit<
  UpdateCommercialDocumentDueDateInput,
  'commercialDocumentId' | 'dueDate'
> & {
  dueDate?: Date
}

interface Props {
  nodeId: string
  nodeType: CommercialDocumentType
  handleOnSubmit: (values: InputValues) => void
  initialValues: InputValues
  documentNumber: number
}

export const CommercialDocumentUpdateDueDateModalForm: FC<Props> = memo<Props>(
  ({ nodeType, handleOnSubmit, initialValues, documentNumber }) => {
    const { t: translate } = useTranslation(['commercialDocument', 'common'])
    const { modalContainer } = useExternalIntegratorContext()
    const i18Key =
      'commercialDocument:modals.updateCommercialDocumentDueDateModal'

    return (
      <Form<InputValues>
        data-testid={displayName}
        onSubmit={handleOnSubmit}
        initialValues={initialValues}
        keepDirtyOnReinitialize
      >
        <Modal.Title data-testid={`${displayName}-title`}>
          {translate(`${i18Key}.title.${nodeType}` as const, {
            documentNumber
          })}
        </Modal.Title>
        <Modal.Content>
          <FormBaseErrorContainer />

          <Form.DatePicker
            autoFocus
            {...useDatepickerTimezoneProps()}
            minDate={getCurrentDayAsJSDate()}
            popperContainer={modalContainer}
            name='dueDate'
            data-testid='dueDate'
            label={translate(`${i18Key}.fields.dueDate.label` as const)}
            validate={fieldValidators.composeValidators(
              fieldValidators.required,
              fieldValidators.futureDate
            )}
            required
          />
          <Form.Input
            data-testid='comment'
            label={translate(`${i18Key}.fields.comment.label` as const)}
            multiline
            name='comment'
            placeholder={translate(
              `${i18Key}.fields.comment.placeholder` as const
            )}
            required
            rowsMin={4}
            validate={fieldValidators.required}
            width='full'
          />
        </Modal.Content>
        <ModalFooter>
          <Form.SubmitButton data-testid='submit' variant='positive'>
            {translate('common:actions.update')}
          </Form.SubmitButton>
        </ModalFooter>
      </Form>
    )
  }
)

CommercialDocumentUpdateDueDateModalForm.displayName = displayName

export default CommercialDocumentUpdateDueDateModalForm
