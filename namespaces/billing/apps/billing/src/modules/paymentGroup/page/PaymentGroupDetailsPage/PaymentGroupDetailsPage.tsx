import React, { FC, memo, ReactElement } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { SkeletonLoader } from '@toptal/picasso'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import { useGetNode } from '@staff-portal/billing/src/utils/graphql'
import WebResourceLinkWrapper from '@staff-portal/billing/src/components/WebResourceLinkWrapper'
import { WebResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql.types'
import WidgetErrorBoundary from '@staff-portal/billing/src/components/WidgetErrorBoundary'
import PaymentGroupPaymentsTable from '@staff-portal/billing-widgets/src/modules/paymentGroup/components/PaymentGroupPaymentsTable'

import { useGetPaymentGroupDetailsSubjectQuery } from '../../data'
import PaymentGroupTotals from '../../components/PaymentGroupTotals'
import PaymentGroupDetailsPageHeader from '../../components/PaymentGroupDetailsPageHeader'

const displayName = 'PaymentGroupDetailsPage'

interface Props {
  paymentGroupId: string
}

const usePageTitle = ({
  data,
  initialLoading
}: {
  data?: { subject: { id: string; webResource: WebResourceFragment } }
  initialLoading: boolean
}): { title: ReactElement; browserTitle: string } => {
  const { t: translate } = useTranslation('paymentGroup')

  const subject = data?.subject
  const webResource = subject?.webResource
  const browserTitle = translate(
    initialLoading ? 'page.header.initialTitle' : 'page.header.browserTitle',
    {
      subject: webResource?.text
    }
  )

  const title = initialLoading ? (
    <SkeletonLoader.Typography />
  ) : (
    <Trans
      i18nKey='page.header.title'
      components={[
        <WebResourceLinkWrapper
          inline
          weight='semibold'
          key={subject?.id}
          webResource={webResource}
        />
      ]}
      t={translate}
    />
  )

  return {
    title,
    browserTitle
  }
}

const PaymentGroupDetailsPage: FC<Props> = memo<Props>(({ paymentGroupId }) => {
  const { data, initialLoading } = useGetNode(
    useGetPaymentGroupDetailsSubjectQuery
  )({ nodeId: paymentGroupId })

  const { title, browserTitle } = usePageTitle({ data, initialLoading })

  return (
    <ContentWrapper
      actions={
        <WidgetErrorBoundary emptyOnError>
          <PaymentGroupDetailsPageHeader paymentGroupId={paymentGroupId} />
        </WidgetErrorBoundary>
      }
      browserTitle={browserTitle}
      title={title}
    >
      <WidgetErrorBoundary emptyOnError>
        <PaymentGroupTotals paymentGroupId={paymentGroupId} />
      </WidgetErrorBoundary>
      <PaymentGroupPaymentsTable paymentGroupId={paymentGroupId} />
    </ContentWrapper>
  )
})

PaymentGroupDetailsPage.displayName = displayName

export default PaymentGroupDetailsPage
