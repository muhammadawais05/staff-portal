import React, { memo } from 'react'
import { Checkbox, Table } from '@toptal/picasso'

type col = {
  title: string
}
interface Props {
  isAllSelected: boolean
  cols: col[]
  onAllItemsSelect: () => void
  onAllItemsDeselect: () => void
}

const BetaStaffMemberListHeader = ({
  cols,
  isAllSelected,
  onAllItemsSelect,
  onAllItemsDeselect
}: Props) => {
  return (
    <Table.Row>
      <Table.Cell>
        <Checkbox
          checked={isAllSelected}
          onChange={e =>
            e.target.checked ? onAllItemsSelect() : onAllItemsDeselect()
          }
        />
      </Table.Cell>
      {cols.map(item => (
        <Table.Cell key={item.title}>{item.title}</Table.Cell>
      ))}
    </Table.Row>
  )
}

export default memo(BetaStaffMemberListHeader)
