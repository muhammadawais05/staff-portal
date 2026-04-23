import { Table } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'

import * as S from './styles'

const displayName = 'TableHead'

const TableCell = Table.Cell

export const TableHead: FC = memo(() => {
  const { t: translate } = useTranslation('extraExpenses')

  return (
    <Table.Head data-testid={displayName}>
      <Table.Row>
        <TableCell css={S.date}>{translate('Table.TableHead.date')}</TableCell>
        <TableCell css={S.company}>
          {translate('Table.TableHead.company')}
        </TableCell>
        <TableCell css={S.talent}>
          {translate('Table.TableHead.talent')}
        </TableCell>
        <TableCell css={S.commission}>
          {translate('Table.TableHead.commissions')}
        </TableCell>
      </Table.Row>
    </Table.Head>
  )
})

TableHead.displayName = displayName

export default TableHead
