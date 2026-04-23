import { useTranslation } from 'react-i18next'
import React from 'react'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalSkeleton } from '@staff-portal/ui'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'

import InvoicePayModalContent from '../InvoicePayModalContent'
import { useGetPayModalInvoice } from '../../data'

const displayName = 'InvoicePayModal'

interface Props {
  options: Required<Pick<ModalData, 'nodeId' | 'nodeType'>>
}

const InvoicePayModal = ({ options: { nodeId, nodeType } }: Props) => {
  const invoiceId = encodeId({
    id: nodeId,
    type: nodeType
  })
  const {
    data: { node } = {},
    initialLoading,
    loading
  } = useGetPayModalInvoice(invoiceId)
  const { t: translate } = useTranslation('invoice')

  return (
    <ContentLoader
      as='fragment'
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <ModalSkeleton
          title={translate('payModal.title', {
            documentNumber: nodeId
          })}
        />
      }
    >
      {node && <InvoicePayModalContent invoice={node} />}
    </ContentLoader>
  )
}

InvoicePayModal.displayName = displayName

export default InvoicePayModal
