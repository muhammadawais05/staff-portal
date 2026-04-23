import React, { FC, SyntheticEvent, memo } from 'react'
import { Table, Tooltip, EmptyState, Section } from '@toptal/picasso'
import { Help16 } from '@toptal/picasso/Icon'
import { useTranslation } from 'react-i18next'
import { CommercialDocumentType } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

import { Memorandums } from '../types'
import TableRow from '../TableRow'
import * as Styles from './styles'

const displayName = 'MemorandumsTable'

interface Props {
  memorandums: Memorandums
  nodeType: CommercialDocumentType
  commercialDocumentId: string
  isAllocated?: boolean
  handleMemorandumActionClick: (e: SyntheticEvent<HTMLElement>) => void
}

const TableHead = Table.Head
const TableBody = Table.Body
const PicassoTableRow = Table.Row
const TableCell = Table.Cell

const MemorandumsTable: FC<Props> = memo(
  ({
    handleMemorandumActionClick,
    commercialDocumentId,
    memorandums,
    nodeType,
    isAllocated = false
  }) => {
    const { t: translate } = useTranslation('memorandum')
    const translationKey = isAllocated ? 'allocated' : 'associated'

    return (
      <Section
        data-testid={`${displayName}-section-${translationKey}`}
        title={translate(`${translationKey}.title` as const)}
        actions={
          <Tooltip
            content={translate(`${translationKey}.info` as const, {
              type: nodeType
            })}
            placement='top'
            interactive
          >
            <div>
              <Help16 css={Styles.helpIcon} />
            </div>
          </Tooltip>
        }
      >
        {!memorandums?.length ? (
          <EmptyState.Collection data-testid={`${displayName}-empty`}>
            {translate('associated.empty')}
          </EmptyState.Collection>
        ) : (
          <Table>
            <TableHead data-testid={`${displayName}-head`}>
              <PicassoTableRow>
                <TableCell>{translate('allocated.table.head.id')}</TableCell>
                <TableCell>{translate('allocated.table.head.type')}</TableCell>
                <TableCell>
                  {translate('allocated.table.head.amount')}
                </TableCell>
                <TableCell>
                  {isAllocated
                    ? translate('allocated.table.head.date')
                    : translate('associated.table.head.allocated')}
                </TableCell>
                <TableCell colSpan={2}>
                  {translate('allocated.table.head.details')}
                </TableCell>
              </PicassoTableRow>
            </TableHead>
            <TableBody>
              {memorandums.map(memorandum => (
                <TableRow
                  key={memorandum.id}
                  memorandum={memorandum}
                  isAllocated={isAllocated}
                  commercialDocumentId={commercialDocumentId}
                  handleMemorandumActionClick={handleMemorandumActionClick}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </Section>
    )
  }
)

MemorandumsTable.displayName = displayName

export default MemorandumsTable
