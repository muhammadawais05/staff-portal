import React from 'react'
import { Container, QuestionMark16, Indicator } from '@toptal/picasso'
import { VariantType } from '@toptal/picasso/TagRectangular/TagRectangular'
import { UnavailableAllocatedHoursChangeRequestFragment } from '@staff-portal/facilities'

import { TALENT_AVAILABILITY_COLOR_MAPPING } from '../../../../../../services'
import getTalentAvailability from '../../../../utils/get-talent-allocated-availability'

interface Props {
  unavailableAllocatedHoursChangeRequest: UnavailableAllocatedHoursChangeRequestFragment
}

const CompactTalentUnavailableIndicator = ({
  unavailableAllocatedHoursChangeRequest
}: Props) => {
  const { futureCommitment } = unavailableAllocatedHoursChangeRequest

  const futureAvailability = getTalentAvailability(futureCommitment)
  const variant: VariantType = futureCommitment
    ? TALENT_AVAILABILITY_COLOR_MAPPING[futureAvailability]
    : 'light-grey'

  return (
    <Container flex alignItems='center'>
      <Container as='span' left='xsmall' flex>
        <QuestionMark16 data-testid='question-icon' />
      </Container>
      <Container inline left='xsmall' flex>
        <Indicator color={variant} data-testid={`indicator-${variant}`} />
      </Container>
    </Container>
  )
}

export default CompactTalentUnavailableIndicator
