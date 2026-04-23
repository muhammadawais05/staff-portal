import React, { SyntheticEvent } from 'react'
import { Table, Typography, TypographyOverflow } from '@toptal/picasso'
import { MemorandumBalance } from '@staff-portal/graphql/staff'
import { formatDateMed } from '@staff-portal/billing/src/_lib/dateTime'

import { Memorandum } from '../types'
import * as S from './styles'
import TableRowActions from '../TableRowActions'
import AllocatedDocumentLinks from '../AllocatedDocumentLinks'
import MemorandumStatus from '../../../../memorandum/components/MemorandumStatus'
import MemorandumAmount from '../../../../memorandum/components/MemorandumAmount'

const displayName = 'TableRow'

export const mapBalanceToColor = (balance: MemorandumBalance) =>
  balance === MemorandumBalance.CREDIT ? 'red' : 'green'

interface Props {
  memorandum: Memorandum
  handleMemorandumActionClick: (e: SyntheticEvent<HTMLElement>) => void
  isAllocated: boolean
  isEven?: boolean
  commercialDocumentId: string
}

const TableCell = Table.Cell
const PicassoTableRow = Table.Row

const TableRow = ({
  handleMemorandumActionClick,
  commercialDocumentId,
  isAllocated,
  memorandum,
  isEven
}: Props) => {
  const { allocatedAt, description, id, number } = memorandum

  return (
    <PicassoTableRow data-testid={displayName} key={id} stripeEven={isEven}>
      <TableCell>
        <Typography data-testid='id'>{number}</Typography>
      </TableCell>
      <TableCell data-testid='type'>
        <MemorandumStatus memorandum={memorandum} />
      </TableCell>
      <TableCell>
        <MemorandumAmount memorandum={memorandum} />
      </TableCell>
      {isAllocated && (
        <TableCell css={S.dateCell}>
          <Typography data-testid='date'>
            {allocatedAt && formatDateMed(allocatedAt)}
          </Typography>
        </TableCell>
      )}
      {!isAllocated && (
        <TableCell>
          <AllocatedDocumentLinks
            commercialDocumentId={commercialDocumentId}
            memorandum={memorandum}
          />
        </TableCell>
      )}
      <TableCell css={S.detailsCell}>
        <TypographyOverflow data-testid='description'>
          {description}
        </TypographyOverflow>
      </TableCell>
      <TableCell css={S.menuCell}>
        <TableRowActions
          memorandum={memorandum}
          handleClick={handleMemorandumActionClick}
        />
      </TableCell>
    </PicassoTableRow>
  )
}

TableRow.displayName = displayName

export default TableRow
