import React, { FC, memo } from 'react'
import { Container, Typography } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import {
  EditJobInvoiceNoteInput,
  Maybe,
  Operation
} from '@staff-portal/graphql/staff'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import InlineForm from '@staff-portal/billing/src/components/InlineForm'

import { useEditJobInvoiceNoteMutation } from '../../data'
import InvoiceNoteUpdateForm from '../InvoiceNoteUpdateForm'
import * as S from './styles'
import adjustValues from './adjustValues'

const displayName = 'InvoiceNoteUpdate'
const responseKey = 'editJobInvoiceNote'

interface Props {
  invoiceNote?: Maybe<string>
  jobId: string
  operation?: Operation
}

const InvoiceNoteUpdate: FC<Props> = memo<Props>(
  ({ invoiceNote = '', jobId, operation }) => {
    const { t: translate } = useTranslation('billingSettings')
    const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
    const [createEditJobInvoiceNoteMutation] = useEditJobInvoiceNoteMutation({
      onRootLevelError: handleOnRootLevelError
    })
    const handleOnSubmit = handleSubmit({
      handleError: handleOnSubmissionError(responseKey),
      handleSuccess: handleOnSuccess({
        apolloEvent: ApolloContextEvents.jobInvoiceNoteUpdate,
        successMessage: translate('notification.invoiceNote.success')
      }),
      responseKey,
      submit: createEditJobInvoiceNoteMutation,
      adjustValues
    })

    return (
      <InlineForm<EditJobInvoiceNoteInput>
        striped
        operation={operation}
        data-testid='invoice-note'
        label={
          <Typography size='medium'>
            {translate('invoice.fields.invoiceNote.label')}
          </Typography>
        }
        onSubmit={handleOnSubmit}
        initialValues={{ invoiceNote: invoiceNote || undefined, jobId }}
        editComponent={<InvoiceNoteUpdateForm />}
      >
        <Container css={S.background}>
          <Container rounded variant='yellow' padded='medium' bottom='small'>
            <Typography data-testid='invoice-note-content' size='medium'>
              {invoiceNote || translate('invoice.fields.invoiceNote.fallback')}
            </Typography>
          </Container>
        </Container>
      </InlineForm>
    )
  }
)

InvoiceNoteUpdate.displayName = displayName

export default InvoiceNoteUpdate
