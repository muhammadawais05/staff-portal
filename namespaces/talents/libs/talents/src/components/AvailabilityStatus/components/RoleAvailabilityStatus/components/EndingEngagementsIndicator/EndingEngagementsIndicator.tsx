import React from 'react'
import {
  Container,
  ExclamationSolid16,
  Info16,
  Tag,
  Tooltip
} from '@toptal/picasso'

import { getFutureAvailability } from '../../../../../../utils'
import { TalentAvailabilityFragment } from '../../../../../../data'
import FutureAvailabilityTooltipContent from '../../../FutureAvailabilityTooltipContent'

interface Props {
  role: TalentAvailabilityFragment
}

const EndingEngagementsIndicator = ({ role }: Props) => {
  const {
    variant,
    availableHours,
    allocatedHours,
    futureAvailabilityDistanceToNow
  } = getFutureAvailability(role)

  return (
    <Tooltip
      interactive
      content={<FutureAvailabilityTooltipContent talentAvailability={role} />}
    >
      <Container as='span' left='xsmall' flex>
        {!role.preliminarySearchSetting?.enabled ? (
          <ExclamationSolid16 color='red' data-testid='exclamation-icon' />
        ) : (
          <>
            <Info16 data-testid='info-icon' />
            <Container as='span' left='xsmall' flex>
              <Tag.Rectangular
                variant={variant}
                data-testid='future-availability-tag'
              >
                Available {availableHours}/{allocatedHours} in{' '}
                {futureAvailabilityDistanceToNow}
              </Tag.Rectangular>
            </Container>
          </>
        )}
      </Container>
    </Tooltip>
  )
}

export default EndingEngagementsIndicator
