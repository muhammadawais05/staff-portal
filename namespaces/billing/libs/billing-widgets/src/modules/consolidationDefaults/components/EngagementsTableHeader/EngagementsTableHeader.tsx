import { Table } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'

import * as S from './styles'

const displayName = 'EngagementsTableHeader'

interface Props {
  isSelectable?: boolean
}

const TableHead = Table.Head
const TableRow = Table.Row
const TableCell = Table.Cell

export const EngagementsTableHeader: FC<Props> = memo(({ isSelectable }) => {
  const { t: translate } = useTranslation('billingDetails')

  return (
    <TableHead>
      <TableRow css={isSelectable ? S.rowHeaderScrollable : undefined}>
        {isSelectable && (
          <TableCell
            data-testid={`${displayName}-checkbox`}
            css={S.cellCheckbox}
          >
            {' '}
          </TableCell>
        )}
        <TableCell data-testid={`${displayName}-company`}>
          {translate('consolidationDefaults.list.engagements.head.company')}
        </TableCell>
        <TableCell data-testid={`${displayName}-job`}>
          {translate('consolidationDefaults.list.engagements.head.job')}
        </TableCell>
        <TableCell data-testid={`${displayName}-talent`}>
          {translate('consolidationDefaults.list.engagements.head.talent')}
        </TableCell>
        <TableCell data-testid={`${displayName}-po-number`}>
          {translate('consolidationDefaults.list.engagements.head.poNumber')}
        </TableCell>
        {isSelectable && (
          <TableCell data-testid={`${displayName}-consolidationDefault`}>
            {translate(
              'consolidationDefaults.list.engagements.head.consolidationDefault'
            )}
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  )
})

EngagementsTableHeader.displayName = displayName

export default EngagementsTableHeader
