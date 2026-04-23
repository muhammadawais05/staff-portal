import { Table } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React from 'react'

export const UnappliedCashEntriesTableHeader = () => {
  const { t: translate } = useTranslation('billingBasicInfo')

  return (
    <Table.Head>
      <Table.Row>
        <Table.Cell data-testid='date-received-header'>
          {translate('unappliedCashModal.table.head.date')}
        </Table.Cell>
        <Table.Cell data-testid='original-amount-header'>
          {translate('unappliedCashModal.table.head.amount')}
        </Table.Cell>
        <Table.Cell data-testid='balance-header'>
          {translate('unappliedCashModal.table.head.balance')}
        </Table.Cell>
      </Table.Row>
    </Table.Head>
  )
}

export default UnappliedCashEntriesTableHeader
