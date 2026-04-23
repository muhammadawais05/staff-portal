import React from 'react'
import { Form, useForm, useFormState } from '@toptal/picasso-forms'
import { Option } from '@toptal/picasso/Select/types'
import { Typography } from '@toptal/picasso'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'

const displayName = 'UpdateAddTimesheetToInvoiceForm'

const OPTIONS = [
  {
    value: 'nil',
    text: 'Use company setting'
  },
  {
    value: true,
    text: 'Yes'
  },
  {
    value: false,
    text: 'No'
  }
]

type Props = {
  disabled?: boolean
}

const getTextPlaceholderValue = (value: string | boolean) =>
  OPTIONS.find(option => option.value === value)?.text

const UpdateAddTimesheetToInvoiceForm = ({ disabled }: Props) => {
  const { modalContainer } = useExternalIntegratorContext()
  const { submit } = useForm()
  const { submitting, values } = useFormState()

  return (
    <>
      <FormBaseErrorContainer />
      {disabled ? (
        <Typography size='xsmall'>
          {getTextPlaceholderValue(values.attachTimesheetsToInvoices)}
        </Typography>
      ) : (
        <Form.Select
          name='attachTimesheetsToInvoices'
          size='small'
          data-testid='attachTimesheetsToInvoices'
          defaultValue='null'
          options={OPTIONS as Option[]}
          popperContainer={modalContainer}
          disabled={submitting}
          loading={submitting}
          width='auto'
          onChange={submit}
        />
      )}
    </>
  )
}

UpdateAddTimesheetToInvoiceForm.displayName = displayName

export default UpdateAddTimesheetToInvoiceForm
