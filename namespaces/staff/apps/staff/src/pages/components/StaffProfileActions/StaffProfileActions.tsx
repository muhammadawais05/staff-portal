import React from 'react'
import { ActionLoader } from '@staff-portal/ui'
import { HistoryButton } from '@staff-portal/chronicles'

import { GetStaffProfileQuery } from '../../../data/get-staff-profile.staff.gql.types'
import { StaffProfileMoreActionsDropdown } from '../../../components'

type Props = {
  loading: boolean
  staffProfile: GetStaffProfileQuery['node']
}

const StaffProfileActions = ({ loading, staffProfile }: Props) => {
  if (loading) {
    return (
      <>
        <ActionLoader />
        <ActionLoader circular />
      </>
    )
  }

  if (!staffProfile) {
    return null
  }

  return (
    <>
      <HistoryButton entity='Staff' id={staffProfile.id} />
      <StaffProfileMoreActionsDropdown staffProfile={staffProfile} />
    </>
  )
}

export default StaffProfileActions
