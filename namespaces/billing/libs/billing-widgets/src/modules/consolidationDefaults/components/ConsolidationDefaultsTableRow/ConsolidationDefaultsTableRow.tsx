import { Container, Typography, Table } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo, SyntheticEvent } from 'react'
import RowExpander from '@staff-portal/billing/src/components/RowExpander'
import { formatDateMed } from '@staff-portal/billing/src/_lib/dateTime'

import { GetConsolidationDefaultsQuery } from '../../data/getConsolidationDefaults.graphql.types'
import ConsolidationDefaultsTableRowAction from '../ConsolidationDefaultsTableRowAction'
import { useListTableRowExpandState } from '../../../commercialDocument/utils'
import EngagementsTable from '../EngagementsTable'
import useConsolidationDefaultsTableRowActions from './utils/useConsolidationDefaultsTableRowActions'
import { getStatus } from '../../utils'

const displayName = 'ConsolidationDefaultsTableRow'

const TableExpandableRow = Table.ExpandableRow
const TableCell = Table.Cell

type ConsolidationDefault = Exclude<
  GetConsolidationDefaultsQuery['node'],
  undefined | null
>['consolidationDefaults']['nodes'][0]

interface Props {
  handleOnActionClick: (event: SyntheticEvent<HTMLElement, Event>) => void
  isEven?: boolean
  consolidationDefault: ConsolidationDefault
}

const ConsolidationDefaultsTableRow: FC<Props> = memo<Props>(
  ({ consolidationDefault, isEven }) => {
    const {
      id,
      name,
      creationDate,
      engagements: { nodes }
    } = consolidationDefault
    const { t: translate } = useTranslation('billingDetails')
    const { isExpanded: isExpandedCheck, handleOnExpandClick } =
      useListTableRowExpandState()

    const { status, hasActions } = getStatus(consolidationDefault)
    const actions = useConsolidationDefaultsTableRowActions({
      id,
      name,
      hasActions
    })

    const isExpanded = isExpandedCheck(id)

    return (
      <TableExpandableRow
        content={
          <Container padded='small'>
            <Typography variant='heading' size='medium'>
              {translate('consolidationDefaults.list.engagements.title')}
            </Typography>
            <EngagementsTable engagements={nodes} />
          </Container>
        }
        expanded={isExpanded}
        stripeEven={isEven}
        data-testid={displayName}
      >
        <TableCell colSpan={2} data-testid={`${displayName}-name`}>
          <Typography>{name}</Typography>
        </TableCell>
        <TableCell data-testid={`${displayName}-creation-date`}>
          <Typography>{formatDateMed(creationDate)}</Typography>
        </TableCell>
        <TableCell data-testid={`${displayName}-status`}>
          <Typography>{status}</Typography>
        </TableCell>
        <TableCell>
          <Container flex justifyContent='flex-end'>
            <ConsolidationDefaultsTableRowAction actions={actions} />
            <RowExpander
              value={id}
              testId={`${displayName}-expand`}
              handleOnClick={handleOnExpandClick}
              isExpanded={isExpanded}
            />
          </Container>
        </TableCell>
      </TableExpandableRow>
    )
  }
)

ConsolidationDefaultsTableRow.displayName = displayName

export default ConsolidationDefaultsTableRow
