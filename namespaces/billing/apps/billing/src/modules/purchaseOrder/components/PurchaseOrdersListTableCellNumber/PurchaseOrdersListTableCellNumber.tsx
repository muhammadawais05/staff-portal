import React from 'react'
import {
  Container,
  Archive16,
  Tooltip,
  TypographyOverflow
} from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import LinkWrapper from '@staff-portal/billing/src/components/LinkWrapper'

import { PurchaseOrderListItemFragment } from '../../../__fragments__/purchaseOrderListItemFragment.graphql.types'

const displayName = 'PurchaseOrdersListTableRow'

interface Props {
  purchaseOrder: Pick<
    PurchaseOrderListItemFragment,
    'archived' | 'poNumber' | 'webResource'
  >
}

const PurchaseOrdersListTableCellNumber = ({
  purchaseOrder: {
    archived,
    poNumber: purchaseOrderNumber,
    webResource: { url }
  }
}: Props) => {
  const { t: translate } = useTranslation('purchaseOrderList')

  return (
    <Container flex alignItems='center'>
      <TypographyOverflow
        tooltipContent={purchaseOrderNumber}
        data-testid={`${displayName}-${archived ? 'archived' : 'unarchived'}`}
      >
        <LinkWrapper href={url} data-testid={`${displayName}-link-link`}>
          {purchaseOrderNumber}
        </LinkWrapper>
      </TypographyOverflow>
      {archived && (
        <Tooltip content={translate('table.row.archivedTooltip')} interactive>
          <Container as='span' left='xsmall' flex alignItems='center'>
            <Archive16 color='dark-grey' />
          </Container>
        </Tooltip>
      )}
    </Container>
  )
}

PurchaseOrdersListTableCellNumber.displayName = displayName

export default PurchaseOrdersListTableCellNumber
