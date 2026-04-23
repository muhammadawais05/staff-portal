import { Form, FormSpy } from '@toptal/picasso-forms'
import { Modal } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { DownloadRolePaymentHistoryInput } from '@staff-portal/graphql/staff'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import { useDatepickerTimezoneProps } from '@staff-portal/billing/src/_lib/form/helpers'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import { dateAfter } from '@staff-portal/billing/src/_lib/form/fieldValidators'

const displayName = 'PaymentsHistoryModalForm'

interface Props {
  handleOnSubmit: (values: DownloadRolePaymentHistoryInput) => void
}

export const PaymentsHistoryModalForm: FC<Props> = memo<Props>(
  ({ handleOnSubmit }) => {
    const { t: translate } = useTranslation(['receivedPayments', 'common'])
    const { modalContainer } = useExternalIntegratorContext()

    const datepickerTimezoneProps = useDatepickerTimezoneProps()

    return (
      <Form<DownloadRolePaymentHistoryInput>
        data-testid={displayName}
        onSubmit={handleOnSubmit}
        keepDirtyOnReinitialize
      >
        <Modal.Title data-testid={`${displayName}-title`}>
          {translate('modals.history.title')}
        </Modal.Title>
        <Modal.Content>
          <FormBaseErrorContainer />

          <FormSpy>
            {({ values }) => (
              <>
                <Form.DatePicker
                  autoFocus
                  {...datepickerTimezoneProps}
                  popperContainer={modalContainer}
                  name='startDate'
                  data-testid='startDate'
                  label={translate('modals.history.fields.startDate')}
                  width='full'
                  required
                  maxDate={values?.endDate}
                />
                <Form.DatePicker
                  {...datepickerTimezoneProps}
                  popperContainer={modalContainer}
                  name='endDate'
                  data-testid='endDate'
                  label={translate('modals.history.fields.endDate')}
                  width='full'
                  required
                  minDate={values?.startDate}
                  validateField={dateAfter({
                    boundaryDate: values?.startDate,
                    errorMessage: translate('common:validation.greatOrEqual', {
                      unit: 'End Date',
                      value: values?.startDate
                    })
                  })}
                />
              </>
            )}
          </FormSpy>
        </Modal.Content>
        <ModalFooter>
          <Form.SubmitButton data-testid='submit' variant='positive'>
            {translate('modals.history.actions.submit')}
          </Form.SubmitButton>
        </ModalFooter>
      </Form>
    )
  }
)

PaymentsHistoryModalForm.displayName = displayName

export default PaymentsHistoryModalForm
