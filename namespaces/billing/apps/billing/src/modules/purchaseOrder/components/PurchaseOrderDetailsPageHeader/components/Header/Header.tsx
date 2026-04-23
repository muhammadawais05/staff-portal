import { Button, SkeletonLoader } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo, useState } from 'react'
import { useGetNode } from '@staff-portal/billing/src/utils/graphql'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import {
  ApolloContextEvents,
  ModalKey
} from '@staff-portal/billing/src/@types/types'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'

import { useGetPurchaseOrderArchiveStateQuery } from '../../../../data/getPurchaseOrderArchiveState.graphql.types'
import { useActionsPurchaseOrder } from '../../../../utils/useActionsPurchaseOrder'

const displayName = 'PurchaseOrderDetailsPageHeader'

interface Props {
  purchaseOrderId: string
  poLinesEnabled: boolean
}

const PurchaseOrderDetailsPageHeader: FC<Props> = memo(
  ({ purchaseOrderId, poLinesEnabled }) => {
    const { t: translate } = useTranslation('purchaseOrder')
    const { handleOnOpenModal } = useModals()
    const { data, initialLoading, loading, refetch } = useGetNode(
      useGetPurchaseOrderArchiveStateQuery
    )({
      purchaseOrderId
    })
    const { archived, operations } = data || {}

    const [isArchiving, setArchiving] = useState(false)
    const { handleOnArchivePurchaseOrder } = useActionsPurchaseOrder()
    const handleOnArchiveClick = async () => {
      setArchiving(true)
      await handleOnArchivePurchaseOrder(purchaseOrderId, !!archived)
      setArchiving(false)
    }
    const handleOnEditPurchaseOrderClick = () => {
      handleOnOpenModal(ModalKey.purchaseOrderEdit, { nodeId: purchaseOrderId })
    }

    useRefetch(ApolloContextEvents.purchaseOrderArchiveToggle, refetch)

    if (initialLoading) {
      return <SkeletonLoader.Button />
    }

    const operation =
      operations[archived ? 'unarchivePurchaseOrder' : 'archivePurchaseOrder']
    const buttonLabel = translate(
      `purchaseDetails.header.actions.${
        archived ? 'unarchive' : 'archive'
      }` as const
    )

    return (
      <OperationWrapper
        isLoading={isArchiving || loading}
        operation={operation}
      >
        {poLinesEnabled && (
          <Button
            data-testid='edit-purchase-order'
            size='small'
            onClick={handleOnEditPurchaseOrderClick}
          >
            {translate('purchaseDetails.header.actions.edit')}
          </Button>
        )}
        <Button
          data-testid='archive-purchase-order'
          size='small'
          onClick={handleOnArchiveClick}
          variant='secondary'
        >
          {buttonLabel}
        </Button>
      </OperationWrapper>
    )
  }
)

PurchaseOrderDetailsPageHeader.displayName = displayName

export default PurchaseOrderDetailsPageHeader
