import { Container } from '@toptal/picasso'
import React from 'react'
import { Link } from '@staff-portal/navigation'
import { TypographyOverflowLink } from '@staff-portal/ui'
import { OperationFragment } from '@staff-portal/operations'
import { Maybe } from '@staff-portal/graphql/staff'
import { NO_VALUE } from '@staff-portal/config'

import PurchaseOrderEditButton from '../PurchaseOrderEditButton'

export type PurchaseOrder =
  | Maybe<{
      id: string
      poNumber: string
      webResource: { url?: Maybe<string> }
    }>
  | undefined

export type PurchaseOrderLine =
  | Maybe<{
      id: string
      poLineNumber: string
      webResource: { url?: Maybe<string> }
      purchaseOrder: PurchaseOrder
    }>
  | undefined

type Props = {
  engagementId: string
  purchaseOrder: PurchaseOrder
  purchaseOrderLine: PurchaseOrderLine
  operation: OperationFragment
  poLinesEnabled: boolean
}

const PurchaseOrderField = ({
  engagementId,
  purchaseOrder,
  purchaseOrderLine,
  operation,
  poLinesEnabled = false
}: Props) => {
  const purchaseOrderFields = {
    url:
      purchaseOrderLine?.purchaseOrder?.webResource?.url ??
      purchaseOrder?.webResource?.url,
    number:
      purchaseOrderLine?.purchaseOrder?.poNumber ?? purchaseOrder?.poNumber
  }

  return (
    <Container flex justifyContent='space-between'>
      {poLinesEnabled ? (
        purchaseOrderFields?.url ? (
          <Container>
            <TypographyOverflowLink
              size='medium'
              data-testid='PurchaseOrderField-po-number'
            >
              <Link href={purchaseOrderFields?.url}>
                {purchaseOrderFields?.number}
              </Link>
            </TypographyOverflowLink>
            {purchaseOrderLine?.webResource?.url && (
              <TypographyOverflowLink
                size='medium'
                data-testid='PurchaseOrderField-po-line-number'
              >
                <Link href={purchaseOrderLine?.webResource?.url}>
                  {purchaseOrderLine?.poLineNumber}
                </Link>
              </TypographyOverflowLink>
            )}
          </Container>
        ) : (
          NO_VALUE
        )
      ) : (
        <TypographyOverflowLink
          size='medium'
          data-testid='PurchaseOrderField-po-number'
        >
          {purchaseOrder?.webResource?.url ? (
            <Link href={purchaseOrder?.webResource?.url}>
              {purchaseOrder?.poNumber}
            </Link>
          ) : (
            NO_VALUE
          )}
        </TypographyOverflowLink>
      )}

      <PurchaseOrderEditButton
        engagementId={engagementId}
        operation={operation}
        poLinesEnabled={poLinesEnabled}
      />
    </Container>
  )
}

export default PurchaseOrderField
