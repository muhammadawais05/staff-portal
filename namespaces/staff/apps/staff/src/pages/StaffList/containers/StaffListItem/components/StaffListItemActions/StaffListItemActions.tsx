import React from 'react'

import { StaffListItemFragment } from '../../../../data/get-staffs-list/get-staffs-list.staff.gql.types'
import RestoreStaffButton from './components/RestoreStaffButton/RestoreStaffButton'
import DeleteStaffButton from './components/DeleteStaffButton/DeleteStaffButton'

interface Props {
  staffId: string
  fullName: string
  operations: StaffListItemFragment['operations']
}

const StaffListItemActions = ({
  staffId,
  fullName,
  operations: { deactivateStaff, reactivateStaff }
}: Props) => (
  <>
    <RestoreStaffButton
      staffId={staffId}
      fullName={fullName}
      operation={reactivateStaff}
    />
    <DeleteStaffButton
      staffId={staffId}
      fullName={fullName}
      operation={deactivateStaff}
    />
  </>
)

export default StaffListItemActions
