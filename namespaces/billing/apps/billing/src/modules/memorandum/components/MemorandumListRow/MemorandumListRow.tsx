import React, { FC, memo, SyntheticEvent } from 'react'
import {
  Container,
  Typography,
  Table,
  TypographyOverflow
} from '@toptal/picasso'
import LinkWrapper from '@staff-portal/billing/src/components/LinkWrapper'
import RowExpander from '@staff-portal/billing/src/components/RowExpander'
import { formatDateMed } from '@staff-portal/billing/src/_lib/dateTime'
import { useListTableRowExpandState } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

import { MemorandumListItemFragment } from '../../../__fragments__/memorandumListItemFragment.graphql.types'
import * as S from './styles'
import MemorandumRowAction from '../MemorandumRowAction'
import MemorandumStatus from '../MemorandumStatus'
import MemorandumAmount from '../MemorandumAmount'
import MemorandumListDescription from '../MemorandumListDescription'

const displayName = 'MemorandumListRow'

const TableExpandableRow = Table.ExpandableRow
const TableCell = Table.Cell

interface Props {
  handleOnActionClick: (event: SyntheticEvent<HTMLElement, Event>) => void
  memorandum: MemorandumListItemFragment
  isEven: boolean
}

const MemorandumListRow: FC<Props> = memo<Props>(
  ({ handleOnActionClick, memorandum, isEven }) => {
    const {
      id,
      allocated,
      createdOn,
      description,
      receiver,
      number,
      portions
    } = memorandum

    const { isExpanded: isExpandedCheck, handleOnExpandClick } =
      useListTableRowExpandState()
    const isExpanded = isExpandedCheck(id)

    return (
      <TableExpandableRow
        content={
          <Container
            data-testid={`${displayName}-expanded-description`}
            padded='small'
          >
            <Typography>{description}</Typography>
            {allocated ? (
              <MemorandumListDescription portions={[memorandum]} />
            ) : (
              <MemorandumListDescription portions={portions} />
            )}
          </Container>
        }
        expanded={isExpanded}
        stripeEven={isEven}
        data-testid={displayName}
      >
        <TableCell css={S.id} data-testid={`${displayName}-memorandum-id`}>
          {number}
        </TableCell>
        <TableCell css={S.balance} data-testid={`${displayName}-balance`}>
          <MemorandumStatus memorandum={memorandum} />
        </TableCell>
        <TableCell css={S.receiver} data-testid={`${displayName}-receiver`}>
          <LinkWrapper href={receiver.webResource.url}>
            <TypographyOverflow lines={2} color='inherit' disableTooltip>
              {receiver.webResource.text}
            </TypographyOverflow>
          </LinkWrapper>
        </TableCell>
        <TableCell css={S.amount} data-testid={`${displayName}-amount`}>
          <MemorandumAmount memorandum={memorandum} />
        </TableCell>
        <TableCell css={S.date}>
          {createdOn && (
            <Typography data-testid={`${displayName}-created-on-date`} as='p'>
              {formatDateMed(createdOn)}
            </Typography>
          )}
        </TableCell>
        <TableCell css={S.details}>
          {!isExpanded && (
            <TypographyOverflow
              data-testid={`${displayName}-collapsed-description`}
              lines={2}
              size='xsmall'
              as='p'
              disableTooltip
            >
              {description}
            </TypographyOverflow>
          )}
        </TableCell>
        <TableCell css={S.action}>
          <Container flex justifyContent='flex-end'>
            <RowExpander
              value={id}
              testId={`${displayName}-expand`}
              handleOnClick={handleOnExpandClick}
              isExpanded={isExpanded}
            />
            <MemorandumRowAction
              memorandum={memorandum}
              handleOnClick={handleOnActionClick}
            />
          </Container>
        </TableCell>
      </TableExpandableRow>
    )
  }
)

MemorandumListRow.displayName = displayName

export default MemorandumListRow
