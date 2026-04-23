import React from 'react'
import { Typography } from '@toptal/picasso'

import { AvailabilityStatusMode } from '../../types'
import { TalentAvailabilityFragment } from '../../data'
import { CompactAvailabilityStatus, RoleAvailabilityStatus } from './components'

interface Props {
  talentAvailability: TalentAvailabilityFragment
  associatedRoles?: TalentAvailabilityFragment[]
  mode?: AvailabilityStatusMode
  hideAllocatedHours?: boolean
  hideRoleName?: boolean
  hideIndicator?: boolean
}

const AvailabilityStatus = ({
  talentAvailability,
  associatedRoles = [],
  mode = 'default',
  hideAllocatedHours,
  hideRoleName,
  hideIndicator = false
}: Props) => {
  if (mode === 'compact') {
    return (
      <CompactAvailabilityStatus
        talentRole={talentAvailability}
        associatedRoles={associatedRoles}
      />
    )
  }

  const allRoles = [talentAvailability, ...associatedRoles]

  return (
    <Typography as='div' size='medium'>
      {allRoles.map(role => (
        <RoleAvailabilityStatus
          key={role.type}
          role={role}
          mode={mode}
          hideAllocatedHours={hideAllocatedHours}
          hideRoleName={hideRoleName}
          hideIndicator={hideIndicator}
        />
      ))}
    </Typography>
  )
}

export default AvailabilityStatus
