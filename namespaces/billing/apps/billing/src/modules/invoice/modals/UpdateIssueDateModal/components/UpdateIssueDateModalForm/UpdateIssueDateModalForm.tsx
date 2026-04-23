import { Form } from '@toptal/picasso-forms'
import { Modal } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { Scalars, UpdateIssueDateInput } from '@staff-portal/graphql/staff'
import * as fieldValidators from '@staff-portal/billing/src/_lib/form/fieldValidators'
import { parse } from '@staff-portal/billing/src/_lib/dateTime'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import { useDatepickerTimezoneProps } from '@staff-portal/billing/src/_lib/form/helpers'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'

const displayName = 'UpdateIssueDateModalForm'

type InputValues = Omit<UpdateIssueDateInput, 'issueDate'> & {
  issueDate?: Date
}

interface Props {
  documentNumber: string
  handleOnSubmit: (values: InputValues) => void
  initialValues: InputValues
  minValue: Scalars['Date']
}

export const UpdateIssueDateModalForm: FC<Props> = memo<Props>(
  ({ documentNumber, handleOnSubmit, initialValues, minValue }) => {
    const { t: translate } = useTranslation('invoice')
    const { modalContainer } = useExternalIntegratorContext()

    return (
      <Form<InputValues>
        data-testid={displayName}
        onSubmit={handleOnSubmit}
        initialValues={initialValues}
        keepDirtyOnReinitialize
      >
        <Modal.Title data-testid={`${displayName}-title`}>
          {translate(`updateIssueDateModalForm.title`, {
            documentNumber
          })}
        </Modal.Title>
        <Modal.Content>
          <FormBaseErrorContainer />

          <Form.DatePicker
            autoFocus
            {...useDatepickerTimezoneProps()}
            minDate={parse(minValue).toJSDate()}
            popperContainer={modalContainer}
            name='issueDate'
            data-testid='issueDate'
            label={translate(`updateIssueDateModalForm.fields.issueDate.label`)}
            validate={fieldValidators.composeValidators(
              fieldValidators.required
            )}
            required
          />
          <Form.Input
            data-testid='comment'
            label={translate(`updateIssueDateModalForm.fields.comment.label`)}
            multiline
            name='comment'
            placeholder={translate(
              `updateIssueDateModalForm.fields.comment.placeholder`
            )}
            required
            rowsMin={4}
            validate={fieldValidators.required}
            width='full'
          />
        </Modal.Content>
        <ModalFooter>
          <Form.SubmitButton data-testid='submit' variant='positive'>
            {translate('updateIssueDateModalForm.actions.submit')}
          </Form.SubmitButton>
        </ModalFooter>
      </Form>
    )
  }
)

UpdateIssueDateModalForm.displayName = displayName

export default UpdateIssueDateModalForm
