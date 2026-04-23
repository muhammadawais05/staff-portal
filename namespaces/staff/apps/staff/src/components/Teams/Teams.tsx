import React from 'react'
import { TypographyOverflow } from '@toptal/picasso'
import { compareAlphabetically } from '@staff-portal/string'

import { StaffProfileFragment } from '../../data/get-staff-profile.staff.gql.types'

type Props = {
  teams: StaffProfileFragment['teams']
  staffId: string
}

const Teams = ({ teams, staffId }: Props) => (
  <TypographyOverflow data-testid='staff-teams'>
    {teams?.nodes
      .map(
        ({ name: teamName, manager }) =>
          teamName + (manager?.role?.id === staffId ? ' (Leader)' : '')
      )
      .sort((first, second) => compareAlphabetically(first, second))
      .join(', ')}
  </TypographyOverflow>
)

export default Teams
