import { Table } from '@toptal/picasso'
import React, { FC, SyntheticEvent, memo } from 'react'

import { GetTransfersQuery } from '../../data/getTransfers.graphql.types'
import TransfersTableHead from '../TableHead'
import TransfersTableRow from '../TableRow'
import * as S from './styles'

const displayName = 'TransfersTable'

interface Props {
  onTransferActionClick: (e: SyntheticEvent<HTMLElement>) => void
  transfers: Exclude<
    GetTransfersQuery['node'],
    null | undefined
  >['transfers']['nodes']
}

const TransfersTable: FC<Props> = memo(
  ({ onTransferActionClick, transfers = [] }) => (
    <Table css={S.table} data-testid={displayName}>
      <TransfersTableHead />
      <Table.Body>
        {transfers.map((transfer, index) => (
          <TransfersTableRow
            key={transfer.id}
            onTransferActionClick={onTransferActionClick}
            transfer={transfer}
            isEven={Boolean(index % 2)}
            data-testid={`${displayName}-row-${transfer.id}`}
          />
        ))}
      </Table.Body>
    </Table>
  )
)

TransfersTable.displayName = displayName

export default TransfersTable
