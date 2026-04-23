import { ContentWrapper } from '@staff-portal/page-wrapper'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { TaskSource } from '@staff-portal/graphql/staff'
import {
  decodeId,
  NodeIdPrefix
} from '@staff-portal/billing/src/_lib/helpers/apollo'
import WidgetErrorBoundary from '@staff-portal/billing/src/components/WidgetErrorBoundary'
import { paymentDetailsUpdateDataEvents } from '@staff-portal/billing-widgets/src/modules/payment/messages'
import { useDependency } from '@staff-portal/dependency-injector'

import { RELATED_TASKS } from '../../../../dependencies'
import Transfers from '../../../transfer/components/TableWrapper'
import NotesList from '../../../notable/components/NotesList'
import Memorandums from '../../../commercialDocument/components/Memorandums'
import PaymentDetailsPageHeader from '../../components/PaymentDetailsPageHeader'
import PaymentDetailsTable from '../../components/PaymentDetailsTable'
import EmailStatusPanel from '../../../notifications/components/EmailStatusPanel'

interface Props {
  paymentId: string
}

const PaymentDetails = ({ paymentId: nodeId }: Props) => {
  const nodeType: keyof typeof NodeIdPrefix = 'payment'
  const { t: translate } = useTranslation('payment')
  const RelatedTasks = useDependency(RELATED_TASKS)

  return (
    <ContentWrapper
      actions={
        <WidgetErrorBoundary emptyOnError>
          <PaymentDetailsPageHeader paymentId={nodeId} />
        </WidgetErrorBoundary>
      }
      title={translate('page.header.title', {
        paymentId: decodeId({ id: nodeId, type: nodeType })
      })}
    >
      <PaymentDetailsTable paymentId={nodeId} />
      <WidgetErrorBoundary emptyOnError>
        <Transfers nodeId={nodeId} />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <Memorandums commercialDocumentId={nodeId} />
      </WidgetErrorBoundary>
      {RelatedTasks && (
        <WidgetErrorBoundary emptyOnError>
          <RelatedTasks
            nodeId={nodeId}
            taskSource={TaskSource.RELATED_TASKS_PAYMENT}
            listenedMessages={paymentDetailsUpdateDataEvents}
          />
        </WidgetErrorBoundary>
      )}
      <WidgetErrorBoundary emptyOnError>
        <NotesList nodeId={nodeId} />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <EmailStatusPanel nodeId={nodeId} />
      </WidgetErrorBoundary>
    </ContentWrapper>
  )
}

PaymentDetails.displayName = 'PaymentDetails'

export default PaymentDetails
