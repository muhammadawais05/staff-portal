import React from 'react'
import { Container, QuestionMark16, Tag, Tooltip } from '@toptal/picasso'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'
import { VariantType } from '@toptal/picasso/TagRectangular/TagRectangular'
import { UnavailableAllocatedHoursChangeRequestFragment } from '@staff-portal/facilities'

import { TALENT_AVAILABILITY_COLOR_MAPPING } from '../../../../../../services'
import getTalentAvailability from '../../../../utils/get-talent-allocated-availability'
import UnavailableTalentTooltipContent from '../../../UnavailableTalentTooltipContent'

interface Props {
  unavailableAllocatedHoursChangeRequest: UnavailableAllocatedHoursChangeRequestFragment
  allocatedHoursConfirmedAt?: string | null
}

const UnavailableTalentIndicator = ({
  allocatedHoursConfirmedAt,
  unavailableAllocatedHoursChangeRequest
}: Props) => {
  const { futureCommitment, returnInDate } =
    unavailableAllocatedHoursChangeRequest

  const returnInDateDistanceFromNow = returnInDate
    ? getDateDistanceFromNow(returnInDate, {
        hideSuffix: true
      })
    : null
  const futureAvailability = getTalentAvailability(futureCommitment)
  const variant: VariantType = futureCommitment
    ? TALENT_AVAILABILITY_COLOR_MAPPING[futureAvailability]
    : 'light-grey'
  const hasFututreAvilability = futureCommitment && returnInDateDistanceFromNow

  return (
    <Tooltip
      interactive
      content={
        <UnavailableTalentTooltipContent
          unavailableAllocatedHoursChangeRequest={
            unavailableAllocatedHoursChangeRequest
          }
          allocatedHoursConfirmedAt={allocatedHoursConfirmedAt}
        />
      }
    >
      <Container as='span' left='xsmall' flex>
        <QuestionMark16 data-testid='question-icon' />
        {hasFututreAvilability && (
          <Container as='span' left='xsmall' flex>
            <Tag.Rectangular
              variant={variant}
              data-testid='future-availability-tag'
            >
              Available {futureCommitment}/{futureCommitment} in{' '}
              {returnInDateDistanceFromNow}
            </Tag.Rectangular>
          </Container>
        )}
      </Container>
    </Tooltip>
  )
}

export default UnavailableTalentIndicator
