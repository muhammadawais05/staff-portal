import { Table } from '@toptal/picasso'
import { SelectableTableHeaderCheckboxCell } from '@staff-portal/forms'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'

import * as S from './styles'

const displayName = 'InvoiceListTableHeader'

interface Props {
  invoiceIds?: string[]
  isActionsVisible?: boolean
  isRecipientVisible?: boolean
  isSelectionVisible?: boolean
  isStatusVisible?: boolean
  originalClientColumnEnabled?: boolean
}

const InvoiceListTableHeader: FC<Props> = memo(
  ({
    invoiceIds,
    isActionsVisible = false,
    isRecipientVisible = false,
    isSelectionVisible = false,
    isStatusVisible = false,
    originalClientColumnEnabled = false
  }) => {
    const { t: translate } = useTranslation('invoiceList')

    return (
      <Table.Head data-testid={`${displayName}-head`}>
        <Table.Row>
          {isSelectionVisible && (
            <SelectableTableHeaderCheckboxCell
              data-testid={`${displayName}-checkbox-header`}
              fieldName='invoiceIds'
              selectableIds={invoiceIds as string[]}
              style={S.checkbox}
            />
          )}
          <Table.Cell data-testid={`${displayName}-id`} css={S.id}>
            {translate('table.head.id')}
          </Table.Cell>
          {isStatusVisible && (
            <Table.Cell data-testid={`${displayName}-status`} css={S.status}>
              {translate('table.head.status')}
            </Table.Cell>
          )}
          {isRecipientVisible && (
            <Table.Cell
              data-testid={`${displayName}-recipient`}
              css={S.recipient}
            >
              {translate('table.head.recipient')}
            </Table.Cell>
          )}
          <Table.Cell data-testid={`${displayName}-amount`} css={S.amount}>
            {translate('table.head.amount')}
          </Table.Cell>
          <Table.Cell data-testid={`${displayName}-date`} css={S.date}>
            {translate('table.head.date')}
          </Table.Cell>
          <Table.Cell
            data-testid={`${displayName}-description`}
            css={!originalClientColumnEnabled ? S.description : undefined}
          >
            {translate('table.head.description')}
          </Table.Cell>
          {originalClientColumnEnabled && (
            <Table.Cell data-testid={`${displayName}-client`}>
              {`${translate('table.head.client')}`}
            </Table.Cell>
          )}
          {isActionsVisible && (
            <Table.Cell data-testid={`${displayName}-action`} css={S.action}>
              {translate('table.head.actions')}
            </Table.Cell>
          )}
          {!isActionsVisible && (
            <Table.Cell
              data-testid={`${displayName}-expander`}
              css={S.expander}
            />
          )}
        </Table.Row>
      </Table.Head>
    )
  }
)

InvoiceListTableHeader.displayName = displayName

export default InvoiceListTableHeader
