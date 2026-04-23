import { Table } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React from 'react'

import * as S from './styles'

const displayName = 'PurchaseOrdersLinesTableHeader'

const PurchaseOrdersLinesTableHeader = () => {
  const { t: translate } = useTranslation('purchaseOrder')

  return (
    <Table.Head data-testid={`${displayName}-head`}>
      <Table.Row>
        <Table.Cell css={S.poLineNameCell}>
          {translate('purchaseOrderLines.table.head.poLineName')}
        </Table.Cell>
        <Table.Cell css={S.invoicedTotalCell}>
          {translate('purchaseOrderLines.table.head.amount')}
        </Table.Cell>
        <Table.Cell css={S.draftedTotalCell}>
          {translate('purchaseOrderLines.table.head.invoicedTotal')}
        </Table.Cell>
        <Table.Cell css={S.draftedTotalCell}>
          {translate('purchaseOrderLines.table.head.draftedTotal')}
        </Table.Cell>
      </Table.Row>
    </Table.Head>
  )
}

PurchaseOrdersLinesTableHeader.displayName = displayName

export default PurchaseOrdersLinesTableHeader
