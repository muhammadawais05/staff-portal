import React from 'react'
import { Container, Tooltip } from '@toptal/picasso'
import { ColoredStatus } from '@staff-portal/ui'
import { isNotNullish } from '@staff-portal/utils'

import { getTalentAvailabilityStatusSettings } from '../../../../services'
import { TalentAvailabilityFragment } from '../../../../data'
import UnavailableTalentTooltipContent from '../UnavailableTalentTooltipContent'
import {
  CompactEndingEngagementsIndicator,
  CompactEndingEngagementsTooltipContent,
  CompactTooltipContent,
  CompactTalentUnavailableIndicator
} from './components'

interface Props {
  talentRole: TalentAvailabilityFragment
  associatedRoles?: TalentAvailabilityFragment[]
}

const CompactAvailabilityStatus = ({
  talentRole,
  associatedRoles = []
}: Props) => {
  const {
    endingEngagements,
    unavailableAllocatedHoursChangeRequest,
    allocatedHoursAvailabilityIncludingEndingEngagements,
    availableHoursIncludingEndingEngagements,
    allocatedHoursConfirmedAt
  } = talentRole
  const currentAvailability = getTalentAvailabilityStatusSettings(
    {
      ...talentRole,
      allocatedHoursAvailability:
        allocatedHoursAvailabilityIncludingEndingEngagements,
      availableHours: availableHoursIncludingEndingEngagements
    },
    'compact'
  )
  const hasEndingEngagements = (endingEngagements?.nodes?.length ?? 0) > 0
  const hasTalentSetThemselvesAsUnavailable = isNotNullish(
    unavailableAllocatedHoursChangeRequest
  )
  const interactiveTooltip =
    hasEndingEngagements || hasTalentSetThemselvesAsUnavailable

  const indicator = hasEndingEngagements ? (
    <CompactEndingEngagementsIndicator talentRole={talentRole} />
  ) : hasTalentSetThemselvesAsUnavailable ? (
    <CompactTalentUnavailableIndicator
      unavailableAllocatedHoursChangeRequest={
        unavailableAllocatedHoursChangeRequest
      }
    />
  ) : null

  const tooltipContent = hasEndingEngagements ? (
    <CompactEndingEngagementsTooltipContent
      talentRole={talentRole}
      associatedRoles={associatedRoles}
    />
  ) : hasTalentSetThemselvesAsUnavailable ? (
    <UnavailableTalentTooltipContent
      unavailableAllocatedHoursChangeRequest={
        unavailableAllocatedHoursChangeRequest
      }
      allocatedHoursConfirmedAt={allocatedHoursConfirmedAt}
    />
  ) : (
    <CompactTooltipContent
      talentRole={talentRole}
      associatedRoles={associatedRoles}
    />
  )

  return (
    <Tooltip content={tooltipContent} interactive={interactiveTooltip}>
      <Container
        data-testid='compact-availability-status'
        inline
        flex
        alignItems='center'
      >
        <ColoredStatus
          status={currentAvailability.text}
          color={currentAvailability.color}
          key={talentRole.type}
          disableTooltip
        />

        {indicator}
      </Container>
    </Tooltip>
  )
}

export default CompactAvailabilityStatus
