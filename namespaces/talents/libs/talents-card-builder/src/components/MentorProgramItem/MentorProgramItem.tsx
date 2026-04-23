import { Image } from '@toptal/picasso'
import React from 'react'

import MentorBadge from '../../assets/images/mentor-badge.svg'
import ApplicationCardListItem from '../ApplicationCardListItem'
import CommunityExperienceItem from '../CommunityExperienceItem'

export interface MentorProgramItemProps {
  highlighted: boolean
  fullName: string
  toggle: () => void
}

const MentorProgramItem = ({
  highlighted,
  toggle,
  fullName
}: MentorProgramItemProps) => {
  return (
    <ApplicationCardListItem highlighted={highlighted} onClick={toggle}>
      <CommunityExperienceItem
        icon={
          <Image
            alt='Mentor badge. Letter M over green hexagon.'
            src={MentorBadge}
          />
        }
        topText='Toptal Mentor'
        bottomText={`${fullName} is a mentor in the Toptal Global Mentor's Program.`}
      />
    </ApplicationCardListItem>
  )
}

export default MentorProgramItem
