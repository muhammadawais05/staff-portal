import React from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { DownloadClientBillingReportInput } from '@staff-portal/graphql/staff'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import { useDatepickerTimezoneProps } from '@staff-portal/billing/src/_lib/form/helpers'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'

interface Props {
  handleOnSubmit: (input: DownloadClientBillingReportInput) => void
}

const displayName = 'BillingReportDownloadModalForm'

const BillingReportDownloadModalForm = ({ handleOnSubmit }: Props) => {
  const { t: translate } = useTranslation(['billingDetails', 'common'])
  const { modalContainer } = useExternalIntegratorContext()
  const datepickerTimezoneProps = useDatepickerTimezoneProps()

  return (
    <Form<DownloadClientBillingReportInput>
      data-testid={`${displayName}-form`}
      onSubmit={handleOnSubmit}
    >
      <Modal.Title data-testid={`${displayName}-title`}>
        {translate('billingDetails:modals.billingReportDownload.title')}
      </Modal.Title>
      <Modal.Content>
        <FormBaseErrorContainer />
        <Form.DatePicker
          {...datepickerTimezoneProps}
          data-testid={`${displayName}-startDate`}
          label={translate(
            'billingDetails:modals.billingReportDownload.fields.startDate.label'
          )}
          name='startDate'
          popperContainer={modalContainer}
          required
          autoFocus
          width='full'
          testIds={{
            calendar: `${displayName}-calendar`
          }}
        />
        <Form.DatePicker
          {...datepickerTimezoneProps}
          data-testid={`${displayName}-endDate`}
          label={translate(
            'billingDetails:modals.billingReportDownload.fields.endDate.label'
          )}
          name='endDate'
          popperContainer={modalContainer}
          required
          width='full'
          testIds={{
            calendar: `${displayName}-calendar`
          }}
        />
      </Modal.Content>
      <ModalFooter>
        <Form.SubmitButton data-testid='submit'>
          {translate('common:actions.download')}
        </Form.SubmitButton>
      </ModalFooter>
    </Form>
  )
}

BillingReportDownloadModalForm.displayName = displayName

export default BillingReportDownloadModalForm
