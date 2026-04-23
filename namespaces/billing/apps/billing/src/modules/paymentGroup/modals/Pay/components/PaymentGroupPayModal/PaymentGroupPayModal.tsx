import React from 'react'
import { useTranslation } from 'react-i18next'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalSkeleton } from '@staff-portal/ui'
import { useGetNode } from '@staff-portal/billing/src/utils/graphql'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'

import PaymentGroupPayModalContent from '../PaymentGroupPayModalContent'
import { useGetPaymentGroupPayModalQuery } from '../../data'

interface Props {
  options: Required<Pick<ModalData, 'nodeId' | 'nodeType'>>
}

const PaymentGroupPayModal = ({ options: { nodeId, nodeType } }: Props) => {
  const { data, initialLoading, loading } = useGetNode(
    useGetPaymentGroupPayModalQuery
  )(
    { id: encodeId({ id: nodeId, type: nodeType }) },
    { fetchPolicy: 'network-only' }
  )
  const { t: translate } = useTranslation('paymentGroup')

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <ModalSkeleton
          title={translate('modals.pay.title', { number: nodeId })}
        />
      }
    >
      <PaymentGroupPayModalContent paymentGroup={data} />
    </ContentLoader>
  )
}

export default PaymentGroupPayModal
