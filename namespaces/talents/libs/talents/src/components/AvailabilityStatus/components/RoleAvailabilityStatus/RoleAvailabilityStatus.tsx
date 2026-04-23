import React from 'react'
import { Container } from '@toptal/picasso'
import { ColoredStatus } from '@staff-portal/ui'
import { isNotNullish } from '@staff-portal/utils'

import { getTalentAvailabilityStatusSettings } from '../../../../services'
import { AvailabilityStatusMode } from '../../../../types'
import { TalentAvailabilityFragment } from '../../../../data'
import {
  EndingEngagementsIndicator,
  UnavailableTalentIndicator,
  UpdatedAtIndicator
} from './components'
import * as S from './styles'

interface Props {
  role: TalentAvailabilityFragment
  mode: AvailabilityStatusMode
  hideAllocatedHours?: boolean
  hideRoleName?: boolean
  hideIndicator?: boolean
}

const RoleAvailabilityStatus = ({
  role,
  mode,
  hideAllocatedHours,
  hideRoleName,
  hideIndicator
}: Props) => {
  const {
    allocatedHoursConfirmedAt,
    endingEngagements,
    unavailableAllocatedHoursChangeRequest,
    allocatedHoursAvailabilityIncludingEndingEngagements,
    availableHoursIncludingEndingEngagements,
    type
  } = role
  const roleType = type.toLowerCase().replace(/[\s_]/g, '-')
  const currentAvailability = getTalentAvailabilityStatusSettings(
    {
      ...role,
      allocatedHoursAvailability:
        allocatedHoursAvailabilityIncludingEndingEngagements,
      availableHours: availableHoursIncludingEndingEngagements
    },
    mode,
    { hideAllocatedHours, hideRoleName }
  )

  const showEndingEngagementsIndicator =
    (endingEngagements?.nodes?.length ?? 0) > 0
  const showUnavailableIndicator = isNotNullish(
    unavailableAllocatedHoursChangeRequest
  )
  const showUpdatedAtIndicator =
    mode === 'detailed' && isNotNullish(allocatedHoursConfirmedAt)

  const indicator = showEndingEngagementsIndicator ? (
    <EndingEngagementsIndicator role={role} />
  ) : showUnavailableIndicator ? (
    <UnavailableTalentIndicator
      allocatedHoursConfirmedAt={allocatedHoursConfirmedAt}
      unavailableAllocatedHoursChangeRequest={
        unavailableAllocatedHoursChangeRequest
      }
    />
  ) : showUpdatedAtIndicator ? (
    <UpdatedAtIndicator allocatedHoursConfirmedAt={allocatedHoursConfirmedAt} />
  ) : null

  return (
    <Container
      flex
      alignItems='center'
      data-testid={`availability-status-${roleType}`}
      css={S.statusContainer}
    >
      <ColoredStatus
        status={currentAvailability.text}
        color={currentAvailability.color}
      />

      {!hideIndicator && indicator}
    </Container>
  )
}

export default RoleAvailabilityStatus
