import React from 'react'
import { useTranslation } from 'react-i18next'
import { Section, Container } from '@toptal/picasso'
import Divider from '@staff-portal/billing/src/components/Divider'
import { isOperationEnabled } from '@staff-portal/billing/src/_lib/helpers/operations'

import { GetJobQuery, GetJobQueryResult } from '../../data/getJob.graphql.types'
import InvoiceNoteUpdate from '../InvoiceNoteUpdate'
import PurchaseOrderEdit from '../PurchaseOrderEdit'
import PurchaseOrderLineEdit from '../PurchaseOrderLineEdit'
import UpdateAddTimesheetToInvoice from '../UpdateAddTimesheetToInvoice'
import NextPurchaseOrderEdit from '../NextPurchaseOrderEdit'
import NextPurchaseOrderLineEdit from '../NextPurchaseOrderLineEdit'

interface Props {
  job: Exclude<GetJobQuery['node'], null | undefined>
  showInvoiceNote?: boolean
  poLinesEnabled: boolean
  refetch: GetJobQueryResult['refetch']
}

const displayName = 'InvoiceSettingsDetailsTable'

export const InvoiceSettingsDetailsTable = ({
  job,
  showInvoiceNote = true,
  poLinesEnabled = false,
  refetch
}: Props) => {
  const { t: translate } = useTranslation('billingSettings')
  const { invoiceNote, id, operations } = job

  const canUpdateTimesheets = isOperationEnabled({
    operations,
    key: 'updateAttachTimesheetsToInvoices'
  })

  return (
    <Container top='medium'>
      <Section
        variant='withHeaderBar'
        title={translate('invoice.title')}
        data-testid={displayName}
      >
        <Divider />
        {poLinesEnabled ? (
          <>
            <PurchaseOrderLineEdit
              job={job}
              refetch={refetch}
              operation={operations?.assignPurchaseOrderLine}
            />
            <Divider />
            <NextPurchaseOrderLineEdit
              job={job}
              refetch={refetch}
              operation={operations?.assignNextPurchaseOrder}
            />
          </>
        ) : (
          <>
            <PurchaseOrderEdit
              jobId={id}
              operation={operations?.assignPurchaseOrder}
            />
            <Divider />
            <NextPurchaseOrderEdit
              jobId={id}
              operation={operations?.assignNextPurchaseOrder}
            />
          </>
        )}

        <Divider />
        <UpdateAddTimesheetToInvoice
          jobId={id}
          disabled={!canUpdateTimesheets}
        />
        <Divider />
        {showInvoiceNote && (
          <InvoiceNoteUpdate
            invoiceNote={invoiceNote}
            jobId={id}
            operation={operations?.editJobInvoiceNote}
          />
        )}
      </Section>
    </Container>
  )
}

export default InvoiceSettingsDetailsTable
