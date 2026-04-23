import { ContentWrapper } from '@staff-portal/page-wrapper'
import React from 'react'
import { TaskSource, Maybe } from '@staff-portal/graphql/staff'
import { Section } from '@toptal/picasso'
import WidgetErrorBoundary from '@staff-portal/billing/src/components/WidgetErrorBoundary'
import { useDependency } from '@staff-portal/dependency-injector'

import NotesList from '../../../notable/components/NotesList'
import PurchaseOrderLineDetailsPageHeader from '../../components/PurchaseOrderLineDetailsPageHeader'
import PurchaseOrderLineInvoices from '../../components/PurchaseOrderInvoices'
import PurchaseOrderLineJobsTable from '../../components/PurchaseOrderLineJobsTable'
import PurchaseOrderLineDetailsTable from './components/PurchaseOrderLineDetailsTable'
import { RELATED_TASKS } from '../../../../dependencies'
import { getPurchaseOrderLineTitle } from '../../utils'

interface Props {
  purchaseOrderLineId: string
  purchaseOrderId: Maybe<string>
}

const PurchaseOrderLineDetails = ({
  purchaseOrderLineId: nodeId,
  purchaseOrderId
}: Props) => {
  const RelatedTasks = useDependency(RELATED_TASKS)

  return (
    <ContentWrapper
      title={getPurchaseOrderLineTitle(nodeId, purchaseOrderId)}
      actions={
        <WidgetErrorBoundary emptyOnError>
          <PurchaseOrderLineDetailsPageHeader purchaseOrderLineId={nodeId} />
        </WidgetErrorBoundary>
      }
    >
      <Section title='Details'>
        <PurchaseOrderLineDetailsTable purchaseOrderLineId={nodeId} />
      </Section>
      <PurchaseOrderLineJobsTable nodeId={nodeId} />
      <WidgetErrorBoundary emptyOnError>
        <PurchaseOrderLineInvoices nodeId={nodeId} />
      </WidgetErrorBoundary>
      {RelatedTasks && (
        <WidgetErrorBoundary emptyOnError>
          <RelatedTasks
            nodeId={nodeId}
            taskSource={TaskSource.RELATED_TASKS_PURCHASE_ORDER}
          />
        </WidgetErrorBoundary>
      )}
      <WidgetErrorBoundary emptyOnError>
        <NotesList nodeId={nodeId} />
      </WidgetErrorBoundary>
    </ContentWrapper>
  )
}

PurchaseOrderLineDetails.displayName = 'PurchaseOrderLineDetails'

export default PurchaseOrderLineDetails
