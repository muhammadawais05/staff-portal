import { ContentWrapper } from '@staff-portal/page-wrapper'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TaskSource } from '@staff-portal/graphql/staff'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import {
  decodeId,
  NodeIdPrefix
} from '@staff-portal/billing/src/_lib/helpers/apollo'
import WidgetErrorBoundary from '@staff-portal/billing/src/components/WidgetErrorBoundary'
import { useGetExperimentsQuery } from '@staff-portal/billing/src/data/getExperiments.graphql.types'
import { useDependency } from '@staff-portal/dependency-injector'

import { RELATED_TASKS } from '../../../../dependencies'
import PurchaseOrderDetailsJobsList from '../../components/PurchaseOrderDetailsJobsList'
import NotesList from '../../../notable/components/NotesList'
import PurchaseOrderDetailsPageHeader from '../../components/PurchaseOrderDetailsPageHeader'
import PurchaseOrderDetailsTable from './components/PurchaseOrderDetailsTable'
import PurchaseOrderLinesTable from './components/PurchaseOrderLinesTable'
import PurchaseOrderInvoices from '../../components/PurchaseOrderInvoices'

interface Props {
  purchaseOrderId: string
}

const PurchaseOrderDetails = ({ purchaseOrderId: nodeId }: Props) => {
  const nodeType: keyof typeof NodeIdPrefix = 'purchaseOrder'
  const { t: translate } = useTranslation('purchaseOrder')
  const { data: poLinesExperiment } = useGetExperimentsQuery()
  const poLinesEnabled = Boolean(
    poLinesExperiment?.experiments?.poLines?.enabled
  )
  const RelatedTasks = useDependency(RELATED_TASKS)

  return (
    <ContentWrapper
      title={translate('page.header.title', {
        purchaseOrderId: decodeId({ id: nodeId, type: nodeType })
      })}
      actions={
        <WidgetErrorBoundary emptyOnError>
          <PurchaseOrderDetailsPageHeader
            poLinesEnabled={poLinesEnabled}
            purchaseOrderId={nodeId}
          />
        </WidgetErrorBoundary>
      }
    >
      <PurchaseOrderDetailsTable
        purchaseOrderId={nodeId}
        poLinesEnabled={poLinesEnabled}
      />
      {poLinesEnabled ? (
        <PurchaseOrderLinesTable purchaseOrderId={nodeId} />
      ) : (
        <>
          <PurchaseOrderDetailsJobsList purchaseOrderId={nodeId} />
          <WidgetErrorBoundary emptyOnError>
            <PurchaseOrderInvoices nodeId={nodeId} />
          </WidgetErrorBoundary>
        </>
      )}
      {RelatedTasks && !poLinesEnabled && (
        <WidgetErrorBoundary emptyOnError>
          <RelatedTasks
            nodeId={nodeId}
            taskSource={TaskSource.RELATED_TASKS_PURCHASE_ORDER}
            listenedMessages={[
              ApolloContextEvents.purchaseOrderCreate,
              ApolloContextEvents.purchaseOrderUpdate
            ]}
          />
        </WidgetErrorBoundary>
      )}
      <WidgetErrorBoundary emptyOnError>
        <NotesList nodeId={nodeId} />
      </WidgetErrorBoundary>
    </ContentWrapper>
  )
}

PurchaseOrderDetails.displayName = 'PurchaseOrderDetails'

export default PurchaseOrderDetails
