import { Container, Table as PicassoTable } from '@toptal/picasso'
import React, { FC, memo } from 'react'
import {
  ApolloContextEvents,
  Refetch
} from '@staff-portal/billing/src/@types/types'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'

import TableFooter from '../TableFooter'
import TableHead from '../TableHead'
import TableRow from '../TableRow'
import { PlacementFeeConnectionFragment } from '../../data/getPlacementFees.graphql.types'

interface Props {
  documents: PlacementFeeConnectionFragment
  refetch: Refetch
}

const displayName = 'Table'

const Table: FC<Props> = memo(
  ({ documents: { nodes = [], placementFeeTotals }, refetch }) => {
    useRefetch(ApolloContextEvents.placementFeeCreate, refetch)

    return (
      <Container bottom={2} data-testid={displayName}>
        <PicassoTable>
          <TableHead />
          <PicassoTable.Body>
            {nodes.map((node, index) => (
              <TableRow
                data={node}
                key={node.invoice.id}
                isEven={Boolean(index % 2)}
              />
            ))}
          </PicassoTable.Body>
          <TableFooter totals={placementFeeTotals} />
        </PicassoTable>
      </Container>
    )
  }
)

Table.defaultProps = {}
Table.displayName = displayName

export default Table
