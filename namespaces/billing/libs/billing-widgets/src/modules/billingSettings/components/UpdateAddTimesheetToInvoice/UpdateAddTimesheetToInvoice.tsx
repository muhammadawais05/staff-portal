import React, { FC, memo } from 'react'
import { Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'

import {
  useUpdateJobAttachTimesheetsToInvoicesMutation,
  useGetJob
} from '../../data'
import UpdateAddTimesheetToInvoiceForm from '../UpdateAddTimesheetToInvoiceForm'
import adjustValues from './adjustVales'

const displayName = 'AddTimesheetToInvoice'
const responseKey = 'updateJobAttachTimesheetsToInvoices'

interface Props {
  jobId: string
  disabled?: boolean
}

const AddTimesheetToInvoice: FC<Props> = memo<Props>(({ jobId, disabled }) => {
  const { t: translate } = useTranslation('billingSettings')
  const { handleOnRootLevelError } = useFormSubmission()

  const { data: { attachTimesheetsToInvoices } = {} } = useGetJob(jobId)
  const [createAssignJobPurchaseOrderMutation] =
    useUpdateJobAttachTimesheetsToInvoicesMutation({
      onRootLevelError: handleOnRootLevelError
    })

  return (
    <Container
      data-testid={displayName}
      padded='xsmall'
      left='xsmall'
      right='xsmall'
      flex
      justifyContent='space-between'
    >
      <Typography size='medium'>
        {translate('invoice.fields.addTimesheetToInvoice.label')}
      </Typography>
      <Form
        onSubmit={handleSubmit({
          handleError: handleOnSubmissionError(responseKey),
          responseKey,
          submit: createAssignJobPurchaseOrderMutation,
          adjustValues
        })}
        initialValues={{
          jobId,
          attachTimesheetsToInvoices:
            attachTimesheetsToInvoices === null
              ? 'nil'
              : attachTimesheetsToInvoices
        }}
      >
        <UpdateAddTimesheetToInvoiceForm disabled={disabled} />
      </Form>
    </Container>
  )
})

AddTimesheetToInvoice.displayName = displayName

export default AddTimesheetToInvoice
