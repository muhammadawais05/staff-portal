import { Table } from '@toptal/picasso'
import React, { FC, memo } from 'react'

import * as SCycle from '../TableRow/styles'
import { BillingCycleWithDocs } from '../BillingCycleTable/BillingCycleTable'
import TableRow from '../TableRow'

const displayName = 'TableRowChildren'

interface Props {
  childrenCycles: BillingCycleWithDocs[]
  isAltColor: boolean
}

export const TableRowChildren: FC<Props> = memo(
  ({ childrenCycles, isAltColor }) => {
    return (
      <Table.Row
        css={SCycle.tablePlainRow({ isAltColor, isExpanded: true })}
        data-testid={displayName}
      >
        <Table.Cell colSpan={9} style={{ padding: '0' }}>
          <div>
            <Table data-testid='InnerTable'>
              <Table.Body>
                {childrenCycles.map(childrenCycle => (
                  <TableRow
                    billingCycle={childrenCycle}
                    isAltColor={false}
                    isChild
                    key={childrenCycle.gid}
                  />
                ))}
              </Table.Body>
            </Table>
          </div>
        </Table.Cell>
      </Table.Row>
    )
  }
)

TableRowChildren.defaultProps = {}

TableRowChildren.displayName = displayName

export default TableRowChildren
