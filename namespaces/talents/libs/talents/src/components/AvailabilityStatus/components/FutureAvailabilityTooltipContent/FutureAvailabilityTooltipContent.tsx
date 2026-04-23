import React from 'react'
import { Container } from '@toptal/picasso'

import { TalentAvailabilityFragment } from '../../../../data'
import AvailabilityUpdatedAt from '../AvailabilityUpdatedAt'
import PreliminarySearchLabel from '../PreliminarySearchLabel'
import EndingEngagementLabel from '../EndingEngagementLabel'
import FutureAvailabilityLabel from '../FutureAvailabilityLabel'

interface Props {
  talentAvailability: TalentAvailabilityFragment
}

const FutureAvailabilityTooltipContent = ({ talentAvailability }: Props) => {
  return (
    <Container data-testid='future-availability-tooltip-content'>
      <FutureAvailabilityLabel talentAvailability={talentAvailability} />
      {(talentAvailability.endingEngagements?.nodes ?? []).map(engagement => (
        <EndingEngagementLabel
          key={engagement.id}
          endingEngagement={engagement}
        />
      ))}
      <AvailabilityUpdatedAt talentAvailability={talentAvailability} />
      <PreliminarySearchLabel
        preliminarySearchEnabled={
          talentAvailability.preliminarySearchSetting?.enabled
        }
      />
    </Container>
  )
}

export default FutureAvailabilityTooltipContent
