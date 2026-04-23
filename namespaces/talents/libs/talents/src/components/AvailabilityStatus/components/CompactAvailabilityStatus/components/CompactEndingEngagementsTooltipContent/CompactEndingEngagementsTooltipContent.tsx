import React, { useMemo } from 'react'
import { Container } from '@toptal/picasso'

import { TalentAvailabilityFragment } from '../../../../../../data'
import AvailabilityUpdatedAt from '../../../AvailabilityUpdatedAt'
import PreliminarySearchLabel from '../../../PreliminarySearchLabel'
import EndingEngagementLabel from '../../../EndingEngagementLabel'
import FutureAvailabilityLabel from '../../../FutureAvailabilityLabel'

export interface Props {
  talentRole: TalentAvailabilityFragment
  associatedRoles: TalentAvailabilityFragment[]
}

const CompactEndingEngagementsTooltipContent = ({
  talentRole,
  associatedRoles
}: Props) => {
  const allRoles = useMemo(
    () => [talentRole, ...associatedRoles],
    [talentRole, associatedRoles]
  )
  const hasOtherRoles = associatedRoles.length > 0
  const allEndingEngagements = useMemo(
    () => allRoles.map(role => role?.endingEngagements?.nodes ?? []).flat(),
    [allRoles]
  )

  return (
    <Container>
      {allRoles.map((role, index) => (
        <Container top={index === 0 ? undefined : 'xsmall'} key={role.type}>
          <FutureAvailabilityLabel
            talentAvailability={role}
            includeType={hasOtherRoles}
          />
        </Container>
      ))}

      {allEndingEngagements.map(engagement => (
        <EndingEngagementLabel
          key={engagement.id}
          endingEngagement={engagement}
        />
      ))}
      <AvailabilityUpdatedAt talentAvailability={talentRole} />
      <PreliminarySearchLabel
        preliminarySearchEnabled={talentRole.preliminarySearchSetting?.enabled}
      />
    </Container>
  )
}

export default CompactEndingEngagementsTooltipContent
