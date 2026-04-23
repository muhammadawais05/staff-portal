import React from 'react'
import { Container, Info16, Indicator } from '@toptal/picasso'

import { getFutureAvailability } from '../../../../../../utils'
import { TalentAvailabilityFragment } from '../../../../../../data'

interface Props {
  talentRole: TalentAvailabilityFragment
}

const CompactEndingEngagementsIndicator = ({ talentRole }: Props) => {
  const futureAvailability = getFutureAvailability(talentRole)

  return (
    <Container flex alignItems='center'>
      <Container as='span' left='xsmall' flex>
        <Info16 data-testid='info-icon' />
      </Container>
      <Container inline left='xsmall' flex>
        <Indicator
          color={futureAvailability.variant}
          data-testid={`indicator-${futureAvailability.variant}`}
        />
      </Container>
    </Container>
  )
}

export default CompactEndingEngagementsIndicator
