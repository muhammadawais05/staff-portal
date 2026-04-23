import { Button, SkeletonLoader } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo, useState } from 'react'
import { useGetNode } from '@staff-portal/billing/src/utils/graphql'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'

import { useGetPurchaseOrderLineArchiveStateQuery } from '../../data/getPurchaseOrderLineArchiveState.graphql.types'
import { useActionsPurchaseOrderLine } from '../../utils/useActionsPurchaseOrderLine'

interface Props {
  purchaseOrderLineId: string
}

const PurchaseOrderLineDetailsPageHeader: FC<Props> = memo(
  ({ purchaseOrderLineId }) => {
    const { t: translate } = useTranslation('purchaseOrder')
    const { data, initialLoading, loading, refetch } = useGetNode(
      useGetPurchaseOrderLineArchiveStateQuery
    )({
      purchaseOrderLineId
    })
    const { archived, operations } = data || {}

    const [isArchiving, setArchiving] = useState(false)
    const { handleOnArchivePurchaseOrderLine } = useActionsPurchaseOrderLine()
    const handleOnArchiveClick = async () => {
      setArchiving(true)
      await handleOnArchivePurchaseOrderLine(
        purchaseOrderLineId,
        Boolean(archived)
      )
      setArchiving(false)
    }

    useRefetch(ApolloContextEvents.purchaseOrderLineArchiveToggle, refetch)

    if (initialLoading) {
      return <SkeletonLoader.Button />
    }

    const operation =
      operations[
        archived ? 'unarchivePurchaseOrderLine' : 'archivePurchaseOrderLine'
      ]
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
        <Button
          data-testid='archive-purchase-order-line'
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

export default PurchaseOrderLineDetailsPageHeader
