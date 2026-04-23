import { useFormState, Form } from '@toptal/picasso-forms'
import { Modal } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { CommissionStatus } from '@staff-portal/graphql/staff'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import { useDatepickerTimezoneProps } from '@staff-portal/billing/src/_lib/form/helpers'
import { dateAfter } from '@staff-portal/billing/src/_lib/form/fieldValidators'

const displayName = 'DownloadCommissionsModalForm'

export const DownloadCommissionsModalForm = () => {
  const { t: translate } = useTranslation('receivedPayments')
  const { modalContainer } = useExternalIntegratorContext()
  const { values } = useFormState()
  const datepickerTimezoneProps = useDatepickerTimezoneProps()

  return (
    <>
      <Modal.Title data-testid={`${displayName}-title`}>
        {translate('modals.commissions.title')}
      </Modal.Title>
      <Modal.Content>
        <FormBaseErrorContainer />

        <Form.RadioGroup
          name='filter.commissionStatus'
          label={translate('modals.commissions.fields.commissionStatus.label')}
          required
        >
          <Form.Radio
            data-testid='paid'
            label={translate(
              'modals.commissions.fields.commissionStatus.fields.paid'
            )}
            value={CommissionStatus.PAID}
            titleCase={false}
          />
          <Form.Radio
            data-testid='outstanding'
            label={translate(
              'modals.commissions.fields.commissionStatus.fields.outstanding'
            )}
            value={CommissionStatus.OUTSTANDING}
            titleCase={false}
          />
        </Form.RadioGroup>

        {values.filter.commissionStatus === CommissionStatus.PAID && (
          <>
            <Form.DatePicker
              {...datepickerTimezoneProps}
              popperContainer={modalContainer}
              name='filter.startDate'
              data-testid='startDate'
              label={translate('modals.commissions.fields.startDate')}
              width='full'
              required
              maxDate={values?.filter?.endDate}
            />
            <Form.DatePicker
              {...datepickerTimezoneProps}
              popperContainer={modalContainer}
              name='filter.endDate'
              data-testid='endDate'
              label={translate('modals.commissions.fields.endDate')}
              width='full'
              required
              minDate={values?.filter?.startDate}
              validateField={dateAfter({
                boundaryDate: values?.startDate,
                errorMessage: translate('common:validation.greatOrEqual', {
                  unit: 'End Date',
                  value: values?.filter?.startDate
                })
              })}
            />
          </>
        )}
      </Modal.Content>
      <ModalFooter>
        <Form.SubmitButton data-testid='submit' variant='positive'>
          {translate('modals.commissions.actions.submit')}
        </Form.SubmitButton>
      </ModalFooter>
    </>
  )
}

DownloadCommissionsModalForm.displayName = displayName

export default DownloadCommissionsModalForm
