import { useTranslation } from 'react-i18next'
import React from 'react'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalSkeleton } from '@staff-portal/ui'
import {
  decodeId,
  encodeId
} from '@staff-portal/billing/src/_lib/helpers/apollo'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'

import PaymentPayModalContent from '../PaymentPayModalContent'
import { useGetPayModalPayment } from '../../data'

const displayName = 'PaymentPayModal'

interface Props {
  options: Required<Pick<ModalData, 'nodeId' | 'nodeType'>>
}

const PaymentPayModal = ({ options: { nodeId, nodeType } }: Props) => {
  const paymentId = encodeId({
    id: nodeId,
    type: nodeType
  })
  const { data, initialLoading, loading } = useGetPayModalPayment(paymentId)
  const { t: translate } = useTranslation('payment')
  const documentNumber = decodeId({ type: 'payment', id: paymentId })

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <ModalSkeleton
          title={translate('modals.pay.title', { documentNumber })}
        />
      }
    >
      <PaymentPayModalContent payment={data} />
    </ContentLoader>
  )
}

PaymentPayModal.displayName = displayName

export default PaymentPayModal
