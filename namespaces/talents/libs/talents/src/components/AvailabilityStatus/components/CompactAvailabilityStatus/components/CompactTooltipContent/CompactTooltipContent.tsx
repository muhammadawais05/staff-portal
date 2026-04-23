import React from 'react'
import { Container, Typography } from '@toptal/picasso'

import { getTalentAvailabilityStatusSettings } from '../../../../../../services'
import { TalentAvailabilityFragment } from '../../../../../../data'

export interface Props {
  talentRole: TalentAvailabilityFragment
  associatedRoles: TalentAvailabilityFragment[]
}

const CompactTooltipContent = ({ talentRole, associatedRoles }: Props) => {
  const currentAvailability = {
    ...talentRole,
    allocatedHoursAvailability:
      talentRole.allocatedHoursAvailabilityIncludingEndingEngagements,
    availableHours: talentRole.availableHoursIncludingEndingEngagements
  }

  return (
    <Container>
      {[currentAvailability, ...associatedRoles].map(role => (
        <Typography key={role.type}>
          {getTalentAvailabilityStatusSettings(role, 'compact').tooltipText}
        </Typography>
      ))}
    </Container>
  )
}

export default CompactTooltipContent
