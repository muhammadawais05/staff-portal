import { Table } from '@toptal/picasso'
import React, { FC, memo } from 'react'
import { InvoiceListItemFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/invoiceListItemFragment.graphql.types'

import { InvoiceToConsolidateListItemFragment } from '../../../__fragments__/invoiceToConsolidateListItemFragment.graphql.types'
import * as S from './styles'
import InvoiceListTableHeader from '../InvoiceListTableHeader'
import { InvoiceListRow } from './components'

const displayName = 'InvoiceList'

type InvoiceListItem =
  | InvoiceListItemFragment
  | InvoiceToConsolidateListItemFragment
type ListableInvoice = InvoiceListItem & {
  consolidatable?: boolean
}

interface Props {
  invoices: ListableInvoice[]
  selectionEnabled?: boolean
  statusColumnEnabled?: boolean
  originalClientColumnEnabled?: boolean
}

const InvoiceList: FC<Props> = memo(
  ({
    invoices = [],
    selectionEnabled = false,
    statusColumnEnabled = false,
    originalClientColumnEnabled = false
  }) => {
    const selectableInvoiceIds = invoices
      .filter(invoice => invoice.consolidatable)
      .map(({ id }) => id)

    return (
      <Table css={originalClientColumnEnabled ? undefined : S.table}>
        <InvoiceListTableHeader
          invoiceIds={selectableInvoiceIds}
          isSelectionVisible={selectionEnabled}
          isStatusVisible={statusColumnEnabled}
          originalClientColumnEnabled={originalClientColumnEnabled}
        />
        <Table.Body>
          {invoices.map((invoice, index: number) => (
            <InvoiceListRow
              index={index}
              invoice={invoice as InvoiceListItemFragment}
              key={invoice.id}
              selectionEnabled={selectionEnabled}
              statusColumnEnabled={statusColumnEnabled}
              originalClientColumnEnabled={originalClientColumnEnabled}
            />
          ))}
        </Table.Body>
      </Table>
    )
  }
)

InvoiceList.displayName = displayName

export default InvoiceList
