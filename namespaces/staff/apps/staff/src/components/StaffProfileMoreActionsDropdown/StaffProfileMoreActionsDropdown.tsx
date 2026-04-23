import React from 'react'
import { DeprecatedActionsDropdown } from '@staff-portal/facilities'

import { useStaffProfileActionsList } from './services'
import { GetStaffProfileQuery } from '../../data/get-staff-profile.staff.gql.types'

type Props = {
  staffProfile: NonNullable<GetStaffProfileQuery['node']>
}

const StaffProfileMoreActionsDropdown = (props: Props) => {
  const { loading, setLoading, actions } = useStaffProfileActionsList(props)

  return (
    <DeprecatedActionsDropdown
      loading={loading}
      actions={actions}
      onStart={() => setLoading(true)}
      onSettled={() => setLoading(false)}
    />
  )
}

export default StaffProfileMoreActionsDropdown
