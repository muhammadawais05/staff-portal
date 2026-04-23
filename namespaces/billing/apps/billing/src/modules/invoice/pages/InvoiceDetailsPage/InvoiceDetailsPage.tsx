import { ContentWrapper } from '@staff-portal/page-wrapper'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { TaskSource } from '@staff-portal/graphql/staff'
import { decodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import WidgetErrorBoundary from '@staff-portal/billing/src/components/WidgetErrorBoundary'
import { invoiceDetailsUpdateDataEvents } from '@staff-portal/billing-widgets/src/modules/invoice/messages'
import { useDependency } from '@staff-portal/dependency-injector'

import { RELATED_TASKS } from '../../../../dependencies'
import ConsolidatedInvoices from '../../components/ConsolidatedInvoices'
import EmailStatusPanel from '../../../notifications/components/EmailStatusPanel'
import InvoiceDetailsPageHeader from '../../components/InvoiceDetailsPageHeader'
import InvoiceDetailsTable from '../../components/InvoiceDetailsTable'
import Memorandums from '../../../commercialDocument/components/Memorandums'
import Transfers from '../../../transfer/components/TableWrapper'
import NotesList from '../../../notable/components/NotesList'

const displayName = 'InvoiceDetailsPage'

interface Props {
  invoiceId: string
}

export const InvoiceDetailsPage = ({ invoiceId }: Props) => {
  const { t: translate } = useTranslation('invoice')
  const documentNumber = decodeId({ type: 'invoice', id: invoiceId })
  const RelatedTasks = useDependency(RELATED_TASKS)

  return (
    <ContentWrapper
      title={translate('invoiceDetails.header.title', { documentNumber })}
      actions={
        <WidgetErrorBoundary emptyOnError>
          <InvoiceDetailsPageHeader invoiceId={invoiceId} />
        </WidgetErrorBoundary>
      }
    >
      <InvoiceDetailsTable invoiceId={invoiceId} />
      <WidgetErrorBoundary emptyOnError>
        <Transfers nodeId={invoiceId} />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <Memorandums commercialDocumentId={invoiceId} />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <ConsolidatedInvoices invoiceId={invoiceId} />
      </WidgetErrorBoundary>
      {RelatedTasks && (
        <WidgetErrorBoundary emptyOnError>
          <RelatedTasks
            nodeId={invoiceId}
            taskSource={TaskSource.RELATED_TASKS_INVOICE}
            listenedMessages={invoiceDetailsUpdateDataEvents}
          />
        </WidgetErrorBoundary>
      )}
      <WidgetErrorBoundary emptyOnError>
        <NotesList nodeId={invoiceId} />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <EmailStatusPanel nodeId={invoiceId} />
      </WidgetErrorBoundary>
    </ContentWrapper>
  )
}

InvoiceDetailsPage.displayName = displayName

export default InvoiceDetailsPage
