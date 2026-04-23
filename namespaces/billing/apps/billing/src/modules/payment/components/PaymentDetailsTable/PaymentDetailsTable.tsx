import { Section } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { DetailedList } from '@staff-portal/ui'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { paymentDetailsUpdateDataEvents } from '@staff-portal/billing-widgets/src/modules/payment/utils'

import DetailsDescription from '../../../commercialDocument/components/DetailsDescription'
import { useGetPaymentDetailsTable } from './data'
import Skeleton from './skeleton'
import getPaymentDetailsTableContent from './utils'

const displayName = 'PaymentDetailsTable'

interface PaymentDetailsTableProps {
  paymentId: string
}

export const PaymentDetailsTable = ({
  paymentId
}: PaymentDetailsTableProps) => {
  const { t: translate } = useTranslation('payment')
  const {
    data: payment,
    loading,
    refetch
  } = useGetPaymentDetailsTable(paymentId)

  useRefetch(paymentDetailsUpdateDataEvents, refetch)

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={loading && !payment}
      skeletonComponent={<Skeleton.PaymentDetailsSkeleton />}
    >
      {payment && (
        <Section
          title={translate('page.details.subtitle')}
          data-testid='PaymentDetailsTable'
        >
          {/* eslint-disable-next-line @toptal/davinci/no-deprecated-props */}
          <DetailedList
            columns={2}
            striped
            labelColumnWidth={8}
            items={getPaymentDetailsTableContent(payment)}
          />
        </Section>
      )}
      <DetailsDescription
        description={payment?.description}
        documentNote={payment?.documentNote}
      />
    </ContentLoader>
  )
}

PaymentDetailsTable.displayName = displayName

export default PaymentDetailsTable
