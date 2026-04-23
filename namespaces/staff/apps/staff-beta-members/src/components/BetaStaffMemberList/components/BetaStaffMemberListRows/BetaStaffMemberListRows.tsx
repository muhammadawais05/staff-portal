import React, { memo } from 'react'

import { BetaStaffMemberFragment } from '../../../../pages/BetaStaffMembers/data/get-beta-staff-member-list'
import BetaStaffMemberListItem from '../BetaStaffMemberListItem'

interface Props {
  selectedIds: string[]
  onSelectItem: (itemId: string) => void
  onDeselectItem: (itemId: string) => void
  rows: BetaStaffMemberFragment[]
}

const BetaStaffMemberListRows = ({
  selectedIds,
  onSelectItem,
  onDeselectItem,
  rows
}: Props) => {
  return (
    <>
      {rows?.map(row => (
        <BetaStaffMemberListItem
          staffMember={row}
          key={row.id}
          isSelected={selectedIds.includes(row.id)}
          onSelectMember={onSelectItem}
          onDeselectMember={onDeselectItem}
        />
      ))}
    </>
  )
}

export default memo(BetaStaffMemberListRows)
