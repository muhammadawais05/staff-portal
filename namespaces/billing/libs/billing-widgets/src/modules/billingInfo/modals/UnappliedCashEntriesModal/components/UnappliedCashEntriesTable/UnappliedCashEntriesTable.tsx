import { Table } from '@toptal/picasso'
import React from 'react'
import { formatAmount } from '@toptal/picasso/utils'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'

import UnappliedCashEntriesTableHeader from '../UnappliedCashEntriesTableHeader'
import { UnappliedCashEntryFragment } from '../../data/getUnappliedCashEntries.graphql.types'

interface Props {
  nodes: UnappliedCashEntryFragment[]
}
export const UnappliedCashEntriesTable = ({ nodes = [] }: Props) => {
  return (
    <Table variant='striped'>
      <UnappliedCashEntriesTableHeader />
      <Table.Body>
        {nodes.map(({ id, effectiveDate, availableAmount, amount }) => (
          <Table.Row key={id} data-testid='unapplied-cash-entry-row'>
            <Table.Cell data-testid='date-received'>
              {parseAndFormatDate(effectiveDate)}
            </Table.Cell>
            <Table.Cell data-testid='original-amount'>
              {formatAmount({ amount })}
            </Table.Cell>
            <Table.Cell data-testid='balance'>
              {formatAmount({ amount: availableAmount })}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default UnappliedCashEntriesTable
