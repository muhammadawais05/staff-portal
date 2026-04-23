import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Modal, ReferralBonus16 } from '@toptal/picasso'
import { Form, FormConfigProps } from '@toptal/picasso-forms'
import { RecordUnappliedCashInput } from '@staff-portal/graphql/staff'
import { DEFAULT_ISO_DATE_FORMAT } from '@staff-portal/date-time-utils'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import { useDatepickerTimezoneProps } from '@staff-portal/billing/src/_lib/form/helpers'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import {
  cleanNegativeNumberValue,
  formatCleanNegativeNumberValue
} from '@staff-portal/billing/src/_lib/form/handlers'

import { getMinimumDate, getCurrentDay } from '../../utils'

interface Props {
  handleOnSubmit: (values: RecordUnappliedCashInput) => void
  initialValues?: Pick<RecordUnappliedCashInput, 'clientId'>
  title: string
  handleOnClose?: () => void
  submitButtonText: string
}

const displayName = 'UnappliedCashRecordModalForm'

const FORM_CONFIG_PROPS: FormConfigProps = {
  requiredVariant: 'asterisk'
}

const UnappliedCashRecordModalForm = ({
  initialValues,
  title,
  handleOnClose,
  handleOnSubmit,
  submitButtonText
}: Props) => {
  const { t: translate } = useTranslation(['billingDetails', 'common'])
  const { modalContainer } = useExternalIntegratorContext()
  const hasCancelButton = !handleOnClose
  const datepickerTimezoneProps = useDatepickerTimezoneProps()
  const datePickerProps = {
    ...datepickerTimezoneProps,
    minDate: getMinimumDate(),
    maxDate: getCurrentDay()
  }

  return (
    <Form.ConfigProvider value={FORM_CONFIG_PROPS}>
      <Form<RecordUnappliedCashInput>
        data-testid={`${displayName}-form`}
        onSubmit={handleOnSubmit}
        initialValues={initialValues}
        keepDirtyOnReinitialize
      >
        <Modal.Title data-testid={`${displayName}-title`}>{title}</Modal.Title>
        <Modal.Content>
          <FormBaseErrorContainer />
          <Form.DatePicker
            {...datePickerProps}
            popperContainer={modalContainer}
            name='effectiveDate'
            data-testid={`${displayName}-effectiveDate`}
            label={translate(
              'billingDetails:modals.recordUnappliedCash.fields.effectiveDate.label'
            )}
            width='full'
            displayDateFormat={DEFAULT_ISO_DATE_FORMAT}
            editDateFormat={DEFAULT_ISO_DATE_FORMAT}
            required
          />
          <Form.NumberInput
            data-testid={`${displayName}-amount`}
            enableReset
            required
            hideControls
            formatOnBlur
            format={formatCleanNegativeNumberValue}
            parse={cleanNegativeNumberValue}
            name='amount'
            label={translate(
              'billingDetails:modals.recordUnappliedCash.fields.amount.label'
            )}
            width='full'
            icon={<ReferralBonus16 />}
          />
          <Form.Input
            autoComplete='off'
            data-testid={`${displayName}-comment`}
            label={translate(
              'billingDetails:modals.recordUnappliedCash.fields.comment.label'
            )}
            multiline
            name='comment'
            required
            rowsMin={4}
            width='full'
          />
        </Modal.Content>
        <ModalFooter hasCancelButton={hasCancelButton}>
          <>
            {!hasCancelButton && (
              <Button
                data-testid='cancel'
                onClick={handleOnClose}
                variant='secondary'
              >
                {translate('common:actions.close')}
              </Button>
            )}
            <Form.SubmitButton
              data-testid={`${displayName}-submit`}
              variant='positive'
            >
              {submitButtonText}
            </Form.SubmitButton>
          </>
        </ModalFooter>
      </Form>
    </Form.ConfigProvider>
  )
}

UnappliedCashRecordModalForm.displayName = displayName

export default UnappliedCashRecordModalForm
